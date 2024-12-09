const mongoose = require('mongoose')
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'owner'],
        require: true
    },
    mobile: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        require: true
    }
})

// Create persion MOdel:
const person = mongoose.model('person', personSchema)
module.exports = person  