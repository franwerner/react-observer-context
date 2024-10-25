
type ActionCallbackInput<T, U> = (state: T, payload: U) => void

type ActionsInput<T, U> = {
    [K in keyof U]: U[K] extends (a: T, b: infer inferU) => void ? ActionCallbackInput<T, inferU> : ActionCallbackInput<T, U[K]>
}

interface ReducerInput<T extends object, U> {
    state: T,
    actions: ActionsInput<T, U>,
}

type Actions<U> = {
    [K in keyof U]: U[K] extends (a: any, b: infer inferU) => void ? (payload: inferU) => void : (payload: U[K]) => void
}

interface Reducer<T, U> {
    state: T,
    actions: Actions<U>
}

function createReducer<T extends object, U = any>(config: ReducerInput<T, U>): Reducer<T, U> {
    const actionsWithState = {} as any
    for (const key in config.actions) {
        actionsWithState[key] = (payload: any) => {
            const action = config.actions[key]
            action(config.state, payload);
        }
    }
    return {
        state: config.state,
        actions: actionsWithState as Actions<U>,
    }
}


export type { Reducer, Actions, ReducerInput }
export default createReducer