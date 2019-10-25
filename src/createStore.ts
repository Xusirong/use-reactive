import createReactive from './createReactive'
import produce from 'immer'
import { ReactiveState } from './createReactive'

export type Store = {
    getState: () => ReactiveState;
    setState: (path: any, target: any) => void;
    update: () => void;
}

export default function createStore<T extends object>(initialState: T) {
  let reactive = createReactive(initialState)
  
  let state = produce(reactive, () => undefined)

  let getState = () => state

  let setState = (path, target) => {
    let newState = produce(state, (draft) => {
        Object.keys(target).forEach(item => {
          eval(`draft${path}.${item} = target.${item}`)
        })
    })
    state = newState
  }

  let update = () => {}

  let store = {
    getState,
    setState,
    update
  }

  return store
}