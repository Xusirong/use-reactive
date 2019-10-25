import 'jest'
import createReactive from '../src/createReactive'

describe('createReactive', () => {
    it('should throw error when createReactive got invalide arguments', () => {
        expect(() => {
            createReactive(undefined)
        }).toThrow()

        expect(() => {
            createReactive(1 as unknown as object)
        }).toThrow()

        expect(() => {
            createReactive('123' as unknown as object)
        }).toThrow()

        expect(() => {
            createReactive(null)
        }).toThrow()

        createReactive([])
        createReactive({})
    })
})