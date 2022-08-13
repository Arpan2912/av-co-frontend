import React, { Component, Fragment, useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';

import CustomSpinner from '../components/CustomSpinner/CustomSpinner';

import CompanyService from '../services/CompanyService';
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
  company_name: {
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
  phone: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
}
const AddCompany = ({ companyData, closeModal, show }) => {
  const [controls, setControls] = useState({ ...defaultControls });
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  // state = {
  //   controls: JSON.parse(JSON.stringify(defaultControls)),
  //   isLoading: false
  // }

  useEffect(() => {
    console.log("use effect called");
    // const { companyData } = props;
    console.log("companyData", companyData)
    if (companyData) {
      // const { controls } = this.state;
      const { company_name, phone } = controls;

      company_name.value = companyData.company_name;
      phone.value = companyData.phone;
      setControls({...controls});
      // this.setState({ controls });
    }
  }, [])

  const handleInputChange = (e) => {
    const controlName = e.target.name;
    const controlValue = e.target.value;
    // const { controls } = this.state;
    controls[controlName].value = controlValue;
    controls[controlName].touched = true;
    setControls({ ...controls });
    // this.setState({ controls });
    // this.handleValidation();
  }

  const handleValidation = (firstTime, isSubmit) => {
    // let { controls, isFormValid } = this.state;
    let {
      company_name
    } = controls;
    let isFormValid = false;
    if (firstTime === true || company_name.touched === true || isSubmit) {
      company_name = Validation.notNullValidator(company_name);
      company_name.valid = !(company_name.nullValue);
      if (((isSubmit || company_name.touched) && company_name.valid === false)) {
        company_name.showErrorMsg = true;
      } else {
        company_name.showErrorMsg = false;
      }
    }

    if (
      company_name.valid === true
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
    setIsFormValid(isFormValid);
    // this.setState({ controls, isFormValid });
    return isFormValid;
  }

  const saveDetail = () => {
    // const { controls } = this.state;
    const { company_name, phone } = controls;

    if (isLoading === true) {
      return;
    }
    const isFormValid = handleValidation(false, true);
    if (isFormValid === false) {
      return;
    }
    let obj = {
      companyName: company_name.value,
      phone: phone.value,
    }
    setIsLoading(true);
    // this.setState({ isLoading: true });
    // isLoading = true;
    CompanyService.addCompany(obj)
      .then(data => {
        const message = data.data && data.data.message ? data.data.message : null;
        if (message) {
          ModalService.openAlert('Company', message, 'success');
        }
        setIsLoading(false);
        // this.setState({ isLoading: false });
        // isLoading = false;
        closeModal(true);
        // this.resetControls();
      })
      .catch(e => {
        setIsLoading(false);
        // this.setState({ isLoading: false });
        // isLoading = false;
      })
  }

  const updateCompany = () => {
    // const { companyData } = props;
    // const { controls } = this.state;
    const { company_name, phone } = controls;
    const isFormValid = handleValidation(false, true);
    if (isFormValid === false) {
      return;
    }
    console.log("controls", controls);
    let obj = {
      companyName: company_name.value,
      phone: phone.value,
      companyId: companyData.uuid
    }
    setIsLoading(true);

    // this.setState({ isLoading: true });
    CompanyService.updateCompany(obj)
      .then(data => {
        const message = data.data && data.data.message ? data.data.message : null;
        setIsLoading(false);
        // this.setState({ isLoading: false });
        if (message) {
          ModalService.openAlert('Company', message, 'success');
        }
        closeModal(true);
        // this.getPerson();
        // this.resetControls();
      })
      .catch(e => {
        setIsLoading(false);
        console.log("e", e);
        // this.setState({ isLoading: false });
        const message = e.response && e.response.data && e.response.data.message ? e.response.data.message : 'Something went wrong';
        ModalService.openAlert('Person', message, 'error');
      })
  }

  // render() {
  // const { companyData } = props;
  // const { controls, isLoading } = this.state;
  const { company_name, phone } = controls;

  return <Modal isOpen={show} toggle={closeModal} >
    <ModalHeader toggle={closeModal}>{companyData ? 'Update' : 'Add'} Company</ModalHeader>
    <ModalBody>
      {isLoading && <CustomSpinner></CustomSpinner>}
      <Form>
        <Row>
          <Col>
            <FormGroup>
              <Label for="company_name">Company Name</Label>
              <Input
                type="text"
                id="company_name"
                name="company_name"
                value={company_name.value}
                onChange={handleInputChange}
              ></Input>
              {company_name.showErrorMsg && <div className="error">* Please enter name</div>}

            </FormGroup>
          </Col>

        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="phone">Phone</Label>
              <Input
                type="number"
                id="phone"
                name="phone"
                value={phone.value}
                onChange={handleInputChange}
              ></Input>
              {phone.showErrorMsg && <div className="error">* Please enter phone number</div>}
            </FormGroup>
          </Col>

        </Row>
        <Button className='logout-button' onClick={companyData ? updateCompany : saveDetail}>
          Save
        </Button>
      </Form>
    </ModalBody>

  </Modal>
}
export default AddCompany;