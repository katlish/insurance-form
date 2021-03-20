const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userDetailSchema = new Schema({
	zipcode: {
		type: String,
		required: [true, 'Zipcode is missing']
    },
    gender: {
		type: String,
        enum: ['male', 'female'],
        required: [true, 'Gender is missing']
	},
	birthdate: {
		type: Date,
        required: [true, 'Birthdate is missing']
    },
    income: {
        type: Number,
        required: [true, 'Annual income is missing']
    }
},
{ timestamps: true });

module.exports = mongoose.model('UserDetail', userDetailSchema);