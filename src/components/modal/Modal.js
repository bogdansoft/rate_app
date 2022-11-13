import React, {Fragment} from "react";
import './modal.scss';
import {Register} from "../register/Register";
import {Login} from "../login/Login";

export const Modal = () => {

    return (
        <div className='modal'>
            <Fragment>
                <div className='modalHead'>
                    <ul>
                        <li>Enter</li>
                        <li>Registration</li>
                    </ul>
                    <i className='fa fa-times' aria-hidden='true'/>
                </div>
                <hr/>
            </Fragment>
            <Login/>
            {/*<Register/>*/}
        </div>
    )
};