import configureStore from "./helper/configureStore.helper"
import createReducer from "./helper/createReducer.helper"

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
    }
  }
})

const { ObserverStore, useDispatch, useSelector } = configureStore({
  r: r,
})


const Ts = () => {

  useSelector((store) => store.r)

  const dipatch = useDispatch()


  return (
    <>
      <button onClick={() => dipatch(({ r }, state) => {
        r.setTest(state.r.test + 1)
      })}>{1}</button>
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
