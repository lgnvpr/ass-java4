/* eslint-disable @typescript-eslint/no-useless-constructor */
import { BaseModel } from "@BaseTypes/model/BaseModel";
import { AxiosInstance } from "axios";
import { Account } from "src/submodules/model-shopping/model/Account";
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
			.then((res) => res)
			.catch((res) => null);
	}
}
