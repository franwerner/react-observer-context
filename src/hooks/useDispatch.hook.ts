import { useStoreContext } from "@/context/ObserverStore.context";

const useDispatch = () => {
    
    const {observer,state,actions} = useStoreContext()

    return (dispatch: ((actions:any, state:any) => void)) => {
        dispatch(actions,state)
        observer?.notify()
    }

}

export default useDispatch