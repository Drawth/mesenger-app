import "./App.css";
import RouterConfig from "./config/RouterConfig";
import Header from "./pages/Header";
import { Provider } from "react-redux";
import { store } from "./store/store"; // Redux store

function App() {
  return (
    <div>
      <Provider store={store}>
        <Header />
        <RouterConfig />
      </Provider>
    </div>
  );
}

export default App;
