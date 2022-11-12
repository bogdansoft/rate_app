import React, {useContext} from "react";
import './sample.scss';
import {RateContext} from "../../../context/RateContext";
import {Button} from "../../button/Button";

export const Sample = () => {

    const {state, baseHandler, base2Handler, sampleDateHandler, dataWrite} = useContext(RateContext)

    return (
        <div className='sample'>
            <div className='sampleContainer'>
                <div>
                    <h3>Get exchange course:&nbsp;
                        <select onChange={baseHandler}>
                            {Object.keys(state.currency).map((item, i) => {
                                return (
                                    <option key={item}>{item}</option>
                                )
                            })}
                        </select>
                        &nbsp;&nbsp; to &nbsp;&nbsp;
                        <select onChange={base2Handler}>
                            {Object.keys(state.currency).map((item, i) => {
                                return (
                                    <option key={item}>{item}</option>
                                )
                            })}
                        </select>
                    </h3>
                </div>
                <div className='sampleHead'>
                    <span>Date:<input type='date' onChange={sampleDateHandler}/></span>
                    <Button text='Get exchange course' click={dataWrite} arg={state.sample}/>
                </div>
                <div className='sampleResult'>
                    <ul>
                        {Object.keys(state.sampleList).map((item, i) => {
                            return (
                                <li key={item}>
                                    <span><img src={state.currency[state.sampleList[item].base].flag}
                                               alt={item}/>&nbsp;{state.sampleList[item].base}</span>
                                    <span>{state.sampleList[item].date}</span>
                                    <span>{`${state.sampleList[item].course} ${state.sampleList[item].base2}`}</span>
                                    <button><i className='fa fa-times'/></button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}