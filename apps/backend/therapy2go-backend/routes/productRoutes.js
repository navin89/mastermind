const express = require('express')
const asyncHandler = require('express-async-handler')
const ProductModel = require('../models/product')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const {products} = require('../utils/therapienow-data')

// get all products
router.get('/', asyncHandler(async (req, res) => {
  // console.log(products);
  return res.json(products);
}))



//Get a Specific ProductModel
router.get('/:id', verifyToken, asyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id)

    if (product) {
        return res.json(product)
    } else {
        res.status(404)
        throw new Error('ProductModel Cannot Be Found')
    }
}))

//Add a New ProductModel
router.post('/add', verifyToken, asyncHandler(async (req, res) => {

    const course = new ProductModel({
        name: req.body.name,
        link: req.body.link,
        platform: req.body.platform,
        description: req.body.description,
        isCompleted: req.body.isCompleted
    });
    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
}))

//Update Specific ProductModel
router.post('/update/:id', verifyToken, asyncHandler(async (req, res) => {

    const {
        name,
        link,
        platform,
        description,
        isCompleted
    } = req.body;

    const product = await ProductModel.findById(req.params.id);

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
        throw new Error("ProductModel Not Found");
    }

}))

//Delete a Specific ProductModel
router.delete('/delete/:id', asyncHandler(async (req, res) => {

    const product = await ProductModel.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({ message: "ProductModel Removed Successfully" });
    } else {
        res.status(404);
        throw new Error("ProductModel not found");
    }
}))

module.exports = router
