import React from "react";
import { Provider } from "react-redux";
import store from "./store/store"; // store'u içe aktar
import Header from "./pages/Header";
import RouterConfig from "./config/RouterConfig";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <RouterConfig />
    </Provider>
  );
};

export default App;
