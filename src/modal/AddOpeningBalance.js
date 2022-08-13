import React, { Component, Fragment, useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';

import CustomSpinner from '../components/CustomSpinner/CustomSpinner';

import OpeningBalanceService from '../services/OpeningBalanceService';
import Validation from '../services/Validation';
import ModalService from '../services/ModalService';

// let isLoading = false;

let defaultControls = {
  amount: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null
  }
}
const AddOpeningBalance = (props) => {

  const [controls, setControls] = useState({ ...defaultControls });
  const [isLoading, setIsLoading] = useState(false);
  let [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { openingBalanceData } = props;
    console.log("openingBalanceData", openingBalanceData);
    if (openingBalanceData) {
      // const { controls } = this.state;
      const { amount } = controls;

      amount.value = openingBalanceData.value;
      setControls({ ...controls })
      // this.setState({ controls });
    }
  }, [])

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
      amount
    } = controls;

    if (firstTime === true || amount.touched === true || isSubmit) {
      amount = Validation.notNullValidator(amount);
      amount.valid = !(amount.nullValue);
      if (((isSubmit || amount.touched) && amount.valid === false)) {
        amount.showErrorMsg = true;
      } else {
        amount.showErrorMsg = false;
      }
    }

    if (
      amount.valid === true
    ) {
      isFormValid = true;
    } else {
      isFormValid = false;
    }
    console.log("isFormValid", isFormValid);
    console.log("controls", controls);
    setControls({ ...controls });
    setIsFormValid(isFormValid);
    // this.setState({ controls, isFormValid });
    return isFormValid;
  }

  const saveDetail = () => {
    // const { controls } = this.state;
    const { amount } = controls;

    if (isLoading === true) {
      return;
    }
    const isFormValid = handleValidation(false, true);
    if (isFormValid === false) {
      return;
    }
    console.log("controls", controls);
    let obj = {
      amount: amount.value
    }
    setIsLoading(true);
    // this.setState({ isLoading: true });
    // isLoading = true;
    OpeningBalanceService.addOpeningBalance(obj)
      .then(data => {
        setIsLoading(false);
        const message = data.data && data.data.message ? data.data.message : null;
        if (message) {
          ModalService.openAlert('Opening Balance', message, 'success');
        }
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

  const updateOpeningBalance = () => {
    const { openingBalanceData } = props;
    // const { controls } = this.state;
    const { amount } = controls;
    const isFormValid = handleValidation(false, true);
    if (isFormValid === false) {
      return;
    }
    console.log("controls", controls);
    let obj = {
      amount: amount.value,
      openingBalanceId: openingBalanceData.uuid
    }
    setIsLoading(true);
    // this.setState({ isLoading: true });
    OpeningBalanceService.updateOpeningBalance(obj)
      .then(data => {
        const message = data.data && data.data.message ? data.data.message : null;
        setIsLoading(false);
        // this.setState({ isLoading: false });
        if (message) {
          ModalService.openAlert('Opening Balance', message, 'success');
        }
        props.closeModal(true);
        // this.getPerson();
        // this.resetControls();
      })
      .catch(e => {
        setIsLoading(false);
        // this.setState({ isLoading: false });
        const message = e.response && e.response.data && e.response.data.message ? e.response.data.message : 'Something went wrong';
        ModalService.openAlert('Person', message, 'error');
      })
  }

  // render() {
  const { openingBalanceData } = props;
  // const { controls, isLoading } = this.state;
  const { amount } = controls;


  return <Modal isOpen={props.show} toggle={props.closeModal} >
    <ModalHeader toggle={props.closeModal}>{openingBalanceData ? 'Update Opening Balance' : 'Add Opening Balance'}</ModalHeader>
    <ModalBody>
      {isLoading && <CustomSpinner></CustomSpinner>}
      <Form>
        <Row>
          <Col>
            <FormGroup>
              <Label for="amount">Amount</Label>
              <Input
                type="text"
                id="amount"
                name="amount"
                value={amount.value}
                onChange={handleInputChange}
              ></Input>
              {amount.showErrorMsg && <div className="error">* Please enter amount</div>}

            </FormGroup>
          </Col>

        </Row>
        <Button className='logout-button' onClick={openingBalanceData ? updateOpeningBalance : saveDetail}>
          Save
        </Button>
      </Form>
    </ModalBody>
  </Modal>
}

export default AddOpeningBalance;