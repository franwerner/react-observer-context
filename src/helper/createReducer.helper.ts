
type ActionCallbackInput<T, U> = (state: T, payload: U) => void

type ActionsInput<T, U> = {
    [K in keyof U]: ActionCallbackInput<T, U[K]>
}

interface ReducerInput<T extends object, U> {
    state: T,
    actions: ActionsInput<T, U>,
}

type Actions<U> = {
    [K in keyof U]: (payload: U[K]) => void
}

interface Reducer<T, U> {
    state: T,
    actions: Actions<U>
    reducer ?: boolean
}

const createReducer = <T extends object, U>(config: ReducerInput<T, U>): Reducer<T, U> => {
    const actionsWithState: Actions<U> = {} as Actions<U>
    for (const key in config.actions) {
        actionsWithState[key] = ((payload) => {
            const action = config.actions[key]
            action(config.state, payload);
        })
    }
    return {
        state: config.state,
        actions: actionsWithState,
        reducer : true
    }
}

export type { Reducer,Actions,ReducerInput}
export default createReducer