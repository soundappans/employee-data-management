var mongoose = require('mongoose');

/*module.exports = mongoose.model('employee', {
	name: {type: String, unique : true},
    email: {type: String, unique: true},
    dateofbirth: Date,
    department: String,
    gender: String
});*/

//MongoDB Employee Schema/Collection
var employeeSchema = new mongoose.Schema({
    name: {type: String, unique : true},
    email: {type: String, unique: true},
    dateofbirth: Date,
    department: String,
    gender: String
});

module.exports = mongoose.model('employee', employeeSchema, 'employee');