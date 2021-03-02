/* eslint-disable @typescript-eslint/no-useless-constructor */
import { BaseModel } from "@BaseTypes/model/BaseModel";
import { AxiosInstance } from "axios";
import { Account } from "src/submodules/model-shopping/model/Account";
import { CategoryProduct } from "src/submodules/model-shopping/model/CategoryProduct";
import { Customer } from "src/submodules/model-shopping/model/Customer";
import { BaseController } from "./BaseController";
import { PathNameService } from "./PathNameService";

export class CustomerController extends BaseController<Customer> {
	constructor(
		serviceURL: string,
		serviceName: PathNameService,
		appClient: AxiosInstance
	) {
		super(serviceURL, serviceName, appClient);
	}

	
}
