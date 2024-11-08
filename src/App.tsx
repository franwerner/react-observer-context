import { configureStore, createReducer } from "../lib"


const r = createReducer<{test : number},{setTest : number}>({
   state : {
     test : 1
   },
   actions : {
    setTest : (state,payload) => {
       state.test = payload
    }
   }
})



const { ObserverStore, useDispatch, useSelector } = configureStore({
  r: r
})


const Ts = () => {

  const t = useSelector((store) => store.r.test)

  const dipatch = useDispatch()


  console.log(t)
  return (
    <>
      <button onClick={() =>dipatch((actions,store) => actions.r.setTest(store.r.test + 1)) }>asdasdasds</button>
      <button onClick={() =>dipatch((actions) => actions.r.setTest(NaN)) }>123</button>
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
