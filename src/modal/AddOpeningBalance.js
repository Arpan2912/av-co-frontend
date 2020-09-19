import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';

import CustomSpinner from '../components/CustomSpinner/CustomSpinner';

import OpeningBalanceService from '../services/OpeningBalanceService';
import Validation from '../services/Validation';
import ModalService from '../services/ModalService';

let isLoading = false;

let defaultControls = {
  amount: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null
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
    const { openingBalanceData } = this.props;
    console.log("openingBalanceData", openingBalanceData);
    if(openingBalanceData) {
      const { controls } = this.state;
      const { amount } = controls;
      
      amount.value = openingBalanceData.amount;
      
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
      amount
    } = controls;

    if(firstTime === true || amount.touched === true || isSubmit) {
      amount = Validation.notNullValidator(amount);
      amount.valid = !(amount.nullValue);
      if(((isSubmit || amount.touched) && amount.valid === false)) {
        amount.showErrorMsg = true;
      } else {
        amount.showErrorMsg = false;
      }
    }   

    if(
      amount.valid === true 
    ) {
      isFormValid = true;
    } else {
      isFormValid = false;
    }
    console.log("isFormValid",isFormValid);
    console.log("controls", controls);
    
    this.setState({ controls, isFormValid });
    return isFormValid;
  }

  saveDetail = () => {
    const { controls } = this.state;
    const { amount } = controls;   

    if(isLoading === true) {
      return;
    }
    const isFormValid = this.handleValidation(false, true);
    if(isFormValid === false) {
      return;
    }
    console.log("controls", controls);
    let obj = {
      amount: amount.value
    }
    this.setState({ isLoading: true });
    isLoading = true;
    OpeningBalanceService.addOpeningBalance(obj)
      .then(data => {
        const message = data.data && data.data.message ? data.data.message : null;
        if(message) {
          ModalService.openAlert('Opening Balance', message, 'success');
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

  updateOpeningBalance = () => {
    const { openingBalanceData } = this.props;
    const { controls } = this.state;
    const { amount } = controls;   
    const isFormValid = this.handleValidation(false, true);
    if(isFormValid === false) {
      return;
    }
    console.log("controls", controls);
    let obj = {
      amount: amount.value,
      openingBalanceId: openingBalanceData.uuid
    }
    this.setState({ isLoading: true });
    OpeningBalanceService.updateOpeningBalance(obj)
      .then(data => {
        const message = data.data && data.data.message ? data.data.message : null;
        this.setState({ isLoading: false });
        if(message) {
          ModalService.openAlert('Opening Balance', message, 'success');
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
    const { openingBalanceData } = this.props;
    const { controls,isLoading } = this.state;
    const { amount } = controls;


    return <Modal isOpen={this.props.show} toggle={this.props.closeModal} >
      <ModalHeader toggle={this.props.closeModal}>Add Opening Balance</ModalHeader>
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
                  onChange={this.handleInputChange}
                ></Input>
                {amount.showErrorMsg && <div className="error">* Please enter amount</div>}

              </FormGroup>
            </Col>

          </Row>
          <Button onClick={openingBalanceData ? this.updateOpeningBalance: this.saveDetail}>
            Save
          </Button>
        </Form>
      </ModalBody>

    </Modal>
  }
}