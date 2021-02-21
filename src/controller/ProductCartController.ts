/* eslint-disable @typescript-eslint/no-useless-constructor */
import { AxiosInstance } from "axios";
import { CartProduct } from "src/submodules/model-shopping/model/CartProduct";
import { dispatch } from "../rematch/store";
import { BaseController } from "./BaseController";
import { PathNameService } from "./PathNameService";

export class ProductCartController extends BaseController<CartProduct> {
	constructor(
		serviceURL: string,
		serviceName: PathNameService,
		appClient: AxiosInstance
	) {
		super(serviceURL, serviceName, appClient);
	}

	addToCart(item: CartProduct): Promise<CartProduct>{
		return this.client
      .post(`${this.serviceURL}/${this.basePath}/addToCart`, item)
      .then((res) => {
        dispatch.notification.success("Lưu thành công!!!");
        return res.data;
      });
	}

	
}
