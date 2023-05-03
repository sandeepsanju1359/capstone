import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import StateCityDropdowns from "./Components/StateCities/StateCityDropdowns";
import React from "react";
import Help from "./Components/Navbar/Help";


function App() {
  return (
      <BrowserRouter>
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path="/" element= {<StateCityDropdowns/>} />
                <Route path="/help" element={<Help/>}/>

            </Routes>


        </div>
      </BrowserRouter>
  );

}

export default App;
