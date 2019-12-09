const express = require('express');
const router = express.Router();
const { addOrder, getOrderById, updateOrder, deleteOrder }  = require('../controllers/order/order');

router.get('/get-order-by-id', getOrderById);

router.post('/add-order', addOrder);

router.put('/update-order', updateOrder);

router.patch('/delete-order', deleteOrder);


module.exports = router;