import * as links from "./links"
import React from 'react';
import { RouteComponentProps, StaticContext } from "react-router";
export const routes: Routers[] = [
	// {
	// 	url: links.DASHBOARD,
	// 	component:  {} as any,
	// 	exact: true,
	// },
];

interface Routers {
    url: string | string[] | undefined;
	component : React.ComponentClass<any, any> | React.FunctionComponent<any> | React.ComponentClass<RouteComponentProps<any, StaticContext, any>, any> ;
	exact : boolean;
	sensitive ?: boolean; // Phân biệt hoa thường
	strict ?:boolean // xác định đường dẫn nghiêm ngặt
}
