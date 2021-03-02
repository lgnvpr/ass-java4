import { authen, AuthenModel } from "./authen";
import { ActionLoadingTop, loadingTop } from "./LoadingTop";
import { notification, NotificationModel } from "./Notification";
import { UpdateDispatch } from "./Type";



export interface ActionRematch {
   notification: typeof notification&UpdateDispatch<NotificationModel>,
   loadingTop : typeof loadingTop&UpdateDispatch<boolean>,
   authen : typeof authen&UpdateDispatch<AuthenModel>
}

export const models = {
   notification: notification,
   loadingTop : loadingTop,
   authen : authen
}


