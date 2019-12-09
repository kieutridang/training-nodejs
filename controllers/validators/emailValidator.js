var validator = require('validator')

function validateEmailWithFormat(email) {
    return validator.isEmail(email)
}

function validateDomainEmail(email) {
    if (email.includes('yopmail')) {
        return false
    }
    return true
}

module.exports.validateDomainEmail = validateDomainEmail
module.exports.validateEmailWithFormat = validateEmailWithFormat