import { isArray, isObject } from './util'
import { Store } from './createStore'

type Reactive<T> = {
    __parent__: T | null
    __path__: string
    __STORE__?: Store
    [propName: string]: any,
    [propName: number]: any 
}

export interface ReactiveState extends Reactive<ReactiveState> {}

const reactive = <State extends Partial<ReactiveState>>(
    initialState: State,
    parent: State | null = null,
    path: string = ''
): ReactiveState => {
    let currentState: any = isObject(initialState) ? {} : []

    let pathValue = ''
    if (parent && typeof parent.__path__ !== 'undefined') {
        pathValue = parent.__path__ + '.' + path
    } else {
        pathValue = path
    }

    Object.defineProperties(currentState, {
        __parent__: {
            value: parent,
            writable: true
        },
        __path__: {
            value: pathValue,
            writable: true
        }
    })

    for (let key in initialState) {
        if (isObject(initialState[key]) || isArray(initialState[key])) {
            currentState[key] = reactive(initialState[key], currentState, key)
        } else {
            currentState[key] = initialState[key]
        }
    }

    return currentState
}

export const isReactive = (input: any) =>
    !!(input && typeof input.__parent__ !== 'undefined'
        && typeof input.__path__ !== 'undefined'
    )

const createReactive = <State extends object>(initialState: State) => {
    if(!isObject(initialState) && !isArray(initialState)) {
        throw new Error(`Expect state in createReactive(state) is a object or array`)
    }

    let currentState = reactive(initialState)

    return currentState
}

export default createReactive;