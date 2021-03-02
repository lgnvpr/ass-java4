import { createModel } from "@rematch/core";
import { VariantType } from "notistack";
import { createNewModel } from "./Type";


export type NotificationModel = {
	message?: string;
	variant?: VariantType;
	latestAt?: Date;
};

export interface NotificationAction  {
	error: (message: string, state?: any) => void

	success:(message: string, state?: any) => void

	info: (message: string, state?: any) => void
};

export enum VariantTypeEnum {
	default = "default",
	success = "success",
	error = "error",
	warning = "warning",
	info = "info",
}



export const notification = createNewModel<NotificationModel, NotificationAction>({
	state:  {
		latestAt: new Date(),
		message: "",
		variant: "success"
	},
	reducers: {
		update(state: NotificationModel, data: any = {}) {
			state = {
				...state,
				...data,
			};
			return state;
		},
	},
	effects: (dispatch) => ({
		error(message: string, state?: any) {
			const updatedState: NotificationModel = {
				...state.notification,
				message: message,
				variant: VariantTypeEnum.error,
				latestAt: new Date(),
			};
			dispatch.notification.update(updatedState);
		},

		success(message: string, state: any) {
			const updatedState: NotificationModel = {
				...state.notification,
				message: message,
				variant: VariantTypeEnum.success,
				latestAt: new Date(),
			};
			dispatch.notification.update(updatedState);
		},

		info(message: string, state: any) {
			const updatedState: NotificationModel = {
				...state.notification,
				message: VariantTypeEnum.info,
				variant: message,
				latestAt: new Date(),
			};
			dispatch.notification.update(updatedState);
		},
	}),
});
