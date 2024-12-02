
type ActionCallbackInput<T, U> = (state: T, payload: U) => void

type ActionsInput<T, U> = {
    [K in keyof U]: ActionCallbackInput<T, U[K]>
}
interface ReducerInput<T extends object, U> {
    state: T,
    actions: ActionsInput<T, U>,
}

type Actions<U> = {
    [K in keyof U]: U[K] extends undefined ? (payload?: U[K]) => void : (payload: U[K]) => void;
}

interface Reducer<T, U> {
    state: T,
    actions: Actions<U>
}

function createReducer<T extends object, U = any>(config: ReducerInput<T, U>): Reducer<T, U> {
    const actionsWithState: Actions<U> = {} as Actions<U>
    const storeClone = {...config.state}
    for (const key in config.actions) {
        actionsWithState[key] = ((payload:any) => {
            const action = config.actions[key]
            action(storeClone, payload);
        })
    }
    return {
        state: storeClone,
        actions: actionsWithState
    }
}


export type { Reducer, Actions, ReducerInput }
export default createReducer