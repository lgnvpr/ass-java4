import { BaseModel } from "@BaseTypes/model/BaseModel";
import { CategoryProduct } from "./CategoryProduct";
import { ImageProduct } from "./ImageProduct";
import { Product } from "./Product";

export class CartProduct extends BaseModel {
	productId?: string;
	customerId ?:string;
	amount?: number;
	product?: Product
}
