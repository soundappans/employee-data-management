var Employee = require('../models/employee');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all Employees
	app.get('/api/getEmployees', function(req, res) {
		console.log("getting employees....................");
		// use mongoose to get all todos in the database
		Employee.find(function(err, employee) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err) {
				res.send(err)
			}

			res.json(employee); // return all todos in JSON format
		});
	});

	// create employee and send back all employees after creation
	app.post('/api/addEmployee', function(req, res) {

		//console.log("adding employee" + req);
		//console.log(req.body);
		//console.log("name is " + req.body.name);

		// create a employee, information comes from AJAX request from Angular
		Employee.create(/*{
				name : req.body.name,
				email: req.body.email,
				dateofbirth : req.body.dateofbirth,
				department : req.body.department,
				gender : req.body.gender
			}*/
			req.body
			, function(err, employee) {
			if (err)
				res.send(err);

			// get and return all the employees after you create another
			Employee.find(function(err, employee) {
				if (err)
					res.send(err)
				res.json(employee);
			});
		});

	});

	// update employee based on id  and send back all employees after creation
	app.post('/api/updateEmployee/:employeeId', function(req, res) {

		Employee.replaceOne({_id : req.params.employeeId}, req.body,
		function(err, employee) {
			if (err)
				res.send(err);

			// get and return all the employees after you create another
			Employee.find(function(err, employee) {
				if (err)
					res.send(err)
				res.json(employee);
			});
		});
	});
			
	// delete employee
	app.delete('/api/employee/:employee_id', function(req, res) {
		Employee.remove({
			_id : req.params.employee_id
		}, function(err, employee) {
			if (err)
				res.send(err);

			//console.log("employee is ", employee)
			//res.json(employee);
			// get and return all the employees after you create another
			Employee.find(function(err, employee) {
				if (err)
					res.send(err)
				res.json(employee);
			});
		});
	});

	// get Employee
	app.get('/api/employee/:employee_id', function(req, res) {
		Employee.findById(req.params.employee_id
		, function(err, employee) {
			if (err)
				res.send(err);

			//console.log("employee is ", employee)
			res.json(employee);
			// get and return all the todos after you create another
			/*Employee.find(function(err, employee) {
				if (err)
					res.send(err)
				res.json(employee);
			});*/
		});
	});


	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./views/employee.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};