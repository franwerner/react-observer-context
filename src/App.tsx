import createContextStore from "./helper/createContextStore.helper"
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




const { store, useSelector, useDispatch,Provider } = createContextStore({
  g,
  f
})



const ComponentTest = () => {

  const res = useSelector((prev) => prev.g.testT)
  const dispatch = useDispatch({ state: "g", action: "setRR" })

  return (
    <div>
      <button onClick={() => dispatch(1)}>Count${res}</button>
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
