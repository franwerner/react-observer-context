import useDispatch from "@react-observer-context/hooks/useDispatch.hook";
import useSelector from "@react-observer-context/hooks/useSelector.hook";
import React, { createContext, ReactNode } from "react";
import Observer, { ContextStore } from "../context/Observer.context";
import { ObserverCallback } from "../utils/observer.utils";
import { Reducer } from "./createReducer.helper";
import createStore, { OnlyActions, OnlyState } from "./createStore.helper";

const createDynamicContext = <T,>(store: T) => {
    return createContext<ContextStore<T>>({
        observer: null,
        store: structuredClone(store)
    })
}

type ReturnTypeContextStore<T, U> = {
    Observer: (props: { children: ReactNode }) => JSX.Element;
    useDispatch: () => ((dispacher: (actions: U, store: T) => void) => void)
    useSelector: <B>(cb: ObserverCallback<T, B>) => B | undefined;
    extendStore: <Ex extends { [K in keyof Ex]: Reducer<any, any> }>(extend_reducers: Ex) => ReturnTypeContextStore<T & OnlyState<Ex>, U & OnlyActions<Ex>>,
    store: T
};



const configureStore = <T extends { [K in keyof T]: Reducer<any, any> },>(
    reducers: T,
    _context?: React.Context<ContextStore<OnlyState<T>>>,
) => {
    const { actions, store } = createStore(reducers)

    let context = _context || createDynamicContext(store);
    const res: ReturnTypeContextStore<OnlyState<T>, OnlyActions<T>> = {
        Observer: (props) => <Observer {...props} context={context} store={store} />,
        useDispatch: () => useDispatch(context, actions),
        useSelector: <B,>(cb: ObserverCallback<OnlyState<T>, B>) => useSelector(context, cb),
        extendStore: <Ex extends { [K in keyof Ex  ]: Reducer<any, any> }>(extend_reducers:Ex) => { 
            /**
             * Se extienda con la misma referencia de los reducers anteriores.
             */
            const combiend = {...extend_reducers,...reducers}
            const combiendContext = context as React.Context<ContextStore<OnlyState<T & Ex>>>
            return configureStore(combiend, combiendContext)
        },
        store: store
    };

    return res
};


export default configureStore

