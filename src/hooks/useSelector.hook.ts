import { ContextStore } from "@react-observer-context/context/Observer.context";
import { ObserverCallback } from "@react-observer-context/utils/observer.utils";
import { Context, useContext, useEffect, useState } from "react";

const useSelector = <T, ReturnCallback>(context: Context<ContextStore<T>>, selector: ObserverCallback<T, ReturnCallback>) => {

    const value = useContext(context)

    const [notify, setNotify] = useState<ReturnCallback | undefined>(() => selector(value.store))

    useEffect(() => {
        if (!selector) return
        const listener = (store:T) => {
            const res = selector(store)
            if (res && res !== notify) {
                setNotify(res)
            } else if (!res) {
                setNotify(undefined)
            }
        }
        value.observer.subscribe(listener)
        return () => value.observer.unsubscribe(listener)
    }, [notify])

    return notify

};

export default useSelector