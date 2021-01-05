import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import { Provider } from "react-redux";
import App from './App';
import { store } from "./rematch/store";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
         <App/>
   </Provider>,
  document.getElementById('root')
);

reportWebVitals();