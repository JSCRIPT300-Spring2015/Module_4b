$(function () {

	'use strict';

	// Store the verb our form will use in order to toggle between add and edit
	var submitMethod = 'POST';
	var foodTypes = [];

	$.get('/trucks', function (truckList) {
		var list = [];
		if (truckList) {
			truckList.forEach(function (truck) {
				// Added a link to edit a specific truck
				list.push('<li><li><span class="delete_link" data-truck="' +
						truck.name + '">X</span><span class="edit_link" data-truck="' +
						truck.name + '">+</span><a href="/trucks/' + truck.name +
						'">' + truck.name + '</a></li>');
			});
			$('.trucks-list').append(list);
		}
	});

	$('form').on('submit', function (e) {
		e.preventDefault();
		var $form = $(this);

		var truckData = {
			name: $('[name=name]').val(),
			type: foodTypes,
			schedule: getSchedule(),
			description: $('[name=description]').val(),
			payment: getPaymentTypes(),
			website: $('[name=website]').val(),
			Facebook: $('[name=Facebook]').val(),
			Twitter: $('[name=Twitter]').val()
		};
		// Retrieve the necessary verb
		if (submitMethod === 'POST') {
			$.ajax({
				method: 'POST',
				url: '/trucks',
				data: truckData
			})
			.done(function (truck) {
				var list = [];
				list.push('<li><li><span class="delete_link" data-truck="' +
						truck.name + '">X</span><span class="edit_link" data-truck="' +
						truck.name + '">+</span><a href="/trucks/' + truck.name +
						'">' + truck.name + '</a></li>');
				$('.trucks-list').append(list);
				$form.trigger('reset');
			});
		}
		// Update the truck if edit has been selected
		if (submitMethod === 'PUT') {
			$.ajax({
				method: 'PUT',
				url: '/trucks/' + truckData.name,
				data: truckData
			})
			.done(function () {
				window.location.href = '/trucks/' + truckData.name;
			});
		}
	});

	function getPaymentTypes() {
		var types = [];

		$('[name=payment]').each(function () {
			if (this.checked) {
				types.push(this.value);
			}
		});

		return types;
	}

	function getSchedule() {
		var schedule = [];

		$('[name=schedule]').each(function () {
			if (this.checked) {
				schedule.push(this.value);
			}
		});

		return schedule;
	}

	function addFoodType(type) {

		foodTypes.push(type);
		$('.foodType-list').append('<li>' + type + '</li>');
		$('[name=type]').val('');
	}

	function getTruckData(name) {

		// Request json instead of the html page!
		$.get('/trucks/' + name + '.json', function (truck) {
			
			// Prefill the edit form
			if (truck) {
				// Disable the name field to prevent changes
				$('[name=name]').val(truck.name).attr('disabled', 'disabled');
				// Since some of our data is incomplete, make sure it exists then
				// populate the field
				if (truck.description) {
					$('[name=description').val(truck.description);
				}
				if (truck.website) {
					$('[name=website').val(truck.website);
				}
				if (truck.Facebook) {
					$('[name=Facebook').val(truck.Facebook);
				}
				if (truck.Twitter) {
					$('[name=Twitter').val(truck.Twitter);
				}
				if (truck.type) {
					truck.type.forEach(function (type) {
						addFoodType(type);
					});
				}
				if (truck.payment) {
					truck.payment.forEach(function (payment) {
						$('[value="' + payment + '"]').prop('checked', true);
					});
				}
				if (truck.schedule) {
					truck.schedule.forEach(function (day) {
						$('[value="' + day + '"]').prop('checked', true);
					});
				}
			}
		});
		// Change the ver to put
		submitMethod = 'PUT';
	}

	$('[name=type').on('keypress', function (e) {
		if (e.which === 13) {
			e.preventDefault();
			addFoodType($(this).val());
		}
	});

	$('#addFoodType').on('click', function (e) {
		var foodType = $('[name=type]').val();

		addFoodType(foodType);
	});

	$('#clearFoodTypes').on('click', function (e) {
		// NOTE! The original function cleared the DOM list, but not the array
		foodTypes = [];
		$('.foodType-list').empty();
	});

	$('.trucks-list').on('click', '.delete_link', '[data-truck]', function (e) {
		if (!confirm('Remove food truck?')) {
			return false;
		}
		var $target = $(e.currentTarget);

		$.ajax({
			method: 'DELETE',
			url: '/trucks/' + $target.data('truck')
		})
		.done(function () {
			$target.closest('li').remove();
		});
	});

	$('.trucks-list').on('click', '.edit_link', '[data-truck]', function (e) {
		var $target = $(e.currentTarget);

		// Clear form of any previous entries
		$('form')[0].reset();
		foodTypes = [];
		$('.foodType-list').empty();

		// Autofilling the form exists in its own function
		getTruckData($target.data('truck'));

		// Minor DOM tweaks
		$('#action').text('Update Food Truck:');
		$('#truck-legend').text('Food Truck:');
		$('html, body').animate({ scrollTop: 0 }, 'fast');
		$('[type=submit').val('Update Food Truck');
	});
});
