type ObserverCallback<T = any, R = any> = (state: T) => R
type Listeners = Set<ObserverCallback>

interface ObserverManager<T> {
    subscribe: (cb: (state: T) => void) => Function
    unsubscribe: (cb: (state: T) => void) => void
    notify: () => void,
    listeners: Set<ObserverCallback>
}

const observerManager = <T,>(state: T): ObserverManager<T> => ({
    listeners : new Set(),
    subscribe(cb) {
        this.listeners.add(cb)
        return () => this.unsubscribe(cb)
    },
    unsubscribe(cb){
        this.listeners.delete(cb)
    },
    notify() {
        this.listeners.forEach(cb => cb(state))
    },
})

export type { Listeners, ObserverManager, ObserverCallback }
export default observerManager