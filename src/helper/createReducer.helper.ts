 
 type ActionCallback<T, U> = (state: T, payload: U) => void

 type Actions<T, U> = {
     [K in keyof U]: ActionCallback<T, U[K]>
 }

interface Reducer<T extends object,U> {
    state : T,
    actions : Actions<T,U>,
}

 const createReducer = <T extends object,U>(config:Reducer<T,U>) => {
   return config
};

export type {Reducer}
export default createReducer