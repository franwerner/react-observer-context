type ObserverCallback<T = any, R = any> = (state: T) => R
type Listeners = Set<ObserverCallback>

interface ObserverManager<T> {
    subscribe: (cb: (state: T) => void) => void
    unsubscribe: (cb: (state: T) => void) => void
    notify: () => void,
    listeners: Set<ObserverCallback>
}

const observerManager = <T,>(state: T): ObserverManager<T> => ({
    listeners : new Set(),
    subscribe: function(cb) {
        this.listeners.add(cb)
    },
    unsubscribe: function(cb){
        this.listeners.delete(cb)
    },
    notify:function() {
        this.listeners.forEach(cb => cb(state))
    },
})

export type { Listeners, ObserverManager, ObserverCallback }
export default observerManager