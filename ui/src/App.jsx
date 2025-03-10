import { BrowserRouter as Router, Routes, Route } from "react-router";

import Signup from "./auth/signup";
import Login from "./auth/login";
import Private from "./private";
import Home from "./home";

import "./App.css";

function App() {
  return (
    <Router>
      {/* Public routes */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Private routes */}
        <Route element={<Private />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
