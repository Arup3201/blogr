import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";

import Login from "./components/auth/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
