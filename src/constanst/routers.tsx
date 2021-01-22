import * as links from "./links"
import React from 'react';
import { RouteComponentProps, StaticContext } from "react-router";
import Home from "../../src/container/Home";
import Login from "../../src/container/Login";
import Register from "../../src/container/ Register";
export const routes: Routers[] = [
	{
		url: links.DASHBOARD,
		component:  Home,
		exact: true,
	},
	{
		url: links.LOGIN,
		component:  Login,
		exact: true,
	},
	{
		url: links.REGISTER,
		component:  Register,
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
