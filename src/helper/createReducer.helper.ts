
type ActionCallbackInput<T, U> = (state: T, payload: U) => T

type ActionsInput<T, U> = {
    [K in keyof U]: ActionCallbackInput<T, U[K]>
}
interface ReducerInput<T extends object, U> {
    state: T,
    actions: ActionsInput<T, U>,
}

type Actions<T, U> = {
    [K in keyof U]: U[K] extends undefined ? (payload?: U[K]) => T : (payload: U[K]) => T;
}

interface Reducer<T, U> {
    state: T,
    actions: Actions<T, U>,
}

function createReducer<T extends object, U = any>(config: ReducerInput<T, U>): Reducer<T, U> {
    const actionsWithState: Actions<T, U> = {} as Actions<T, U>
    let state = config.state
    for (const key in config.actions) {
        actionsWithState[key] = ((payload: any) => {
            const action = config.actions[key]
            /**
             * Se debe hacer una copia de cada payload, debido a que queremos limpiar cualquier efecto secundario con respecto a los valores de los estados.
             * Con esto nos asegurado que cualquiero nuevo valor para el estado de store, solo sea parate de la store sin afectar modificaciones por referencia externas.
             */
            const isPrimitive = typeof payload !== "object"
            const nextPayload = isPrimitive ? payload : structuredClone(payload)
            const newState = action(state, nextPayload)
            if (newState === state || !newState) {
                console.error(
                    new Error(`Mal uso en la accion ${key}, Se esperaba una nueva referencia del estado. Asegúrate de que cada acción retorne un nuevo objeto de estado.`).stack
                )
            }
            state = newState
            return newState
        })
    }
    return {
        state,
        actions: actionsWithState,
    }
}


export type { Reducer, Actions, ReducerInput }
export default createReducer