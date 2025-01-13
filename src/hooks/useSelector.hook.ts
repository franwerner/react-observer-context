import { useStoreContext } from "@/context/ObserverStore.context";
import { ObserverCallback } from "@/utils/observer.utils";
import { useEffect, useState } from "react";


const useSelector = <T, ReturnCallback>(selector: ObserverCallback<T, ReturnCallback>) => {

    const { observer, state } = useStoreContext()

    const [notify, setNotify] = useState<ReturnCallback | undefined>(() => selector(state))

    useEffect(() => {
        if (!selector) return
        const listener = (state: T) => {
            const res = selector(state)

            if (!Object.is(res, notify)) {
                setNotify(res)
            }
        }
        observer?.subscribe(listener)
        return () => observer?.unsubscribe(listener)
    }, [notify])

    return notify

};

export default useSelector