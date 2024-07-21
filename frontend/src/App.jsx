import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./login/index.jsx";
import Register from "./register/index.jsx";
import Editor from "./editor/index.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LogIn />}></Route>
        <Route path="/register" exact element={<Register />}></Route>
        <Route path="/editor" element={<Editor />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
