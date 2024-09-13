import { Context, ReactNode, useMemo, useRef } from "react";
import observerManager, { Listeners, ObserverManager } from "../utils/observer.utils";

type ContextStore<T> = { observer: null | ObserverManager<T> } & { store: T }

interface ObserverProps<T> {
    children: ReactNode
    store: T
    context: Context<ContextStore<T>>
}

const Observer = <T,>({ children, context, store }: ObserverProps<T>) => {

    const ref = useRef<{ store: T, listeners: Listeners }>({
        store: store,
        listeners: new Set()
    })

    const providerValue = useMemo(() => ({
        store: ref.current.store,
        observer: observerManager(ref.current.listeners, ref.current.store)
    }), [])

    return (
        <context.Provider value={providerValue}>
            {children}
        </context.Provider>
    );
};

export type { ContextStore }
export default Observer