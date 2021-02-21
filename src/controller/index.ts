import axios, { AxiosError, AxiosResponse } from "axios";
import appConfig from "../config/AppConfig";
import { dispatch } from "../rematch/store";
import { AccountController } from "./AccountController";
import { PathNameService } from "./PathNameService";
import { ProductCartController } from "./ProductCartController";
import { ProductController } from "./ProductController";

export const URL = appConfig.apiGatewayUrl;

var timeoutLoading: any;
export const appClient = axios;

appClient.interceptors.request.use(
	function (config) {
		clearTimeout(timeoutLoading);
		dispatch.loadingTop.showLoad();
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

appClient.interceptors.response.use(
	(response: AxiosResponse) => {
		timeoutLoading = setTimeout(() => {
			dispatch.loadingTop.hiddenLoad();
			clearTimeout(timeoutLoading);
		}, 100);
		return response;
	},
	(error: AxiosError) => {
		timeoutLoading = setTimeout(() => {
			dispatch.loadingTop.hiddenLoad();
			clearTimeout(timeoutLoading);
		}, 100);
		if (error.message == "Network Error") {
			dispatch.notification.error("Lỗi kết nối máy chủ");
			// window.location.href = "network-error"
		} else if (error.response) {
			if (error.response.status === 401) {
				// console.log(error.response.data.message)
				dispatch.notification.error(
					"Lỗi xác thực, vui lòng đăng nhập lại"
				);
			} else if (error.response.status && error.response.status === 500) {
				if (error.response.data) {
					dispatch.notification.error(error.response.data.message);
				} else {
					dispatch.notification.error("Có lỗi xảy ra gi do xat r");
				}
			}else if(error?.response?.status === 430){
				dispatch.notification.error(error.response.data.message);
			} 
			else if (
				error.response.status &&
				error.response.status === 400 &&
				error.response.data
			) {

			} else {
			}
		} else {
		}
		return Promise.reject(error);
	}
);

export const accountController = new AccountController(
	appConfig.apiGatewayUrl,
	PathNameService.account,
	appClient
);


export const productController = new ProductController(
	appConfig.apiGatewayUrl,
	PathNameService.product,
	appClient
);

export const categoryController = new ProductController(
	appConfig.apiGatewayUrl,
	PathNameService.category,
	appClient
);

export const cartProductController = new ProductCartController(
	appConfig.apiGatewayUrl,
	PathNameService.cartProduct,
	appClient
);
