const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
personSchema.pre('save', async function (next) {
    const person = this;
    if (!person.isModified('password')) return next();

    try {
        // hash password generation:
        const salt = await bcrypt.genSalt(10);

        // hash pasword:
        const hashpassword = await bcrypt.hash(person.password, salt);

        // Override this plain password withthe hashed one:
        person.password = hashpassword;
        next();
    } catch (err) {
        return next(err);

    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch
    } catch (err) {
        throw err;
    }
}

// Create persion MOdel:
const person = mongoose.model('person', personSchema)
module.exports = person  