/* eslint-disable @typescript-eslint/no-useless-constructor */
import { BaseModel } from "@BaseTypes/model/BaseModel";
import { AxiosInstance } from "axios";
import { BaseController } from "./fake/BaseModel";
import { PathNameService } from "./PathNameService";

export class AccountController extends BaseController<Account> {
	constructor(
		serviceURL: string,
		serviceName: PathNameService,
		appClient: AxiosInstance
	) {
		super(serviceURL, serviceName, appClient);
	}
	
	// `${this.serviceURL}/${this.basePath}/login`
	async login(username: string, password: string) {
		// this.client.head
		return this.client
			.get("http://localhost:8080/test/luong", {
				data: { username, password },
			})
			.then((res) => res.data)
			.catch((res) => null);
	}
}
