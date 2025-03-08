import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";

import Login from "./auth/login";
import Signup from "./auth/signup";

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
