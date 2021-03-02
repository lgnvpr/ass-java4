import { User } from "src/submodules/model-shopping/model/User";
import { createModel, ModelConfig } from "@rematch/core";
import { dispatch } from "./store";
import { appClient } from "src/controller";
import { createNewModel } from "./Type";

export type AuthenModel = {
	user?: User;
	isAuthen: boolean;
};

export type ActionAuthen = {
	login: (user: User, state?: any) => void; // todo : check any
	logout: (state?: any) => void;
};

export const authen = createNewModel<AuthenModel, ActionAuthen>({
	state: {
		isAuthen: true,
	},
	reducers: {
		update(state: AuthenModel, payload: AuthenModel) {
			state = {
				...state,
				...payload,
			};
			console.log(state);
			return state;
		},
	},
	effects: (dispatch) => ({
		async login(user: User, state) {
			console.log(user.token)
			
			await global.localStorage.setItem("token", user.token || "");
			await global.localStorage.setItem("userId", user.id || "")
			const authen: AuthenModel = {
				user: user,
				isAuthen: true,
			};
			dispatch.authen.update(authen)
			window.location.href ="/products"
		},
		logout() {
			global.localStorage.setItem("JWT", "" || "");
			window.location.href ="/login"
		},
	}),
});
