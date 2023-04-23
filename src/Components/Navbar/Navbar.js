import React from "react";
import './Navbar.css'

function Navbar(){

    var name="<CRP />"
    return(
        <div>
            <div className="navbar_container">

                <div className="navbar_left">
                    {name}
                </div>
                <div className="navbar_right">
                    <p>About</p>
                    <p>Help</p>
                </div>
            </div>
            <div className="navbar_line">
                <hr/>
            </div>
        </div>

    )
}

export default Navbar;

