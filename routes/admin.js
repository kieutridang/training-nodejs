const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/admin/signup');
const login = require('../controllers/admin/login');

router.get('/log-in', login);

router.post('/sign-up', signup);


module.exports = router;