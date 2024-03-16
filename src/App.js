import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Todo from "./Components/Todo";

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <Sidebar />
        <Todo />
      </div>
    </Provider>
  );
};

export default App;
