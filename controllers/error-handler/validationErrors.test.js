const validationErrorHandler = require('./ValidationErrors').validationErrorHandler

describe('Error return when email invalid', () => {
    test('Email without domain extension', () => {
        const invalidEmail = 'anh.le.mmo@yopmail'
        expect(validationErrorHandler(invalidEmail)).toBe(false)
    })
})