import { Reducer } from "./createReducer.helper";

type ReducerList<T extends { [K in keyof T]:Reducer<any, any>  },> = {
    [K in keyof T]: T[K]
  };

const createStore = <T extends { [K in keyof T]:Reducer<any, any>  },>(reducers: ReducerList<T>) => {

    type OnlyActions = {
      [K in keyof T]: T[K]['actions'];
    }
    type OnlyState = {
      [K in keyof T]: T[K]["state"]
    }
    let stackActions = {} as OnlyActions
    let stackStates = {} as OnlyState
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
  
  export type {ReducerList}
  export default createStore