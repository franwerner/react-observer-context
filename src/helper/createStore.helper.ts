import { ActionsOutput, Reducer } from "./createReducer.helper";


type OnlyActions<T extends { [K in keyof T]: Reducer}> = {
  [K in keyof T]: T[K]['actions'];
}

type OnlyState<T extends { [K in keyof T]: Reducer}> = {
  [K in keyof T]: T[K]["state"]
}

const extendActions = <T extends { [K in keyof T]: Reducer}>(reducerKey: keyof T, actions: ActionsOutput, stackStates: OnlyState<T>) => {
  /**
* Extendemos la funcionalidad de cada acción para actualize la referencia del estado global
* con una nueva referencia devuelta por cada ejecución de la acción.
* 
* De esta manera, el estado interno de cada reducer no se muta directamente, en su lugar, cada acción
* crea y devuelve un nuevo estado, promoviendo la inmutabilidad. Lo unico mutable sera el 
* objeto global de la store, donde se almacenan las referencias actualizadas de cada estado después 
* de ejecutar la acción correspondiente.
*/
  const internalActionsStack = {} as ActionsOutput
  for (const key in actions) {
    internalActionsStack[key] = (payload: any) => {
      const newState = actions[key](payload)
        return stackStates[reducerKey] = newState
    }
  }
  return internalActionsStack
}

const createStore = <T extends { [K in keyof T]: Reducer },>(reducers: T) => {
  let stackActions = {} as OnlyActions<T>
  let stackStates = {} as OnlyState<T>
  for (const key in reducers) {
    const reducer = reducers[key]
    const state = reducer["state"]
    const actions = reducer["actions"]
    stackActions[key] = extendActions(key, actions, stackStates)
    stackStates[key] = state
  }
  return {
    state: stackStates,
    actions: stackActions
  }
}

export type { OnlyActions, OnlyState }
export default createStore