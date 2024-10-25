import { Context, ReactNode, useRef } from "react";
import observerManager, { ObserverManager } from "../utils/observer.utils";

type ContextStore<T> = { observer: null | ObserverManager<T> } & { store: T }


interface ObserverStoreProps<T> {
    children: ReactNode
    store: T
    context: Context<ContextStore<T>>
}

const ObserverStore = <T,>({ children, context, store, }: ObserverStoreProps<T>) => {

    const ref = useRef<{ store: T, observer: ObserverManager<T> }>({
        store: store,
        observer: observerManager(store)
    })

    return (
        <context.Provider value={ref.current}>
            {children}
        </context.Provider>
    );
};

export type { ContextStore };
export default ObserverStore