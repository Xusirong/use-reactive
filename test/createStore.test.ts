import 'jest'
import createStore from '../src/createStore'
import createReactive from '../src/createReactive'
import mutate from '../src/mutate'

describe('createStore', () => {
    test('can createStore correctly', () => {
        let store = createStore({})
        expect(typeof store.getState).toBe('function')
        expect(typeof store.setState).toBe('function')
        expect(typeof store.update).toBe('function')
    })

    test('can getState correctly', () => {
        let state = {
            a: 1,
            b: {
                c: 2,
                d: 3
            }
        }

        let store = createStore(state)
        let reactive = createReactive(state)

        expect(store.getState()).toEqual(reactive)
    })

    test('can setState correctly', () => {
        let state = {
            a: 1,
            b: {
                c: 2,
                d: 3
            }
        }

        let store = createStore(state)
        let storeState = store.getState()
        store.setState('', { a: storeState.a + 1 })
        store.setState('.b', { c: storeState.b.c + 1 })

        let reactive = createReactive(state)
        reactive.a += 1
        reactive.b.c += 1

        expect(store.getState()).toEqual(reactive)
    })
})