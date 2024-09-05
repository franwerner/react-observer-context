type ObserverCallback<T = any,R = any> = (store: T) => R
type Listeners = Set<ObserverCallback>

interface ObserverManager {
    subscribe: (cb: (store:any) => void) => void
    unsubscribe: (cb: (store:any) => void) => void
    notify: () => void,
    listeners: Listeners
}

const observerManager = <T,>(listeners: Listeners, store: T): ObserverManager => ({
    subscribe: (cb) => {
        listeners.add(cb)
    },
    unsubscribe: (cb) => {
        listeners.delete(cb)
    },
    notify: () => {
        listeners.forEach(cb => cb(store))
    },
    listeners: listeners
})

export type { Listeners, ObserverManager, ObserverCallback }
export default observerManager