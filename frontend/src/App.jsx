import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./login/index.jsx";
import Register from "./register/index.jsx";
import MainPage from "./main-page/index.jsx";
import Editor from "./editor/index.jsx";
import { AuthContext } from "./store/authentication-context.jsx";

function App() {
  const authCxt = {
    isLoading: false,
    setIsLoading: function (state) {
      return { isLoading: state };
    },
  };

  return (
    <AuthContext.Provider value={authCxt}>
      <Router>
        <Routes>
          <Route path="/" exact element={<LogIn />}></Route>
          <Route path="/register" exact element={<Register />}></Route>
          {/* <Route path="/editor" element={<Editor />}></Route> */}
          <Route path="/main-page" exact element={<MainPage />}></Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
