import * as links from "./links"
import React from 'react';
import { RouteComponentProps, StaticContext } from "react-router";
import Login from "../../src/container/Login";
import Register from "../../src/container/ Register";
import ProductPage from "../container/ProductPage";
import ProductDetail from "../container/ProductDetail";
import CartPage from "../container/CartPage";
import InfoCustomer from "../container/InfoCustomer";
import ConfirmCart from "../container/ConfirmCart";
import ProductPageAdmin from "../container/ProductPageAdmin";
import CategoryAdmin from "../container/CategoryAdmin";
import Checkout from "../container/Checkout";
export const routes: Routers[] = [
	{
		url: links.ListProduct,
		component:  ()=><ProductPage></ProductPage>,
		exact: true,
	},
	{
		url: links.LOGIN,
		component:  ()=> <Login></Login>,
		exact: true,
	},
	{
		url: links.REGISTER,
		component:  ()=><Register></Register>,
		exact: true,
	},
	{
		url: links.ProductDetail,
		component:  ()=><ProductDetail/>,
		exact: true,
	},
	{
		url: links.inputInfoCustomer,
		component:  ()=><InfoCustomer/>,
		exact: true,
	},
	{
		url: links.confirmCart,
		component:  ()=><ConfirmCart/>,
		exact: true,
	},
	{
		url: links.productAdmin,
		component:  ()=><ProductPageAdmin/>,
		exact: true,
	},
	{
		url: links.categoryAdmin,
		component:  ()=><CategoryAdmin/>,
		exact: true,
	},
	{
		url: links.checkout,
		component:  ()=><Checkout/>,
		exact: true,
	},




	

];

interface Routers {
    url: string | string[] | undefined;
	component : React.ComponentClass<any, any> | React.FunctionComponent<any> | React.ComponentClass<RouteComponentProps<any, StaticContext, any>, any> ;
	exact : boolean;
	sensitive ?: boolean; // Phân biệt hoa thường
	strict ?:boolean // xác định đường dẫn nghiêm ngặt
}
