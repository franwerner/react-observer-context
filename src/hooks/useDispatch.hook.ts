import { ContextStore } from "@react-observer-context/context/Observer.context";
import { Context, useContext } from "react";

const isFunction = (input: any): input is Function => typeof input === "function"

const useDispatch = <T, R extends keyof T, K>(
    context: Context<ContextStore<T>>,
    {
        state,
        action
    }: { state: R, action: (payload: K) => void }
) => {

    const value = useContext(context)

    return (payload: ((store: T[R]) => K) | K) => {
        const res = isFunction(payload) ? payload(value.store[state]) : payload
        action(res)
        value.observer.notify()
    }

};


export default useDispatch