import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ParallaxProvider } from "react-scroll-parallax";

import store from "./store";
import "./style.css";
import App from "./containers/app";
import "./index.scss";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ParallaxProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ParallaxProvider>,
  rootElement
);
