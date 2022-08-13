import React, { Component, Fragment, useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';

import CustomSpinner from '../components/CustomSpinner/CustomSpinner';

import ContactService from '../services/ContactService';
import Validation from '../services/Validation';
import ModalService from '../services/ModalService';

let isLoading = false;
const typeDropdownOptions = [
  {
    key: 'Buyer',
    value: 'buyer'
  },
  {
    key: 'Seller',
    value: 'seller'
  },
  {
    key: 'Dalal',
    value: 'dalal'
  }
]
let defaultControls = {
  name: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null
  },
  // last_name: {
  //   value: '',
  //   valid: null,
  //   touched: false,
  //   nullValue: null
  // },
  email: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  mobile1: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  mobile2: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  city: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  address: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  company: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  type: {
    value: 'dalal',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  }
}
const AddContact = (props) => {

  // state = {
  //   controls: JSON.parse(JSON.stringify(defaultControls)),
  //   isLoading: false
  // }
  const [controls, setControls] = useState({ ...defaultControls });
  const [isLoading, setIsLoading] = useState(false);
  let [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    const { contactData } = props;
    console.log("contactData", contactData);
    if (contactData) {
      // const { controls } = this.state;
      const { name, email, address,
        mobile1, mobile2, city, company, type
      } = controls;

      name.value = contactData.name;
      mobile1.value = contactData.mobile1;
      mobile2.value = contactData.mobile2;
      email.value = contactData.email;
      address.value = contactData.address;
      city.value = contactData.city;
      company.value = contactData.company;
      type.value = contactData.type;
      setControls({ ...controls })
      // this.setState({ controls });
    }
  })

  const handleInputChange = (e) => {
    const controlName = e.target.name;
    const controlValue = e.target.value;
    // const { controls } = this.state;
    controls[controlName].value = controlValue;
    controls[controlName].touched = true;
    setControls({ ...controls })

    // this.setState({ controls });
    // this.handleValidation();
  }

  const handleValidation = (firstTime, isSubmit) => {
    // let { controls, isFormValid } = this.state;
    let {
      name
    } = controls;

    if (firstTime === true || name.touched === true || isSubmit) {
      name = Validation.notNullValidator(name);
      name.valid = !(name.nullValue);
      if (((isSubmit || name.touched) && name.valid === false)) {
        name.showErrorMsg = true;
      } else {
        name.showErrorMsg = false;
      }
    }


    if (
      name.valid === true
    ) {
      isFormValid = true;
    } else {
      isFormValid = false;
    }
    console.log("isFormValid", isFormValid);
    console.log("controls", controls);
    // console.log('controls', controls);
    // console.log('isFormValid', isBusinessFormValid);
    setControls({ ...controls });
    setIsFormValid(isFormValid)
    // this.setState({ controls, isFormValid });
    return isFormValid;
  }

  const saveDetail = () => {
    // const { controls } = this.state;
    const { name, email, address,
      mobile1, mobile2, city, company, type
    } = controls;

    if (isLoading === true) {
      return;
    }
    const isFormValid = handleValidation(false, true);
    if (isFormValid === false) {
      return;
    }
    console.log("controls", controls);
    let obj = {
      name: name.value,
      email: email.value,
      mobile1: mobile1.value,
      mobile2: mobile2.value,
      address: address.value,
      city: city.value,
      company: company.value,
      type: type.value
    }
    setIsLoading(true);
    // this.setState({ isLoading: true });
    // isLoading = true;
    ContactService.addContact(obj)
      .then(data => {
        const message = data.data && data.data.message ? data.data.message : null;
        if (message) {
          ModalService.openAlert('Contact', message, 'success');
        }
        setIsLoading(false);

        // this.setState({ isLoading: false });
        // isLoading = false;
        props.closeModal(true);
        // this.resetControls();
      })
      .catch(e => {
        setIsLoading(false);

        // this.setState({ isLoading: false });
        // isLoading = false;
      })
  }

  const updateContact = () => {
    const { contactData } = props;
    // const { controls } = this.state;
    const { name, email, address,
      mobile1, mobile2, city, company, type
    } = controls;
    const isFormValid = handleValidation(false, true);
    if (isFormValid === false) {
      return;
    }
    console.log("controls", controls);
    let obj = {
      name: name.value,
      email: email.value,
      mobile1: mobile1.value,
      mobile2: mobile2.value,
      address: address.value,
      city: city.value,
      company: company.value,
      type: type.value,
      contactId: contactData.uuid
    }
    setIsLoading(true);

    // this.setState({ isLoading: true });
    ContactService.updateContact(obj)
      .then(data => {
        const message = data.data && data.data.message ? data.data.message : null;
        setIsLoading(false);

        // this.setState({ isLoading: false });
        if (message) {
          ModalService.openAlert('Contact', message, 'success');
        }
        props.closeModal(true);
        // this.getPerson();
        // this.resetControls();
      })
      .catch(e => {
        setIsLoading(false);
        // this.setState({ isLoading: false });
        const message = e.response && e.response.data && e.response.data.message ? e.response.data.message : 'Something went wrong';
        ModalService.openAlert('Contact', message, 'error');
      })
  }

  // render() {
  const { contactData } = props;
  // const { controls, isLoading } = this.state;
  const { name, email, address,
    mobile1, mobile2, city, company, type
  } = controls;


  return <Modal isOpen={props.show} toggle={props.closeModal} backdrop={false}>
    <ModalHeader toggle={props.closeModal}>{contactData && contactData.uuid ? 'Update Contact' : 'Add Contact'}</ModalHeader>
    <ModalBody>
      {isLoading && <CustomSpinner></CustomSpinner>}
      <Form>
        <Row>
          <Col>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={name.value}
                onChange={handleInputChange}
              ></Input>
              {name.showErrorMsg && <div className="error">* Please enter name</div>}

            </FormGroup>
          </Col>
          {/* <Col>
              <FormGroup>
                <Label for="name">Last Name</Label>
                <Input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={last_name.value}
                  onChange={this.handleInputChange}
                ></Input>
                {last_name.showErrorMsg && <div className="error">* Please enter last name</div>}
              </FormGroup>
            </Col> */}
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="mobile1">Mobile Number 1</Label>
              <Input
                type="number"
                id="mobile1"
                name="mobile1"
                value={mobile1.value}
                onChange={handleInputChange}
              ></Input>
              {mobile1.showErrorMsg && <div className="error">* Please enter phone number</div>}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="mobile2">Mobile Number 2</Label>
              <Input
                type="number"
                id="mobile2"
                name="mobile2"
                value={mobile2.value}
                onChange={handleInputChange}
              ></Input>
              {mobile2.showErrorMsg && <div className="error">* Please enter phone number</div>}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                id="email"
                name="email"
                value={email.value}
                onChange={handleInputChange}
              ></Input>
              {email.showErrorMsg && <div className="error">* Please enter valid email address</div>}

            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="company">company</Label>
              <Input
                type="text"
                id="company"
                name="company"
                value={company.value}
                onChange={handleInputChange}
              ></Input>
              {company.showErrorMsg && <div className="error">* Please enter valid company name</div>}

            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            type="text"
            id="address"
            name="address"
            value={address.value}
            onChange={handleInputChange}
          ></Input>
          {address.showErrorMsg && <div className="error">* Please enter  address</div>}

        </FormGroup>
        <Row>
          <Col>
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                type="text"
                id="city"
                name="city"
                value={city.value}
                onChange={handleInputChange}
              ></Input>
              {city.showErrorMsg && <div className="error">* Please enter valid city name</div>}

            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="type">Type</Label>
              <select name="type" onChange={handleInputChange} value={type.value}>
                {typeDropdownOptions.map(t => <option value={t.value}>{t.key}</option>)}
              </select>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className='text-align-right'>
            <Button className='logout-button' onClick={contactData ? updateContact : saveDetail}>
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </ModalBody>

  </Modal>
}

export default AddContact;