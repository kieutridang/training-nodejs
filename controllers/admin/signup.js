const bcrypt = require('bcrypt');
const Admin = require('../../models/admin');
const EmailValidator = require('../validators/emailValidator')
const validationErrorHandler = require('../error-handler/validationErrors').validationErrorHandler
const ErrorCode = require('../error-handler/validationErrors').ErrorCode

const saltRounds = 7

/*  */
async function signup(req, res, next) {
    // Handle request
    const { email, password } = req.body;

    // Validate email format
    const isValidFormatEmail = EmailValidator.validateEmailWithFormat(email)
    if (!isValidFormatEmail) {
        // Call error handler
        validationErrorHandler(res, ErrorCode.INVALID_EMAIL)
        return
    }
    const isAcceptableDomain = EmailValidator.validateDomainEmail(email)
    if (!isAcceptableDomain) {
        // Call error handler
        validationErrorHandler(res, ErrorCode.INVALID_DOMAIN)
        return
    }

    try {
        const isExisted = await Admin.exists({ username: email })
        if (isExisted) {
            // Error Handler
            validationErrorHandler(res, ErrorCode.EMAIL_EXISTED)
        } else {
            // Hash password
            const hashPassword = await bcrypt.hash(password, saltRounds)
            // Store hash in your password DB.
            const newAdmin = new Admin({
                username: email,
                password: hashPassword
            })
            const admin = await newAdmin.save()
            res.status(200).send(admin)
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.signup = signup