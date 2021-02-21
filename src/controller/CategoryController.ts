/* eslint-disable @typescript-eslint/no-useless-constructor */
import { BaseModel } from "@BaseTypes/model/BaseModel";
import { AxiosInstance } from "axios";
import { Account } from "src/submodules/model-shopping/model/Account";
import { CategoryProduct } from "src/submodules/model-shopping/model/CategoryProduct";
import { BaseController } from "./BaseController";
import { PathNameService } from "./PathNameService";

export class CategoryController extends BaseController<CategoryProduct> {
	constructor(
		serviceURL: string,
		serviceName: PathNameService,
		appClient: AxiosInstance
	) {
		super(serviceURL, serviceName, appClient);
	}

	
}
