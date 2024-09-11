import createContextStore from "./helper/createContextStore.helper"
import createReducer, { Reducer } from "./helper/createReducer.helper"

/**
*Creo un symbol que se le va a 
* 
 */
const f = createReducer({
  actions: {
    setR: (state, payload: string) => {
      state.test = payload
    }
  },
  state: {
    test: "hola"
  }
})
const g = createReducer({
  actions: {
    setRR: (state, payload: number) => {
      state.testT = payload
    }
  },
  state: {
    testT: "hola"
  }
})

type ReducerList<T extends { [key: string]: Reducer<any, any> }> = {
  [Key in keyof T]: T[Key]
};


const index = <T extends { [key: string]: Reducer<any, any> },>(reducers: ReducerList<T>) => {

  type KeyActions = {[K in keyof T]: keyof T[K]['actions']}[keyof T]
  type keyCallback = {[K in keyof T]: T[K]['actions'][keyof T[K]['actions'] ]  }[keyof T]
  let stackActions = {} as Record<KeyActions, keyCallback> 
  let stackStates = {} as { [K in keyof T]: T[K]['state'] }
  let stores = new Set()
  for (const key in reducers) {
    const reducer = reducers[key]
    if (reducer) {
      const state = reducer["state"]
      const actions = reducer["actions"]
      for (const key in actions) {
          const action = actions[key]
          if(action){
            stackActions[key as keyof typeof stackActions] = action
          }
      }
      stackStates[key] = state
    }

  }
  return stackActions
}

const t = index({
  g,
  f
})

t.setRR()

const { Provider, useDispatch, useSelector, store } = createContextStore({
  store: {
    test: {
      a: 0
    },
  },
  actions: {
    setTest: (state, payload: number) => {
      state.test.a += payload
    }
  }
})


const ComponentTest = () => {

  const res = useSelector((prev) => prev.test.a)
  const dispatch = useDispatch("setTest")

  return (
    <div>
      <button onClick={() => dispatch(1)}>Count{res}</button>
    </div>
  )
}

function App() {

  return (
    <>
      <Provider>
        <ComponentTest />
      </Provider>
    </>
  )
}

export default App
