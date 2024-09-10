import { ContextStore } from "@react-observer-context/context/Observer.context";
import { ActionCallback } from "@react-observer-context/helper/createContextStore.helper";
import { Context, useContext } from "react";

const isFunction = (input: any): input is Function => typeof input === "function"


const useDispatch = <T, R, K extends keyof T>(
    context: Context<ContextStore<T>>,
    {
        state,
        action
    }: { state: K, action: ActionCallback<T[K], R> }
) => {

    const value = useContext(context)

    return (payload: ((store: T[K]) => R) | R) => {
        const res = isFunction(payload) ? payload(value.store[state]) : payload
        action(value.store[state], res)
        value.observer.notify()
    }

};


export default useDispatch