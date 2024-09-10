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

type CommonObject<T> = { [K in keyof T]: any }

type ActionCallback<T, U> = (state: T, payload: U) => void

type ActionGroup<T, U> = {
    [K in keyof U]: ActionCallback<T, U[K]>

}
type Actions<T, U> = {
    [K in keyof U]: ActionGroup<T[K extends keyof T ? K : never], U[K]>
}

type dispatchKeys<U, K2> = keyof U[K2 extends keyof U ? K2 : never]

type ReturnTypeContextStore<T, U> = {
    Provider: (props: { children: ReactNode }) => JSX.Element;
    useDispatch: <K extends dispatchKeys<U, K2>, K2 extends keyof T>(
        { state, action }: { state: K2; action: K }
    ) => (payload: U[K2 extends keyof U ? K2 : never][K] | ((store: T[K2]) => U[K2 extends keyof U ? K2 : never][K])) => void;
    useSelector: <B>(cb: ObserverCallback<T, B>) => B | undefined;
    extendStore: <EX extends CommonObject<EX>, EX2 extends CommonObject<EX>>(
        cb: (store: T, actions: Actions<T, U>) => { extend_actions: Actions<EX, EX2>; extend_store: EX }
    ) => ReturnTypeContextStore<EX, EX2>;
    store : T
};

const createContextStore = <
    T extends CommonObject<T>,
    U extends CommonObject<T>
>(store: T, actions: Actions<T, U>) => {
    const immutableStore = structuredClone(store);
    const context = createDynamicContext(store);

    const inmmutableActions = Object.assign({}, actions)
    const res: ReturnTypeContextStore<T, U> = {
        Provider: (props) => <Provider {...props} context={context} value={immutableStore} />,
        useDispatch: ({ action, state }) => {
            return useDispatch(context, { state, action: inmmutableActions[state as keyof T][action] })
        },
        useSelector: <B,>(cb: ObserverCallback<T, B>) => useSelector(context, cb),
        extendStore: <EX extends CommonObject<EX>, EX2 extends CommonObject<EX>>(
            cb: (store: T, actions: Actions<T, U>) => { extend_actions: Actions<EX, EX2>; extend_store: EX }
        ): ReturnTypeContextStore<EX, EX2> => {
            const { extend_actions, extend_store } = cb(store, actions);
            return createContextStore(extend_store, extend_actions);
        },
        store : immutableStore
    };
    return res
};

export type { ActionCallback, ActionGroup, Actions };
export default createContextStore

