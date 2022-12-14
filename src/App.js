import React from "react";
import './App.scss';
import {Component} from "react";
import Layout from "./components/layout/Layout";
import CHF from './image/CHF.png'
import CNY from './image/CNY.png'
import EUR from './image/EUR.png'
import GBP from './image/GBP.png'
import JPY from './image/JPY.png'
import USD from './image/USD.png'
import {RateContext} from "./context/RateContext";
import axios from "axios";
import {Dark} from "./components/dark/Dark";
import {Modal} from "./components/modal/Modal";
import {Input} from "./components/input/Input";

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            error: '',
            formControls: {
                email: {
                    value: '',
                    type: 'email',
                    label: 'Email',
                    errorMessage: 'Enter correct email',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        email: true
                    }
                },
                password: {
                    value: '',
                    type: 'password',
                    label: 'Password',
                    errorMessage: 'Enter correct password',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6
                    }
                }
            },
            base: 'USD',
            rate: '',
            date: '',
            currency: {
                USD: {name: 'Dollar США', flag: USD, course: ''},
                CNY: {name: 'Chinese Uan', flag: CNY, course: ''},
                EUR: {name: 'Euro', flag: EUR, course: ''},
                GBP: {name: 'Funt Sterling', flag: GBP, course: ''},
                JPY: {name: 'Japanese Jena', flag: JPY, course: ''},
                CHF: {name: 'Swiss Frank', flag: CHF, course: ''},
            },
            //calculator
            inputValue: 100,
            currencyValue: 'USD',
            result: null,
            //sample
            sample: {
                base: 'USD',
                base2: 'EUR',
                date: '',
                course: ''
            },
            sampleList: '',
            showModal: false,
            isFormValid: false
        }
    }

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post(' https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvdlZF7J_qNG2nYVbEirkyO65IvE63-xo', authData)

            if (response.data.idToken) {

                const formControls = [...this.state.formControls]
                formControls.email.value = ''
                formControls.password.value = ''

                this.setState({
                    auth: true,
                    showModal: false,
                    error: '',
                    formControls
                })
            }
        } catch (e) {
            console.log(e)
            this.setState({error: 'Error'})
        }
    }

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvdlZF7J_qNG2nYVbEirkyO65IvE63-xo', authData)

            if (response.data.idToken) {

                const formControls = [...this.state.formControls]
                formControls.email.value = ''
                formControls.password.value = ''

                this.setState({
                    auth: true,
                    showModal: false,
                    error: '',
                    formControls
                })
            }
        } catch (e) {
            console.log(e)
            this.setState({error: 'Error'})
        }
    }

    modalShowHandler = () => {
        this.setState({showModal: true})
    }

    modalHideHandler = () => {
        this.setState({showModal: false})
    }

    validateControl = (value, validation) => {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}
        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control
        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })
        this.setState({formControls, isFormValid})
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={true}
                    onChange={(event) => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    baseHandler = (event) => {
        this.setState({sample: {...this.state.sample, base: event.target.value}})
    }

    base2Handler = (event) => {
        this.setState({sample: {...this.state.sample, base2: event.target.value}})
    }

    sampleDateHandler = (event) => {
        this.setState({sample: {...this.state.sample, date: event.target.value}})
    }

    dataWrite = async () => {
        await fetch(`https://api.exchangeratesapi.io/${this.state.sample.date}?base=${this.state.sample.base}`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({sample: {...this.state.sample, course: response.rates[this.state.sample.base2]}})
            })

        await axios.post('https://rateapp-f16f6-default-rtdb.europe-west1.firebasedatabase.app/sample.json', this.state.sample)
            .then((response) => {
                return ('')
            })
        await axios('https://rateapp-f16f6-default-rtdb.europe-west1.firebasedatabase.app/sample.json')
            .then((response) => {
                this.setState({sampleList: response.data})
            })
    }

    sampleRemove = async (id) => {
        let sampleList = {...this.state.sampleList}
        delete sampleList[id]
        this.setState({sampleList})

        await axios.delete(`https://rateapp-f16f6-default-rtdb.europe-west1.firebasedatabase.app/sample/${id}.json`)
    }

    inputValueHandler = (event) => {
        this.setState({inputValue: event.target.value, result: null})
    }

    currencyValueHandler = (event) => {
        this.setState({inputValue: event.target.value, result: null})
    }

    calculatorHandler = async (value) => {
        let result
        await fetch(`https://api.exchangeratesapi.io/latest?base=EUR`)
            .then((response) => response.json())
            .then((response) => {
                result = response.rates[value] * this.state.inputValue
            })
        this.setState({result})
    }

    componentDidMount() {

        fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
            .then((response) => response.json()).then((response) => {
            const rateArr = ['USD', 'CNY', 'EUR', 'GBP', 'JPY', 'CHF']
            const currency = {...this.state.currency}
            for (let i = 0; i < rateArr.length; i++) {
                currency[rateArr[i]].course = response.rates[rateArr[i]]
            }
            console.log(currency)
            this.setState({
                rate: response.rates,
                date: response.date,
                currency
            })
        })
    }

    render() {
        return (
            <RateContext.Provider value={{
                state: this.state,
                inputValueHandler: this.inputValueHandler,
                currencyValueHandler: this.currencyValueHandler,
                calculatorHandler: this.calculatorHandler,
                baseHandler: this.baseHandler,
                base2Handler: this.base2Handler,
                sampleDateHandler: this.sampleDateHandler,
                dataWrite: this.dataWrite,
                sampleRemove: this.sampleRemove,
                renderInputs: this.renderInputs,
                modalHideHandler: this.modalHideHandler,
                modalShowHandler: this.modalShowHandler,
                loginHandler: this.loginHandler,
                registerHandler: this.registerHandler
            }}>
                <Dark showModal={this.state.showModal} modalHideHandler={this.modalHideHandler}/>
                <Modal/>
                <Layout/>
            </RateContext.Provider>
        );
    }
}

export default App;
