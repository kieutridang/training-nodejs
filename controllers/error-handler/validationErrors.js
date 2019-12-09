const ErrorCode = {
  REQUIRED: 'REQUIRED',
  INVALID: 'INVALID',
  EMAIL_EXISTED: 'EMAIL_EXISTED',
  INVALID_LENGTH: 'INVALID_LENGTH',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_DOMAIN: 'INVALID_DOMAIN',
}


function validationErrorHandler(res, err) {
  // Error handler with received error code
  switch (err) {
    case 'INVALID_EMAIL':
      res.status(401).send(ErrorCode.INVALID_EMAIL)
      break
    case 'INVALID_DOMAIN':
      res.status(401).send(ErrorCode.INVALID_DOMAIN)
      break
    case 'EMAIL_EXISTED':
      res.status(401).send(ErrorCode.EMAIL_EXISTED)
      break
  }
}

module.exports.ErrorCode = ErrorCode
module.exports.validationErrorHandler = validationErrorHandler