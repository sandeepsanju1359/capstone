import React from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import "./Navbar.css";

function Navbar() {

    const navigate= useNavigate()

    function goToHelpPage(){
        navigate("/help")
    }
    function goToHomePage(){
        navigate("/")
    }
    var name = "<CRP />";
    return (
        <div>
            <div className="navbar_container">
                <div className="navbar_left">{name}</div>
                <div className="navbar_right">
                        <p onClick={goToHomePage}>Home</p>
                        <p onClick={goToHelpPage}>Help</p>

                </div>
            </div>
            <div className="navbar_line">
                <hr />
            </div>
        </div>
    );
}

export default Navbar;

