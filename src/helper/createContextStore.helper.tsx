import useDispatch from "@react-observer-context/hooks/useDispatch.hook";
import useSelector from "@react-observer-context/hooks/useSelector.hook";
import { createContext, ReactNode } from "react";
import Provider, { ContextStore } from "../context/Observer.context";
import observerManager, { ObserverCallback } from "../utils/observer.utils";

const createDynamicContext = <T,>(store: T) => {
    return createContext<ContextStore<T>>({
        observer: observerManager(new Set(), store),
        store: store
    })
}

type ActionCallback<T, U> = (state: T, payload: U) => void

type Actions<T, U> = {
    [K in keyof U]: ActionCallback<T, U[K]>
}
type ReturnTypeContextStore<T, U> = {
    Provider: (props: { children: ReactNode }) => JSX.Element;
    useDispatch: <K extends keyof U>(actionKey: K) => (payload: U[K] | ((store: T) => U[K])) => void;
    useSelector: <B>(cb: ObserverCallback<T, B>) => B | undefined;
    store: T
};

interface ConfigStore<T, U> {
    store: T,
    actions: Actions<T, U>
}

const createContextStore = <T, U>(config: ConfigStore<T, U>) => {
    const { actions, store } = config
    const context = createDynamicContext(store);

    const res: ReturnTypeContextStore<T, U> = {
        Provider: (props) => <Provider {...props} context={context} store={store} />,
        useDispatch: (actionKey) => {
            const currentAction = actions[actionKey]
            return useDispatch(context, currentAction)
        },
        useSelector: <B,>(cb: ObserverCallback<T, B>) => useSelector(context, cb),
        store: store
    };
    return res
};

export type { ActionCallback, Actions };
export default createContextStore

