import { Reducer } from "./createReducer.helper";


type ReducerList<T extends { [K in keyof T]: Reducer<any, any> },> = {
  [K in keyof T]: T[K]
};

type OnlyActions<T extends { [K in keyof T]: Reducer<any, any> }> = {
  [K in keyof T]: T[K]['actions'];
}

type OnlyState<T extends { [K in keyof T]: Reducer<any, any> }> = {
  [K in keyof T]: T[K]["state"]
}

const createStore = <T extends { [K in keyof T]: Reducer<any, any> },>(reducers: ReducerList<T>) => {

  let stackActions = {} as OnlyActions<T>
  let stackStates = {} as OnlyState<T>
  for (const key in reducers) {
    const reducer = reducers[key]
    if (reducer) {
      const state = reducer["state"]
      const actions = reducer["actions"]
      stackActions[key] = actions
      stackStates[key] = state
    }

  }
  return {
    store: stackStates,
    actions: stackActions
  }
}

export type { ReducerList,OnlyActions,OnlyState }
export default createStore