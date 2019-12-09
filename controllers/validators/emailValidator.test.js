const validateEmailWithFormat = require('./EmailValidator').validateEmailWithFormat
const validateDomainEmail = require('./EmailValidator').validateDomainEmail

describe('Validate email format is valid', () => {
    test('Email without domain extension', () => {
        const invalidEmail = 'anh.le.mmo@yopmail'
        expect(validateEmailWithFormat(invalidEmail)).toBe(false)
    })

    test('Email without whole domain', () => {
        const invalidEmail = 'anh.le.mmo'
        expect(validateEmailWithFormat(invalidEmail)).toBe(false)
    })

    test('Email without domain', () => {
        const invalidEmail = 'anh.le.mmo@.com'
        expect(validateEmailWithFormat(invalidEmail)).toBe(false)
    })

    test('Email without id', () => {
        const invalidEmail = '@yopmail.com'
        expect(validateEmailWithFormat(invalidEmail)).toBe(false)
    })

    test('Valid email', () => {
        const validEmail = 'anh.le.mmo@gmail.com'
        expect(validateDomainEmail(validEmail)).toBe(true)
    })
})

describe('Validate email domain is valid', () => {
    test('Invalid domain', () => {
        const invalidEmail = 'anh.le.mmo@yopmail.com'
        expect(validateDomainEmail(invalidEmail)).toBe(false)
    })

    test('Valid domain', () => {
        const validEmail = 'anh.le.mmo@gmail.com'
        expect(validateDomainEmail(validEmail)).toBe(true)
    })
})