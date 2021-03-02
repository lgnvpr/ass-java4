/* eslint-disable @typescript-eslint/no-useless-constructor */
import { BaseModel } from "@BaseTypes/model/BaseModel";
import { AxiosInstance } from "axios";
import { Account } from "src/submodules/model-shopping/model/Account";
import { Customer } from "src/submodules/model-shopping/model/Customer";
import { BaseController } from "./BaseController";
import { PathNameService } from "./PathNameService";

export class AccountController extends BaseController<Account> {
	constructor(
		serviceURL: string,
		serviceName: PathNameService,
		appClient: AxiosInstance
	) {
		super(serviceURL, serviceName, appClient);
	}

	//
	async login(username: string, password: string) {
		return this.client
			.get(`${this.serviceURL}/${this.basePath}/login`, {
				params: { username, password },
			})
			.then((res) => res.data)
			.catch((res) => null);
	}

	async register(params : Account) {
		return this.client
			.post(`${this.serviceURL}/${this.basePath}/register`, params)
			.then((res) => res.data)
			.catch((res) => null);
	}
	async loginWihGoogle(params : Customer) {
		return this.client
			.get(`${this.serviceURL}/${this.basePath}/loginWithGoogle`, {params : params})
			.then((res) => res.data)
			.catch((res) => null);
	}
	async checkAdmin(){
		return this.client
			.get(`${this.serviceURL}/${this.basePath}/checkAuthen`)
			.then((res) => res.data)
			.catch((res) => null);
	}
}
