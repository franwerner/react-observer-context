import useDispatch from "@/hooks/useDispatch.hook";
import useSelector from "@/hooks/useSelector.hook";
import { createContext, ReactNode } from "react";
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
    store: T
};

const configureStore = <T extends { [K in keyof T]: Reducer<any, any> },>(
    reducers: T,
) => {
    const { actions, store } = createStore(reducers)

    let context = createDynamicContext(store);
    const res: ReturnTypeContextStore<OnlyState<T>, OnlyActions<T>> = {
        Observer: (props) => <Observer {...props} context={context} store={store} />,
        useDispatch: () => useDispatch(context, actions),
        useSelector: <B,>(cb: ObserverCallback<OnlyState<T>, B>) => useSelector(context, cb),
        store: store
    };

    return res
};


export default configureStore

