// backend/models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  position: String,
  salary: Number,
  imageUrl: String,
});

module.exports = mongoose.model('Employee', employeeSchema);
