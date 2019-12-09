const express = require('express');
const router = express.Router();
const adminRouter = require('./admin');
const productRouter = require('./product');
const orderRouter = require('./order');

const authorize = require('../utils/authorize');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Training tasks' });
});

router.use('/admin', adminRouter);
router.use('/product', authorize, productRouter);
router.use('/order', authorize, orderRouter);

module.exports = router;
