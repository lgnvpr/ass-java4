import { useDispatch } from "react-redux";
import { loadingTop } from "./LoadingTop";
import { notification } from "./Notification";
export interface AppModel {
   notification: typeof notification;
   loadingTop : typeof loadingTop;
}

export const models: AppModel = {
   notification: notification,
   loadingTop : loadingTop
}

export const useRematchDispatch = <D extends {}, MD>(
	selector: (dispatch: D) => MD
) => {
	const dispatch = useDispatch<D>();
	return selector(dispatch);
};
