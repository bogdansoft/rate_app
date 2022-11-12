import React, {useContext} from "react";
import './sample.scss';
import {RateContext} from "../../../context/RateContext";
import {Button} from "../../button/Button";

export const Sample = () => {

    const {state} = useContext(RateContext)

    return (
        <div className='sample'>
            <div className='sampleContainer'>
                <div>
                    <h3>Get exchange course:&nbsp;
                        <select>
                            {Object.keys(state.currency).map((item, i) => {
                                return (
                                    <option key={item}>{item}</option>
                                )
                            })}
                        </select>
                        &nbsp;&nbsp; to &nbsp;&nbsp;
                        <select>
                            {Object.keys(state.currency).map((item, i) => {
                                return (
                                    <option key={item}>{item}</option>
                                )
                            })}
                        </select>
                    </h3>
                </div>
                <div className='sampleHead'>
                    <span>Date:<input type='date'/></span>
                    <Button text='Get exchange course'/>
                </div>
                <div className='sampleResult'>
                    <ul></ul>
                </div>
            </div>
        </div>
    )
}