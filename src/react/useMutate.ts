import { useRef, useCallback, useLayoutEffect } from 'react'
import { ReactiveState } from '../createReactive'
import mutate from '../mutate'

export default function useMutate<T extends (...args) => any, K extends (...args) => any, Deps extends ReactiveState[]>(
  callback: T,
  deps: Deps
) {
  let callbackRef = useRef(callback)
  let depsRef = useRef(deps)
  let update = useCallback(
    ((...args) => {
      return mutate((...draft) => callbackRef.current(...draft, ...args), depsRef.current)
    }) as K,
    [callbackRef]
  )

  useLayoutEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useLayoutEffect(() => {
    depsRef.current = deps
  }, [deps])

  return update
}
