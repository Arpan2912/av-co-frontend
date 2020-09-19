import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';

import CustomSpinner from '../components/CustomSpinner/CustomSpinner';

import ContactService from '../services/ContactService';
import Validation from '../services/Validation';
import ModalService from '../services/ModalService';

let isLoading = false;
const typeDropdownOptions=[
  {
    key: 'Buyer',
    value:'buyer'
  },
  {
    key: 'Seller',
    value:'seller'
  },
  {
    key: 'Dalal',
    value:'dalal'
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
export default class AddContact extends Component {

  state = {
    controls: JSON.parse(JSON.stringify(defaultControls)),
    isLoading: false
  }

  constructor() {
    super();
  }


  componentDidMount() {
    const { contactData } = this.props;
    console.log("contactData", contactData);
    if(contactData) {
      const { controls } = this.state;
      const { name, email, address,
        mobile1,mobile2,city,company,type
      } = controls;
      
      name.value = contactData.name;
      mobile1.value = contactData.mobile1;
      mobile2.value = contactData.mobile2;
      email.value = contactData.email;
      address.value = contactData.address;
      city.value = contactData.city;
      company.value = contactData.company;
      type.value = contactData.type;
      this.setState({ controls });
    }
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
      name
    } = controls;

    if(firstTime === true || name.touched === true || isSubmit) {
      name = Validation.notNullValidator(name);
      name.valid = !(name.nullValue);
      if(((isSubmit || name.touched) && name.valid === false)) {
        name.showErrorMsg = true;
      } else {
        name.showErrorMsg = false;
      }
    }

    // if(firstTime === true || last_name.touched === true || isSubmit) {
    //   last_name = Validation.notNullValidator(last_name);
    //   last_name.valid = !(last_name.nullValue);
    //   if(((isSubmit || last_name.touched) && last_name.valid === false)) {
    //     last_name.showErrorMsg = true;
    //   } else {
    //     last_name.showErrorMsg = false;
    //   }
    // }

    // if(firstTime === true || mobile1.touched === true || isSubmit) {
    //   // mobile1 = Validation.notNullValidator(mobile1);
    //   // mobile1.valid = !(mobile1.nullValue);
    //   if(((isSubmit || mobile1.touched) && mobile1.valid === false)) {
    //     mobile1.showErrorMsg = true;
    //   } else {
    //     mobile1.showErrorMsg = false;
    //   }
    // }

    // if(firstTime === true || mobile2.touched === true || isSubmit) {
    //   // mobile2 = Validation.notNullValidator(mobile2);
    //   // mobile2.valid = !(mobile2.nullValue);
    //   if(((isSubmit || mobile2.touched) && mobile2.valid === false)) {
    //     mobile2.showErrorMsg = true;
    //   } else {
    //     mobile2.showErrorMsg = false;
    //   }
    // }

    // if(firstTime === true || mobile3.touched === true || isSubmit) {
    //   // mobile3 = Validation.notNullValidator(mobile3);
    //   // mobile3.valid = !(mobile3.nullValue);
    //   if(((isSubmit || mobile3.touched) && mobile3.valid === false)) {
    //     mobile3.showErrorMsg = true;
    //   } else {
    //     mobile3.showErrorMsg = false;
    //   }
    // }

    // if(firstTime === true || mobile4.touched === true || isSubmit) {
    //   // mobile4 = Validation.notNullValidator(mobile4);
    //   // mobile4.valid = !(mobile4.nullValue);
    //   if(((isSubmit || mobile4.touched) && mobile4.valid === false)) {
    //     mobile4.showErrorMsg = true;
    //   } else {
    //     mobile4.showErrorMsg = false;
    //   }
    // }

    // if(firstTime === true || email.touched === true || isSubmit) {
    //   // email = Validation.notNullValidator(email);
    //   email = Validation.emailValidator(email);
    //   email.valid = !(email.invalidEmail);
    //   if(((isSubmit || email.touched) && email.valid === false)) {
    //     email.showErrorMsg = true;
    //   } else {
    //     email.showErrorMsg = false;
    //   }
    // }

    // if(firstTime === true || address.touched === true || isSubmit) {
    //   // address = Validation.notNullValidator(address);
    //   address.valid = !(address.nullValue);
    //   if(((isSubmit || address.touched) && address.valid === false)) {
    //     address.showErrorMsg = true;
    //   } else {
    //     address.showErrorMsg = false;
    //   }
    // }

    // if(firstTime === true || income.touched === true || isSubmit) {
    //   // income = Validation.notNullValidator(income);
    //   income.valid = !(income.nullValue);
    //   if(((isSubmit || income.touched) && income.valid === false)) {
    //     income.showErrorMsg = true;
    //   } else {
    //     income.showErrorMsg = false;
    //   }
    // }

    // if(firstTime === true || living.touched === true || isSubmit) {
    //   // living = Validation.notNullValidator(living);
    //   living.valid = !(living.nullValue);
    //   if(((isSubmit || living.touched) && living.valid === false)) {
    //     living.showErrorMsg = true;
    //   } else {
    //     living.showErrorMsg = false;
    //   }
    // }

    // if(firstTime === true || family_members.touched === true || isSubmit) {
    //   // family_members = Validation.notNullValidator(family_members);
    //   family_members.valid = !(family_members.nullValue);
    //   if(((isSubmit || family_members.touched) && family_members.valid === false)) {
    //     family_members.showErrorMsg = true;
    //   } else {
    //     family_members.showErrorMsg = false;
    //   }
    // }
   
    // if(firstTime === true || additional_detail.touched === true || isSubmit) {
    //   // additional_detail = Validation.notNullValidator(additional_detail);
    //   additional_detail.valid = !(additional_detail.nullValue);
    //   if(((isSubmit || additional_detail.touched) && additional_detail.valid === false)) {
    //     additional_detail.showErrorMsg = true;
    //   } else {
    //     additional_detail.showErrorMsg = false;
    //   }
    // }
   

    if(
      name.valid === true 
      // last_name.valid === true &&
      // email.valid === true &&
      // mobile1.valid === true &&
      // mobile2.valid === true &&
      // mobile3.valid === true &&
      // mobile4.valid === true &&
      // address.valid === true &&
      // living.valid === true &&
      // income.valid === true &&
      // family_members.valid === true &&
      // additional_detail.valid === true 
    ) {
      isFormValid = true;
    } else {
      isFormValid = false;
    }
    console.log("isFormValid",isFormValid);
    console.log("controls", controls);
    // console.log('controls', controls);
    // console.log('isFormValid', isBusinessFormValid);
    this.setState({ controls, isFormValid });
    return isFormValid;
  }

  saveDetail = () => {
    const { controls } = this.state;
    const { name, email, address,
      mobile1,mobile2,city,company,type
    } = controls;   

    if(isLoading === true) {
      return;
    }
    const isFormValid = this.handleValidation(false, true);
    if(isFormValid === false) {
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
    this.setState({ isLoading: true });
    isLoading = true;
    ContactService.addContact(obj)
      .then(data => {
        const message = data.data && data.data.message ? data.data.message : null;
        if(message) {
          ModalService.openAlert('Person', message, 'success');
        }
        this.setState({ isLoading: false });
        isLoading = false;
        this.props.closeModal(true);
        // this.resetControls();
      })
      .catch(e => {
        this.setState({ isLoading: false });
        isLoading = false;
      })
  }

  updateContact = () => {
    const { contactData} = this.props;
    const { controls } = this.state;
    const { name, email, address,
      mobile1,mobile2,city,company,type
    } = controls;   
    const isFormValid = this.handleValidation(false, true);
    if(isFormValid === false) {
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
      type:type.value,
      contactId: contactData.uuid
    }
    this.setState({ isLoading: true });
    ContactService.updateContact(obj)
      .then(data => {
        const message = data.data && data.data.message ? data.data.message : null;
        this.setState({ isLoading: false });
        if(message) {
          ModalService.openAlert('Person', message, 'success');
        }
        this.props.closeModal(true);
        // this.getPerson();
        // this.resetControls();
      })
      .catch(e => {
        this.setState({ isLoading: false });
        const message = e.response && e.response.data && e.response.data.message ? e.response.data.message : 'Something went wrong';
        ModalService.openAlert('Person', message, 'error');
      })
  }

  render() {
    const { contactData } = this.props;
    const { controls,isLoading } = this.state;
    const { name, email, address,
      mobile1,mobile2,city,company,type
    } = controls;


    return <Modal isOpen={this.props.show} toggle={this.props.closeModal} >
      <ModalHeader toggle={this.props.closeModal}>Add Person</ModalHeader>
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
                  onChange={this.handleInputChange}
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
                  onChange={this.handleInputChange}
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
                  onChange={this.handleInputChange}
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
                  onChange={this.handleInputChange}
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
                  onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
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
                  onChange={this.handleInputChange}
                ></Input>
                {city.showErrorMsg && <div className="error">* Please enter valid city name</div>}

              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="type">Type</Label>
                <select name="type" onChange={this.handleInputChange} value={type.value}>
                  {typeDropdownOptions.map(t=><option value={t.value}>{t.key}</option>)}
                </select>
              </FormGroup>
            </Col>
          </Row>
          <Button onClick={contactData ? this.updateContact: this.saveDetail}>
            Save
          </Button>
        </Form>
      </ModalBody>

    </Modal>
  }
}