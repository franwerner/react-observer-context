import createContextStore from "./helper/createContextStore.helper"


const { Provider, useDispatch, useSelector } = createContextStore({
  test: {
    color: {},
    a: 1
  },
  hola: {
    f: 0
  }
},
  {
    test: {
      setState: (state, payload: string) => {
        state.color = payload
      },

      setState32: (store, payload: number) => {
        store.a = payload
      }
    },
    hola: {
      setState3: (store, payload: number) => {
        store.f = payload
      }
    }
  }
)


const ComponentTest = () => {

  const res = useSelector((prev) => prev.test.a)
  const dispatch = useDispatch({ state: "test", action: "setState32" })

  return (
    <div>
      <button onClick={() => dispatch((prev) => prev.a + 1)}>Count{res}</button>
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
