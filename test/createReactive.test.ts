import 'jest'
import createReactive, { isReactive } from '../src/createReactive'

describe('createReactive', () => {
    test('should throw error when createReactive got invalide arguments', () => {
        expect(() => {
            createReactive(undefined)
        }).toThrow()
        
        expect(() => {
            createReactive(null)
        }).toThrow()

        expect(() => {
            createReactive(1 as any)
        }).toThrow()

        expect(() => {
            createReactive('123' as any)
        }).toThrow()

        expect(() => {
            createReactive(true as any)
        })

        expect(() => {
            createReactive([])
        }).not.toThrow()

        expect(() => {
            createReactive({})
        }).not.toThrow()
    })
})

describe('isReactive', () => {
    test('can be detected by isReactive', () => {
        expect(isReactive(undefined)).toBeFalsy()
        expect(isReactive(null)).toBeFalsy()
        expect(isReactive(true)).toBeFalsy()
        expect(isReactive(false)).toBeFalsy()
        expect(isReactive(1)).toBeFalsy()
        expect(isReactive('123')).toBeFalsy()
        expect(isReactive([])).toBeFalsy()
        expect(isReactive({})).toBeFalsy()
        expect(isReactive(createReactive({ a: 1 }))).toBeTruthy()
    })
})