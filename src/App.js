import "./App.css";
import React from "react";
import BmiComponent from "./BmiComponent";
import SelectBodyParts from "./SelectBodyParts";
import DashBoard from "./DashBoard";
import { Route, Link, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import ResponsiveAppBar from "./NavBar";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route exact path="/" element={<BmiComponent />} />
        <Route exact path="/bmicalculator" element={<BmiComponent />} />
        <Route exact path="/workoutdiary" element={<SelectBodyParts />} />
        <Route exact path="/dashboard" element={<DashBoard />} />
      </Routes>
    </div>
  );
}

export default App;
