const mongoose = require('mongoose');

const menuitemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    taste: {
        type: String,
        enum: ['Sweet', 'Spicy', 'Sour']
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
})
const MenuItem = mongoose.model('MenuItem', menuitemSchema);
module.exports = MenuItem;