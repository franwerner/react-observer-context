import { Context, createContext, ReactNode } from "react";
import Provider, { ContextStore } from "../context/Observer.context";
import observerManager from "../utils/observer.utils";

const createDynamicContext = <T,>(contextValue: T) => {
    return createContext<ContextStore<T>>({
        observer: observerManager(new Set(), {}),
        store: contextValue
    })
}

type ActionCallback<T , U> = (store: T, payload: U) => void

type Actions<T, U> = {
    [K in keyof U]: ActionCallback<T, U[K]>
}

type ReturnTypeContextStore<T, U> = {
    Provider: (props: { children: ReactNode }) => JSX.Element
    context: Context<ContextStore<T>>
    actions: Actions<T, U>
}


const createContextStore = <T, U>(contextValue: T, actions: Actions<T, U>) => {
    const immutable = structuredClone(contextValue);
    const context = createDynamicContext(contextValue);

    const res: ReturnTypeContextStore<T, U> = {
        Provider: (props) => <Provider {...props} context={context} value={immutable} />,
        context,
        actions
    };
    return res
};

export type { Actions, ActionCallback }
export default createContextStore