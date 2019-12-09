const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct }  = require('../controllers/product/product');

router.get('/get-all', getAllProducts);

router.get('/get-product-by-id', getProductById);

router.post('/add-product', addProduct);

router.patch('/delete-product', deleteProduct);

router.patch('/update-product', updateProduct);

module.exports = router;