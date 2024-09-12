import useDispatch from "@react-observer-context/hooks/useDispatch.hook";
import useSelector from "@react-observer-context/hooks/useSelector.hook";
import { createContext, ReactNode } from "react";
import Provider, { ContextStore } from "../context/Observer.context";
import observerManager, { ObserverCallback } from "../utils/observer.utils";
import { Reducer } from "./createReducer.helper";
import createStore from "./createStore.helper";

const createDynamicContext = <T,>(store: T) => {
    return createContext<ContextStore<T>>({
        observer: observerManager(new Set(), store),
        store: store
    })
}

type ParameterTypeAction<U, K extends keyof U, K2 extends keyof U[K]> = U[K][K2] extends (args: any) => void ? Parameters<U[K][K2]>[0] : never

type ReturnTypeContextStore<T, U> = {
    Provider: (props: { children: ReactNode }) => JSX.Element;
    useDispatch: <K extends keyof U, K2 extends keyof U[K]>({ state, action }: { state: K, action: K2 }) =>
        (payload: ParameterTypeAction<U, K, K2> | ((store: T[K extends keyof T ? K : never]) => ParameterTypeAction<U, K, K2>)) => void;
    useSelector: <B>(cb: ObserverCallback<T, B>) => B | undefined;
    store: T
};

const createContextStore = <T extends { [K in keyof T]: Reducer<any, any> },>(reducers: T) => {
    const { actions, store } = createStore(reducers)

    type Store = typeof store
    type Actions = typeof actions

    const context = createDynamicContext(store);

    const res: ReturnTypeContextStore<Store, Actions> = {
        Provider: (props) => <Provider {...props} context={context} store={store} />,
        useDispatch: ({ state, action }) => {
            const currentAction = actions[state][action]
            return useDispatch(context, { state : store[state], action: currentAction })
        },
        useSelector: <B,>(cb: ObserverCallback<Store, B>) => useSelector(context, cb),
        store: store
    };

    return res
};


export default createContextStore

