import "./App.css";
import RouterConfig from "./config/RouterConfig";
import Header from "./pages/Header";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store"; // Redux store
import { useEffect } from "react";
import { fetchUsers } from "./store/authSlice"; // Kullanıcıları çekmek için ekledik
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Uygulama yüklendiğinde kullanıcıları çek
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <RouterConfig />
    </div>
  );
};

// Provider ile sarmalama
const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWrapper;
