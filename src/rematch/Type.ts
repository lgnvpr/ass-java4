import { ModelReducers, createModel } from "@rematch/core";
import { Action } from "history";
import { useDispatch } from "react-redux";
import { ActionRematch } from ".";

export const useRematchDispatch = <D extends {}, MD>(
	selector: (dispatch: D) => MD
) => {
	const dispatch = useDispatch<D>();
	return selector(dispatch);
};


export interface ModelConfigNew<S = any, P=any> {
	name?: string
	state: S
	baseReducer?: (state: S, action: Action) => S
	reducers?: ModelReducers<S>
	effects?: (dispatch: ActionRematch&UpdateDispatch<S>, ) => P,
	update ?: (payload : S)=> void
}
export function createNewModel<T, P>(model: ModelConfigNew<T, P>): P  {
   return createModel(model as any) as any;
}

export type UpdateDispatch<T> ={
    update : (payload : T ) => void
}
