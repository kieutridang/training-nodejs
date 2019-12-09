const mongoose = require('mongoose');
const Admin = require('../models/admin');


async function authorize(req, res, next) {
    // TODO: Validate access token
    const { accesstoken } = req.headers;
    if (!accesstoken) {
        // TODO: Error handler
        invalidToken(res);
        return;
    }
    // TODO: Verify access token
    const isValidToken = await Admin.exists({ accessToken: accesstoken })
    if (isValidToken) {
        next();
    } else {
        invalidToken(res);
    }
}

function invalidToken(res) {
    res.status(401).send('Invalid token');
}

module.exports = authorize;