import configureStore from "./helper/configureStore.helper"
import createReducer from "./helper/createReducer.helper"


const f = createReducer({
  actions: {
    setR: (state, payload: string) => {
      state.test.push(payload)
    }
  },
  state: {
    test: ["f"]
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



const {Observer,useSelector,extendStore,useDispatch} = configureStore({g,f})

extendStore({extendTest})

const ProviderDeep = () => {
  const res = useSelector((prev) => prev.g.testT)
  const dispatch = useDispatch()

  return (
    <p onClick={() => dispatch((actions,store) => actions.g.setRR(store.g.testT + 1) )}>{res}</p>
  )
}

function App() {

  return (
    <>
        <Observer>
          <ProviderDeep />
        </Observer>
    </>



  )
}

export default App
