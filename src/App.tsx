import configureStore from "./helper/configureStore.helper"
import createReducer from "./helper/createReducer.helper"


const f = createReducer({
  actions: {
    setR: (state, payload: string) => {
      state.test.push()
    }
  },
  state: {
    test: []
  }
})

const g = createReducer({
  actions: {
    setRR: (state, payload: number) => {
      state.testT = payload
    }
  },
  state: {
    testT: 0
  }
})

const extendTest = createReducer({
  actions: {
    setEx: (state, payload: number) => {
      state.testExtend = payload
    }
  },
  state: {
    testExtend: 0
  }
})

const { extendStore, Provider, useSelector: Se } = configureStore({
  g,
  f
})


const { store: F, useDispatch, useSelector, Provider: Prov } = extendStore({
  extendTest
})



const ComponentTest = () => {

  const res = useSelector((prev) => prev.g.testT)
  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={() => dispatch((actions, store) => actions.g.setRR(store.g.testT + 1))}>Count{res}</button>
    </div>
  )
}

const ProviderDeep = () => {
  const res = Se((prev) => prev.g.testT)
  return (
    <p>{res}</p>
  )
}

function App() {

  return (
    <>
      <Prov>
        <ComponentTest />
          <ProviderDeep />
      </Prov>
    </>
  )
}

export default App
