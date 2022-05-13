// import logo from './logo.svg';
// import './App.css';
import { useReducer, useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import Home from "./pages/Home";

library.add(faEyeSlash, faEye);

const initialTodos = [];
const reducer = (state, action) => {
  switch (action.type) {
    case "Complete":
      return ["Todo"];
    default:
      return state;
  }
};
function App() {
  // const [todos, dispatch] = useReducer(reducer, initialTodos);
  // useEffect(() => {
  //   dispatch({type: 'Complete'});
  //   console.log('effect');
  // })
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Form />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
