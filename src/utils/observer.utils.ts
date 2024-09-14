type ObserverCallback<T = any, R = any> = (store: T) => R
type Listeners = Set<ObserverCallback>

interface ObserverManager<T> {
    subscribe: (cb: (store: T) => void) => void
    unsubscribe: (cb: (store: T) => void) => void
    notify: () => void,
    listeners: Set<ObserverCallback>
}

const observerManager = <T,>(store: T): ObserverManager<T> => ({
    listeners : new Set(),
    subscribe: function(cb) {
        this.listeners.add(cb)
    },
    unsubscribe: function(cb){
        this.listeners.delete(cb)
    },
    notify:function() {
        this.listeners.forEach(cb => cb(store))
    },
})

export type { Listeners, ObserverManager, ObserverCallback }
export default observerManager