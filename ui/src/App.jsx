import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";

import Signup from "./auth/signup";
import Login from "./auth/login";
import Home from "./home";

function App() {
  return (
    <Router>
      {/* Public routes */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>

      {/* Private routes */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
