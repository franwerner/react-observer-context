import { configureStore } from "./helper/configureStore.helper"
import { createReducer } from "./helper/createReducer.helper"

const stateTo = {
  test: 1,
  g: 1
}

const r = createReducer({
  state: stateTo,
  actions: {
    setTest: (state, payload: number) => {
      return {
        ...state,
        test: payload
      }
    },
  }
})

const { ObserverStore, useDispatch, useSelector } = configureStore({
  r: r,
})

const Ts = () => {

  const state = useSelector((store) => store.r)

  const dipatch = useDispatch()

  console.log(state)

  return (
    <>
      <button onClick={() => dipatch((action,) => {
        action.r.setTest(2)
      })}>{1}</button>

      <button onClick={() => dipatch(({ r }) => r.reset())}>Reset</button>
    </>
  )
}

function App() {
  return (
    <>
      <ObserverStore>
        <Ts></Ts>
      </ObserverStore>
    </>



  )
}

export default App
