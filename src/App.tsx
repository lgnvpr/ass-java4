import React from 'react';
import { Route, Router, Switch } from "react-router-dom";
import './App.css';
import { routes } from './constanst/routers';
import { createBrowserHistory } from "history";

export const history = createBrowserHistory({});

function App() {
  return (

					<Router history={history}>
						<Switch>
							{routes.map((route) => {
								return (
									<Route
									exact = {route.exact}
									component = {route.component}
									path ={route.url}
									sensitive = {route.sensitive}
									strict = {route.strict}
													/>
								);
							})}
						</Switch>
					</Router>

  );
}

export default App;
