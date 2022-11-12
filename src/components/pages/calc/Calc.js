import React from "react";
import './calc.scss';
import {Counter} from "../counter/Counter";
import {CountResult} from "../../countResult/CountResult";

export const Calc = () => {
    return (
        <h1>
            <div className='calculator'>
                <div className='calcContainer'>
                    <Counter/>
                    <CountResult/>
                </div>
            </div>
        </h1>
    )
}