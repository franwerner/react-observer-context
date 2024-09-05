import { ContextStore } from "@react-observer-context/context/Observer.context";
import { ActionCallback } from "@react-observer-context/helper/createContextStore.helper";
import { Context, useContext } from "react";

const isFunction = (input: any): input is Function => typeof input === "function"

const useDispatch = <T, R>(context: Context<ContextStore<T>>, callback: ActionCallback<T, R>) => {

    const value = useContext(context)

    return (payload: ((store: T) => R) | R) => {
        const res = isFunction(payload) ? payload(value.store) : payload
        callback(value.store, res)
        value.observer.notify()
    }

};


export default useDispatch