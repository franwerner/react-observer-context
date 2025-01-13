import { createContext, ReactNode, useContext, useRef } from "react";
import observerManager, { ObserverManager } from "../utils/observer.utils";

interface Store<T, K> {
    observer: ObserverManager<T>
    state: T
    actions: K
}

interface ObserverStoreProps<T, K> {
    children: ReactNode
    state: T
    actions: K
    observer: ObserverManager<T>
}

const StoreContext = createContext<Store<any, any>>({
    observer: observerManager({}),
    state: {},
    actions: {}
})

const ObserverStore = <T, K>({ children, state, actions, observer }: ObserverStoreProps<T, K>) => {

    const ref = useRef<Store<T, K>>({
        state,
        actions,
        observer
    })

    return (
        <StoreContext.Provider value={ref.current}>
            {children}
        </StoreContext.Provider>
    );
};

const useStoreContext = () => useContext(StoreContext)

export { useStoreContext };
export default ObserverStore