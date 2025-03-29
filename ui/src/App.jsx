import { BrowserRouter as Router, Routes, Route } from "react-router";

import AuthProvider from "./context/AuthProvider";

import Signup from "./auth/signup";
import Login from "./auth/login";

import PrivateRoute from "./private";
import Home from "./home";
import Account from "./account";
import Editor from "./editor";
import Blog from "./blog";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Public routes */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/blog/:blog_id" element={<Blog />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
