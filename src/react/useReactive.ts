import { useMemo } from 'react'
import { ReactiveState } from '../createReactive'
import createStore from '../createStore'
import { isFunction } from '../util'
import useUpdate from './useUpdate'

export default function useReactive<T extends object>(
    initialState: T | (() => T)
): ReactiveState {
    let store = useMemo(() => {
        if (isFunction(initialState)) {
            initialState = (initialState as () => T)()
        }
        return createStore(initialState as T)
    }, [])

    let update = useUpdate()

    let state = store.getState()

    store.update = update

    Object.defineProperty(state, '__STORE__', {
        value: store,
        writable: false
    })

    return state;
}