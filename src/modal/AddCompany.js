import React, { Component, Fragment } from 'react';
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
export default class AddCompany extends Component {

  state = {
    controls: JSON.parse(JSON.stringify(defaultControls)),
    isLoading: false
  }

  constructor() {
    super();
  }


  componentDidMount() {
    const { companyData } = this.props;
    if (companyData) {
      const { controls } = this.state;
      const { company_name, phone } = controls;

      company_name.value = companyData.company_name;
      phone.value = companyData.phone;
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
      company_name
    } = controls;

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
    this.setState({ controls, isFormValid });
    return isFormValid;
  }

  saveDetail = () => {
    const { controls } = this.state;
    const { company_name, phone } = controls;

    if (isLoading === true) {
      return;
    }
    const isFormValid = this.handleValidation(false, true);
    if (isFormValid === false) {
      return;
    }
    let obj = {
      companyName: company_name.value,
      phone: phone.value,
    }
    this.setState({ isLoading: true });
    isLoading = true;
    CompanyService.addCompany(obj)
      .then(data => {
        const message = data.data && data.data.message ? data.data.message : null;
        if (message) {
          ModalService.openAlert('Company', message, 'success');
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

  updateCompany = () => {
    const { companyData } = this.props;
    const { controls } = this.state;
    const { company_name, phone } = controls;
    const isFormValid = this.handleValidation(false, true);
    if (isFormValid === false) {
      return;
    }
    console.log("controls", controls);
    let obj = {
      companyName: company_name.value,
      phone: phone.value,
      companyId: companyData.uuid
    }
    this.setState({ isLoading: true });
    CompanyService.updateCompany(obj)
      .then(data => {
        const message = data.data && data.data.message ? data.data.message : null;
        this.setState({ isLoading: false });
        if (message) {
          ModalService.openAlert('Company', message, 'success');
        }
        this.props.closeModal(true);
        // this.getPerson();
        // this.resetControls();
      })
      .catch(e => {
        console.log("e", e);
        this.setState({ isLoading: false });
        const message = e.response && e.response.data && e.response.data.message ? e.response.data.message : 'Something went wrong';
        ModalService.openAlert('Person', message, 'error');
      })
  }

  render() {
    const { companyData } = this.props;
    const { controls, isLoading } = this.state;
    const { company_name, phone } = controls;


    return <Modal isOpen={this.props.show} toggle={this.props.closeModal} >
      <ModalHeader toggle={this.props.closeModal}>{companyData ? 'Update' : 'Add'} Company</ModalHeader>
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
                  onChange={this.handleInputChange}
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
                  onChange={this.handleInputChange}
                ></Input>
                {phone.showErrorMsg && <div className="error">* Please enter phone number</div>}
              </FormGroup>
            </Col>

          </Row>
          <Button onClick={companyData ? this.updateCompany : this.saveDetail}>
            Save
          </Button>
        </Form>
      </ModalBody>

    </Modal>
  }
}