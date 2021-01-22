import Login from "./container/Login";
import { createBrowserHistory } from "history";
import React, { useState } from "react";
import { Route, Router, Switch } from "react-router-dom";
import "./App.css";
import { routes } from "./constanst/routers";

export const history = createBrowserHistory({});

function App() {
	const [isAuthen, setIsAuthen] = useState<boolean>(true);
	return isAuthen ? (
		<div>
			<Router history={history}>
				<Switch>
					{routes.map((route) => {
						return (
							<Route
								exact={route.exact}
								component={route.component}
								path={route.url}
								sensitive={route.sensitive}
								strict={route.strict}
							/>
						);
					})}
				</Switch>
			</Router>
		</div>
	): <Login></Login>
}

export default App;
