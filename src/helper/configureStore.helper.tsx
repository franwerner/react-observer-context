import useDispatch from "@/hooks/useDispatch.hook";
import useSelector from "@/hooks/useSelector.hook";
import { ReactNode } from "react";
import ObserverStore from "../context/ObserverStore.context";
import observerManager, { ObserverCallback, ObserverManager } from "../utils/observer.utils";
import { Reducer } from "./createReducer.helper";
import createStore, { OnlyActions, OnlyState } from "./createStore.helper";


type ReturnTypeContextStore<T, U> = {
    ObserverStore: (props: { children: ReactNode }) => JSX.Element
    useDispatch: () => ((dispacher: (actions: U, store: T) => void) => void)
    useSelector: <B>(cb: ObserverCallback<T, B>) => B | undefined
    store: Readonly<{
            state: T,
            observer: ObserverManager<T>
    }>
};

const configureStore = <T extends { [K in keyof T]: Reducer },>(
    reducers: T,
) => {
    const { actions, state } = createStore(reducers)
    const observer = observerManager(state)

    const res: ReturnTypeContextStore<OnlyState<T>, OnlyActions<T>> = {
        
        ObserverStore: (props) => <ObserverStore  {...props} actions={actions} state={state} observer={observer} />,
        useDispatch,
        useSelector,
        store: {
            state,
            observer
        },
    };

    return res
};


export  {configureStore}

