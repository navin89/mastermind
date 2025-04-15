const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const {products} = require('../utils/therapienow-data')
const { info } = require('../utils/logUtils');

// get all products
router.get('/', asyncHandler(async (req, res) => {
  try{
    info(`all products route triggered with payload:: ${JSON.stringify(products)}`);
    return res.json(products);
  } catch (error) {
    error(`get all products request has failed with error: ${error}`);
    throw new Error(error);
  }
}));

module.exports = router
