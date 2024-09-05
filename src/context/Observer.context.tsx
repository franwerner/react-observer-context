import { Context, ReactNode, useMemo, useRef } from "react";
import observer, { Listeners, ObserverManager } from "../utils/observer.utils";

type ContextStore<T> = { observer: ObserverManager } & { store: T }

interface ObserverProps<T> {
    children: ReactNode
    value: T
    context: Context<ContextStore<T>>
}

const Observer = <T,>({ children, context, value}: ObserverProps<T>) => {

    const ref = useRef<{ store: T, listeners: Listeners }>({
        store: value,
        listeners: new Set()
    })

    const providerValue = useMemo(() => ({
        store: ref.current.store,
        observer: observer(ref.current.listeners, ref.current.store)
    }), [])

    return (
        <context.Provider value={providerValue}>
            {children}
        </context.Provider>
    );
};

export type { ContextStore }
export default Observer