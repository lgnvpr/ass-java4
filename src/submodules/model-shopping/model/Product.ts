import { BaseModel } from "@BaseTypes/model/BaseModel";
import { CategoryProduct } from "./CategoryProduct";
import { ImageProduct } from "./ImageProduct";

export class Product extends BaseModel {
	name?: string;
	price?: number;
	description?: string;
	categoryProductId?: string;
	priceSale?: number;
	percentSale?: number;
	image?: string;
	categoryProduct?: CategoryProduct;
	productImage ? :ImageProduct[]
}
