import createContextStore from "./helper/createContextStore.helper"
import useDispatch from "./hooks/useDispatch.hook"
import useSelector from "./hooks/useSelector.hook"

const { Provider, actions, context } = createContextStore({
  test: 0
},
  {
    setState: (store, payload: number) => {
      store.test = payload
    }
  }
)

const ComponentTest = () => {
  const res = useSelector(context, (store) => store.test)
  const dispatch = useDispatch(context, actions.setState)

  return (
    <div>
      <button onClick={() => dispatch((prev) => prev.test + 1)}>Count</button>
      selector : {res}
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
