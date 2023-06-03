import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "./components/App";
import { GlobalComponent } from "./components/GlobalComponent";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalComponent />
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
