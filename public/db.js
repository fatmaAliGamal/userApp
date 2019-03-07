const db = require('mongoose');

db.connect('mongodb://127.0.0.1:27017/fatima');

var model = db.model('users', {id: Number, name: String, age: Number});

module.exports = model;