import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; 

import Home from "./components/Home";
import Signup from "./components/Signup";
import ActivationForm from "./components/ActivationForm";
import Login from "./components/Login";
import Forgetpassword from "./components/Forgetpassword";
import ResetPassword from "./components/ResetPassword";
import Profile from  "./components/Profile";
import Dashboard from "./components/Dashboard"; // Import Dashboard component
import Shortener from "./components/Shortener"; // Import Shortener component
import URLTable from "./components/URLTable"; // Import URLTable component

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/activate" element={<ActivationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile/>}/> 
          <Route path="/dashboard" element={<Dashboard/>}/> 
          <Route path="/urls" element={<URLTable/>}/> 
          <Route path="/shorten" element={<Shortener/>}/> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
