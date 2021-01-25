import Login from "./container/Login";
import { BrowserHistory, createBrowserHistory, State } from "history";
import React, { useEffect, useState } from "react";
import { Route, Router, Switch } from "react-router-dom";
import "./App.css";
import { routes } from "./constanst/routers";
import Button from "./my-component/Button";
import { REGISTER } from "./constanst/links";
import Notification from "./componet/genaral-component/Notication";
import { loadingTop } from "@rematch/LoadingTop";
import AppLoadingTop from "./componet/genaral-component/LoaddingTop";

export const history = createBrowserHistory({});

function App() {
	const [isAuthen, setIsAuthen] = useState<boolean>(true);
	return isAuthen ? (
		<div>
			<AppLoadingTop></AppLoadingTop>
			<Notification></Notification>
			<Switch>
				{routes.map((route) => {
					return (
						<Route
							exact={route.exact}
							component={route.component}
							render={({ match: { url } }) => route.component}
							path={route.url}
						/>
					);
				})}
			</Switch>
		</div>
	) : (
		<Login></Login>
	);
}

export default App;
