const express = require('express')
const asyncHandler = require('express-async-handler')
const Product = require('../models/product')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')

const jsonExample =
    {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    }

// get a product
router.get('/', asyncHandler(async (req, res) => {
    return res.json(jsonExample);
}))



//Get a Specific Product
router.get('/:id', verifyToken, asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        return res.json(product)
    } else {
        res.status(404)
        throw new Error('Product Cannot Be Found')
    }
}))

//Add a New Product
router.post('/add', verifyToken, asyncHandler(async (req, res) => {

    const course = new Product({
        name: req.body.name,
        link: req.body.link,
        platform: req.body.platform,
        description: req.body.description,
        isCompleted: req.body.isCompleted
    });
    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
}))

//Update Specific Product
router.post('/update/:id', verifyToken, asyncHandler(async (req, res) => {

    const {
        name,
        link,
        platform,
        description,
        isCompleted
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.link = link;
        product.platform = platform;
        product.description = description;
        product.isCompleted = isCompleted;

        const updatedCourse = await product.save();

        res.status(201).json(updatedCourse);
    } else {
        res.status(404);
        throw new Error("Product Not Found");
    }

}))

//Delete a Specific Product
router.delete('/delete/:id', asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({ message: "Product Removed Successfully" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
}))

module.exports = router