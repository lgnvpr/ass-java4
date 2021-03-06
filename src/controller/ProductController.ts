/* eslint-disable @typescript-eslint/no-useless-constructor */
import { BaseModel } from "@BaseTypes/model/BaseModel";
import { AxiosInstance } from "axios";
import { Account } from "src/submodules/model-shopping/model/Account";
import { Product } from "src/submodules/model-shopping/model/Product";
import { BaseController } from "./BaseController";
import { PathNameService } from "./PathNameService";

export class ProductController extends BaseController<Product> {
	constructor(
		serviceURL: string,
		serviceName: PathNameService,
		appClient: AxiosInstance
	) {
		super(serviceURL, serviceName, appClient);
	}

	
}
