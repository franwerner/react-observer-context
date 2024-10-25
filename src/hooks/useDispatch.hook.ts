import { ContextStore } from "@/context/ObserverStore.context";
import { Context, useContext } from "react";

const useDispatch = <T, U>(
    context: Context<ContextStore<T>>,
    actions: U
) => {
    const {observer,store} = useContext(context)

    return (dispatch: ((actions: U, store: T) => void)) => {
        dispatch(actions,store)
        observer?.notify()
    }

};


export default useDispatch