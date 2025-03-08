import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";

import Home from "./components/home";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
