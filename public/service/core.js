var employeeapp = angular.module('employeeapp', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('/api/getEmployees')
	.success(function(data) {
		$scope.employees = data;
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

	// add new employee
	$scope.addEmployee = function(req) {
		var datepicker = $("#datepicker");
		console.log(datepicker);
		console.log("before " + req);
		req.dateofbirth = datepicker[0].value;
		console.log("after " + req);
		$http.post('/api/addEmployee', req)
			.success(function(data) {
				$scope.emp = {}; // clear the form so our user is ready to enter another
				$scope.employees = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// update selected employee
	$scope.updateEmployee = function(id, req) {
		$http.post('/api/updateEmployee/' + id, req)
			.success(function(data) {
				$scope.emp = {}; // clear the form so our user is ready to enter another
				$scope.employees = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete selected employee
	$scope.deleteEmployee = function(id) {
		$http.delete('/api/employee/' + id)
			.success(function(data) {
				$scope.employees = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// get employee for edit
	$scope.getEmployee = function(id) {
		$http.get('/api/employee/' + id)
			.success(function(data) {
				$scope.emp = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	/* Common date functions */
	$scope.getAge = function(dob) {
		//console.log("dob is " + dob);
		return new Date().getFullYear() - new Date(dob).getFullYear();
	}

	$scope.getDate = function(dob) {
		if(dob == null || dob == undefined || dob == NaN) return;

		var dt = new Date(dob);
		
		return dt.getFullYear() 

				+ "-" + (dt.getMonth().toString().length > 1 
				? dt.getMonth().toString() 
				: "0" + dt.getMonth().toString())
		
				+  "-" + (dt.getDate().toString().length > 1 
				? dt.getDate().toString() 
				: "0" + dt.getDate().toString());
	}

}
