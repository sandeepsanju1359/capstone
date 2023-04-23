import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import StateCityDropdowns from "./Components/StateCities/StateCityDropdowns";
import React from "react";
import IndiaMap from "./Components/Maps/IndiaMap";

function App() {
  return (
    <div className="App">
        <StateCityDropdowns/>
        <Navbar/>
        <IndiaMap/>

    </div>
  );
}

export default App;
