import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

// services
import AuthService from '../../services/AuthService';
import StorageService from '../../services/StorageService';
import Validation from '../../services/Validation';

// slices
import { updateHeaderMenus } from '../../redux-slices/header-slice';
import './Login.css';


const Login = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [controls, setControls] = useState({
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
	});
	const { phone, password } = controls;

	useEffect(() => {
		const token = StorageService.getToken();
		console.log(props);
		if (token) {
			navigate("/contact");
		}
	}, [])

	const handleInputChange = (e) => {
		const controlName = e.target.name;
		const controlValue = e.target.value
		controls[controlName].value = controlValue;
		controls[controlName].touched = true;
		setControls({ ...controls });
	}


	const handleValidation = (firstTime, isSubmit) => {
		let isFormValid = false;
		let {
			phone, password
		} = controls;

		if (firstTime === true || phone.touched === true || isSubmit) {
			phone = Validation.notNullValidator(phone);
			phone.valid = !(phone.nullValue);
			if (((isSubmit || phone.touched) && phone.valid === false)) {
				phone.showErrorMsg = true;
			} else {
				phone.showErrorMsg = false;
			}
		}

		if (firstTime === true || password.touched === true || isSubmit) {
			password = Validation.notNullValidator(password);
			password.valid = !(password.nullValue);
			if (((isSubmit || password.touched) && password.valid === false)) {
				password.showErrorMsg = true;
			} else {
				password.showErrorMsg = false;
			}
		}

		if (
			phone.valid === true &&
			password.valid === true
		) {
			isFormValid = true;
		} else {
			isFormValid = false;
		}

		console.log("controls", controls);
		setControls({ ...controls })
		return isFormValid;
	}

	const login = () => {
		const { phone, password } = controls;
		const isFormValid = handleValidation(false, true);
		if (isFormValid === false) {
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
				dispatch(updateHeaderMenus("login"));
				navigate("/company")
			})
			.catch(e => {

			})
	}

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
										onChange={handleInputChange}
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
										onChange={handleInputChange}
									></Input>
									{password.showErrorMsg && <div className="error">* Please enter password</div>}

								</FormGroup>
								<Button className='logout-button' onClick={login}>Login</Button>
							</Form>
						</CardBody>
					</Card>
				</Col>
				<Col sm="1"></Col>
			</Row>

		</div>
	);
}

export default Login;