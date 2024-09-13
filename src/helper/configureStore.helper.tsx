import useDispatch from "@react-observer-context/hooks/useDispatch.hook";
import useSelector from "@react-observer-context/hooks/useSelector.hook";
import React, { createContext, ReactNode } from "react";
import Provider, { ContextStore } from "../context/Observer.context";
import { ObserverCallback } from "../utils/observer.utils";
import { Reducer } from "./createReducer.helper";
import createStore, { OnlyActions, OnlyState } from "./createStore.helper";
import { Context } from "vm";

const createDynamicContext = <T,>(store: T) => {
    return createContext<ContextStore<T>>({
        observer: null,
        store: structuredClone(store)
    })
}

type ReturnTypeContextStore<T, U> = {
    Provider: (props: { children: ReactNode }) => JSX.Element;
    useDispatch: () => ((dispacher: (actions: U, store: T) => void) => void)
    useSelector: <B>(cb: ObserverCallback<T, B>) => B | undefined;
    extendStore: <Ex extends { [K in keyof Ex]: Reducer<any, any> }>(extend_reducers: Ex) => ReturnTypeContextStore<T & OnlyState<Ex>, U & OnlyActions<Ex>>,
    store: T
};

const configureStore = <T extends { [K in keyof T]: Reducer<any, any> },>(reducers: T, _context?: React.Context<ContextStore<OnlyState<T>>>) => {
    const { actions, store } = createStore(reducers)

    const context = _context || createDynamicContext(store);


    const res: ReturnTypeContextStore<OnlyState<T>, OnlyActions<T>> = {
        Provider: (props) => <Provider {...props} context={context} store={store} />,
        useDispatch: () => useDispatch(context, actions),
        useSelector: <B,>(cb: ObserverCallback<OnlyState<T>, B>) => useSelector(context, cb),
        extendStore: <Ex extends { [K in keyof Ex]: Reducer<any, any> }>(extend_reducers: Ex) => {
            const combiend = { ...reducers, ...extend_reducers }
            return configureStore(combiend, context as React.Context<ContextStore<OnlyState<T & Ex>>>)
        },
        store: store
    };

    return res
};


export default configureStore

