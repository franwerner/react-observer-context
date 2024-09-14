import { Context, ReactNode, useRef } from "react";
import observerManager, { ObserverManager } from "../utils/observer.utils";

type ContextStore<T> = { observer: null | ObserverManager<T> } & { store: T }


interface ObserverProps<T> {
    children: ReactNode
    store: T
    context: Context<ContextStore<T>>
}

const Observer = <T,>({ children, context, store, }: ObserverProps<T>) => {

    const ref = useRef<{store : T,observer : ObserverManager<T>}>({
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
export default Observer