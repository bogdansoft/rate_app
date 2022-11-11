import './navbar.scss'
import React from "react";
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to='/'>Main</NavLink></li>
                <li><NavLink to='/calc'>Calculator</NavLink></li>
                <li><NavLink to='/sample'>Selection</NavLink></li>
                <li><NavLink to='/info'>Info</NavLink></li>
            </ul>
        </nav>
    )
};
