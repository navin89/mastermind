const mongoose = require('mongoose')

const Schema = mongoose.Schema
const productSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        link: {
            type: String,
            required: true,
            unique: true
        },
        platform: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            unique: true
        },
        isCompleted: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    {
        timestamp: true
    }
)
module.exports = mongoose.model('product', productSchema, 'products')




