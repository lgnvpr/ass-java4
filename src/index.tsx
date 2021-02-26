import { ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./rematch/store";
import reportWebVitals from "./reportWebVitals";
import theme from "./style/theme";
const { FacebookProvider, Comments, Share } = require("react-facebook");


ReactDOM.render(
	<BrowserRouter>
		<FacebookProvider appId="163071792283833">
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<App />
				</Provider>
			</ThemeProvider>
		</FacebookProvider>
	</BrowserRouter>,
	document.getElementById("root")
);

reportWebVitals();
