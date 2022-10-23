import './navbar.scss'
import React from "react";

export const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><a href='/'>Main</a></li>
                <li><a href='/'>Calculator</a></li>
                <li><a href='/'>Selection</a></li>
                <li><a href='/'>Info</a></li>
            </ul>
        </nav>
    )
};