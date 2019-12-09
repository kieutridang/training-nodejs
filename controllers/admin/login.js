var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var Admin = require('../../models/admin')
var EmailValidator = require('../validators/emailValidator')
const validationErrorHandler = require('../error-handler/validationErrors').validationErrorHandler
const ErrorCode = require('../error-handler/validationErrors').ErrorCode

const privateKey = 'newPrivateKey'

async function login(req, res, next) {
    // Handle request
    const { email, password } = req.body

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
        // Check email/password valid
        const isExisted = await Admin.exists({ username: email })
        // Error handler
        if (isExisted == false) {
            throw Error('Email is not exist!')
        } else {
            const foundAdmin = await Admin.find({ username: email })
            bcrypt.compare(password, foundAdmin[0].password).then(function (isMatched) {
                if (isMatched) {
                    // Create access token as jwt
                    jwt.sign({ email, password }, privateKey, function (err, accessToken) {
                        // Store access token
                        if (err) {
                            res.status(500).send(err)
                            return
                        }
                        Admin.update({ username: email }, { accessToken: accessToken }).then(function (rawResponse, err) {
                            if (err) {
                                res.status(500).send(err)
                                return
                            }
                            res.status(200).send({accessToken});
                        })

                    })
                } else {
                    // Error handler
                    res.status(401).send('Email or password is invalid');
                }
            })
        }

    } catch (err) {
        console.log(err)
    }
}


module.exports = login