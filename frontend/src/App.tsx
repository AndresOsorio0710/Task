import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Master from "./components/master";
import generateStore from "./redux/store";

function App() {
  const store = generateStore();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Master />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
