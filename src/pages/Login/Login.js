import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';

import AuthService from '../../services/AuthService';
import StorageService from '../../services/StorageService';
import Validation from '../../services/Validation';
import { updateHeaderMenus } from '../../actions/header-action';
import './Login.css';



class Login extends Component {
    state = {
        controls: {
            phone: {
                value: '',
                valid: null,
                touched: false,
                nullValue: null
            },
            password: {
                value: '',
                valid: null,
                touched: false,
                nullValue: null
            }
        }
    }

    componentDidMount() {
        const token = StorageService.getToken();
        if(token) {
            this.props.history.push("/contact");
        }
        // this.getPerson();
    }

    handleInputChange = (e) => {
        const controlName = e.target.name;
        const controlValue = e.target.value;
        const { controls } = this.state;
        controls[controlName].value = controlValue;
        controls[controlName].touched = true;
        this.setState({ controls });
        // this.handleValidation();
    }



    handleValidation = (firstTime, isSubmit) => {
        let { controls, isFormValid } = this.state;
        let {
            phone, password
        } = controls;

        if(firstTime === true || phone.touched === true || isSubmit) {
            phone = Validation.notNullValidator(phone);
            phone.valid = !(phone.nullValue);
            if(((isSubmit || phone.touched) && phone.valid === false)) {
                phone.showErrorMsg = true;
            } else {
                phone.showErrorMsg = false;
            }
        }

        if(firstTime === true || password.touched === true || isSubmit) {
            password = Validation.notNullValidator(password);
            password.valid = !(password.nullValue);
            if(((isSubmit || password.touched) && password.valid === false)) {
                password.showErrorMsg = true;
            } else {
                password.showErrorMsg = false;
            }
        }

        if(
            phone.valid === true &&
            password.valid === true
        ) {
            isFormValid = true;
        } else {
            isFormValid = false;
        }

        console.log("controls", controls);
        // console.log('controls', controls);
        // console.log('isFormValid', isBusinessFormValid);
        this.setState({ controls, isFormValid });
        return isFormValid;
    }



    login = () => {
        const { controls } = this.state;
        const { phone, password } = controls;
        const isFormValid = this.handleValidation(false, true);
        if(isFormValid === false) {
            return;
        }
        let obj = {
            phone: phone.value,
            password: password.value
        }
        AuthService.signin(obj)
            .then(data => {
                const token = data.data.data.token;
                const userObj = {
                    type: data.data.data.userType
                }
                StorageService.setUserDetail(userObj);
                StorageService.setToken(token);
                this.props.updateHeaderMenus("login");
                this.props.history.push("/home");
                //         this.getPerson();
                //         this.resetControls();
            })
            .catch(e => {

            })
    }





    render() {
        const { controls } = this.state;
        const { password, phone } = controls;

        return (
            <div id="login">
                <Row>
                    <Col xl="5">
                        <Card>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label for="phone">Phone Number</Label>
                                        <Input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            value={phone.value}
                                            onChange={this.handleInputChange}
                                        ></Input>
                                        {phone.showErrorMsg && <div className="error">* Please enter phone number</div>}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={password.value}
                                            onChange={this.handleInputChange}
                                        ></Input>
                                        {password.showErrorMsg && <div className="error">* Please enter password</div>}

                                    </FormGroup>
                                    <Button onClick={this.login}>Login</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="1"></Col>
                </Row>

            </div>
        );
    }
}

export default connect(null, { updateHeaderMenus })(Login);