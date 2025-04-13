const mongoose = require('mongoose')

const Schema = mongoose.Schema
const productSchema = new Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        icon: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
            unique: true
        },
        duration: {
            type: String,
            required: true
        },
    },
    {
        timestamp: true
    }
)
module.exports = mongoose.model('product', productSchema, 'products')




