type ObserverCallback<T = any, R = any> = (store: T) => R
type Listeners = Set<ObserverCallback>

interface ObserverManager<T> {
    subscribe: (cb: (store: T) => void) => void
    unsubscribe: (cb: (store: T) => void) => void
    notify: () => void,
    listeners: Listeners
}

const observerManager = <T,>(listeners: Listeners, store: T): ObserverManager<T> => ({
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