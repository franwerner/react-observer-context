
type ActionCallback<T, U> = (state: T, payload: U) => T

type ActionsInput<T, U> = {
    [K in keyof U]: ActionCallback<T, U[K]>
}
interface ReducerInput<T extends object, U> {
    state: T,
    actions: ActionsInput<T, U>,
}

type Actions<T, U> = {
    [K in keyof U]: (payload: U[K]) => T;
}

type ActionsOutput<T = any, U = any> = Actions<T, U> & { reset: () => T }


interface Reducer<T = any, U = any> {
    state: T,
    actions: ActionsOutput<T, U>,
}

function createReducer<T extends object, U extends object>(config: ReducerInput<T, U>): Reducer<T, U> {
    const actionsWithState: Actions<T, U> = {} as Actions<T, U>

    let state = config.state

    for (const key in config.actions) {
        actionsWithState[key] = ((payload: any) => {
            const action = config.actions[key]
            /**
             * Se debe hacer una copia de cada payload, debido a que queremos limpiar cualquier efecto secundario con respecto a los valores de los estados.
             * Con esto nos asegurado que cualquiero nuevo valor para el estado de state, solo sea parate de la state, haciendo que cualquier modificacion externa no afecte al state.
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

    const reset = () => ({ ...config.state })//config.state = valores iniciales
    const actionsWithReset = { ...actionsWithState, reset }

    return {
        state,
        actions: actionsWithReset,
    }
}


export type { Reducer, ReducerInput, Actions, ActionsOutput }
export { createReducer } 