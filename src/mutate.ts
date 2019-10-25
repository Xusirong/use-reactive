import { isFunction, isArray } from './util'
import { isReactive, ReactiveState } from './createReactive'
import { Store } from './createStore'

export default function mutate <T extends (...args) => any, K extends Array<ReactiveState>>(
    producer: T,
    currentArr: K
) {
    if (!isFunction(producer)) {
        throw new Error(`Expected f in mutate(f, arr) is a function, but got ${producer} `)
    }

    if (!isArray(currentArr)) {
        throw new Error(`Expected arr in mutate(f, arr) is a Array, but got ${currentArr}`)
    }

    let draftArr: Array<Record<string, any>> = []

    for (let i = 0; i < currentArr.length; i++) {
        if (!isReactive(currentArr[i])) {
            throw new Error(`Expected arr in mutate(f, arr) should consist of reactive`)
        }
        draftArr.push({})
    }

    producer(...draftArr)

    let storeList: Set<Store> = new Set()

    currentArr.forEach((current, index) => {
        let store = (attachParentRecursive(current).__STORE__) as Store

        storeList.add(store)

        let path = current.__path__

        let target = draftArr[index]

        store.setState(path, target)
    })

    storeList.forEach(item => {
        item.update()
    })
}

const attachParentRecursive = (
    currentState: ReactiveState
): ReactiveState => {
    let reactiveState: ReactiveState = currentState
    while (reactiveState.__parent__) {
        reactiveState = reactiveState.__parent__
    }
    return reactiveState
}


// state -> mutate -> createDraft(state) -> nextState -> state.__next_state__

// state -> mutate -> createDraft(state.__next_state__) -> next_next_state -> state.__next_state__