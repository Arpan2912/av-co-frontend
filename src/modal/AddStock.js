import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label,InputGroup } from 'reactstrap';
import DatePicker from 'react-datepicker';

import CustomSpinner from '../components/CustomSpinner/CustomSpinner';

import StockService from '../services/StockService';
import ContactService from '../services/ContactService';
import Validation from '../services/Validation';
import ModalService from '../services/ModalService';

let isLoading = false;
let statusDropDownOptions = [
  {
    key:'In Stock',
    value:'in-stock'
  },
  {
    key:'In Sell',
    value:'in-sell'
  },
  {
    key:'Sold',
    value:'sold'
  }
]

let defaultControls = {
  stockId: {
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
  status: {
    value: 'in-stock',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  buyDate: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  buyPrice: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  sellDate: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  sellPrice: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  buyPersonId: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  sellPersonId: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  }
}
export default class AddStock extends Component {

  state = {
    controls: JSON.parse(JSON.stringify(defaultControls)),
    contacts:[],
    isLoading: false
  }

  constructor() {
    super();
  }

 

  componentDidMount() {
    const { stockData } = this.props;
    console.log("stockData", stockData);
    if (stockData) {
      const { controls } = this.state;
      const { 
        stockId,buyDate,buyPrice,buyPersonId,sellDate,
        sellPersonId,sellPrice,status
      } = controls;
      
      stockId.value = stockData.stock_id;
      buyDate.value = new Date(stockData.buy_date);
      buyPrice.value = stockData.buy_price;
      buyPersonId.value = stockData.buy_person_id;
      if(stockData.sell_date){
        sellDate.value = new Date(stockData.sell_date);
      }
      sellPrice.value = stockData.sell_price;
      sellPersonId.value = stockData.sell_person_id;
      status.value = stockData.status;
      this.setState({ controls });
    }
    this.getContacts();
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

  handleDateChange = (controlName, e) => {
    console.log("e", e);
    console.log("controlName", controlName);
    const { controls } = this.state;
    let dateControl = controls[controlName];
    dateControl.value = e;
    dateControl.touched = true;
    this.setState({ controls });
    // this.handleValidation();
  }

  handleValidation = (firstTime, isSubmit) => {
    let { controls, isFormValid } = this.state;
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

    // if (firstTime === true || last_name.touched === true || isSubmit) {
    //   last_name = Validation.notNullValidator(last_name);
    //   last_name.valid = !(last_name.nullValue);
    //   if (((isSubmit || last_name.touched) && last_name.valid === false)) {
    //     last_name.showErrorMsg = true;
    //   } else {
    //     last_name.showErrorMsg = false;
    //   }
    // }

    // if (firstTime === true || mobile1.touched === true || isSubmit) {
    //   // mobile1 = Validation.notNullValidator(mobile1);
    //   // mobile1.valid = !(mobile1.nullValue);
    //   if (((isSubmit || mobile1.touched) && mobile1.valid === false)) {
    //     mobile1.showErrorMsg = true;
    //   } else {
    //     mobile1.showErrorMsg = false;
    //   }
    // }

    // if (firstTime === true || mobile2.touched === true || isSubmit) {
    //   // mobile2 = Validation.notNullValidator(mobile2);
    //   // mobile2.valid = !(mobile2.nullValue);
    //   if (((isSubmit || mobile2.touched) && mobile2.valid === false)) {
    //     mobile2.showErrorMsg = true;
    //   } else {
    //     mobile2.showErrorMsg = false;
    //   }
    // }

    // if (firstTime === true || mobile3.touched === true || isSubmit) {
    //   // mobile3 = Validation.notNullValidator(mobile3);
    //   // mobile3.valid = !(mobile3.nullValue);
    //   if (((isSubmit || mobile3.touched) && mobile3.valid === false)) {
    //     mobile3.showErrorMsg = true;
    //   } else {
    //     mobile3.showErrorMsg = false;
    //   }
    // }

    // if (firstTime === true || mobile4.touched === true || isSubmit) {
    //   // mobile4 = Validation.notNullValidator(mobile4);
    //   // mobile4.valid = !(mobile4.nullValue);
    //   if (((isSubmit || mobile4.touched) && mobile4.valid === false)) {
    //     mobile4.showErrorMsg = true;
    //   } else {
    //     mobile4.showErrorMsg = false;
    //   }
    // }

    // if (firstTime === true || email.touched === true || isSubmit) {
    //   // email = Validation.notNullValidator(email);
    //   email = Validation.emailValidator(email);
    //   email.valid = !(email.invalidEmail);
    //   if (((isSubmit || email.touched) && email.valid === false)) {
    //     email.showErrorMsg = true;
    //   } else {
    //     email.showErrorMsg = false;
    //   }
    // }

    // if (firstTime === true || address.touched === true || isSubmit) {
    //   // address = Validation.notNullValidator(address);
    //   address.valid = !(address.nullValue);
    //   if (((isSubmit || address.touched) && address.valid === false)) {
    //     address.showErrorMsg = true;
    //   } else {
    //     address.showErrorMsg = false;
    //   }
    // }

    // if (firstTime === true || income.touched === true || isSubmit) {
    //   // income = Validation.notNullValidator(income);
    //   income.valid = !(income.nullValue);
    //   if (((isSubmit || income.touched) && income.valid === false)) {
    //     income.showErrorMsg = true;
    //   } else {
    //     income.showErrorMsg = false;
    //   }
    // }

    // if (firstTime === true || living.touched === true || isSubmit) {
    //   // living = Validation.notNullValidator(living);
    //   living.valid = !(living.nullValue);
    //   if (((isSubmit || living.touched) && living.valid === false)) {
    //     living.showErrorMsg = true;
    //   } else {
    //     living.showErrorMsg = false;
    //   }
    // }

    // if (firstTime === true || family_members.touched === true || isSubmit) {
    //   // family_members = Validation.notNullValidator(family_members);
    //   family_members.valid = !(family_members.nullValue);
    //   if (((isSubmit || family_members.touched) && family_members.valid === false)) {
    //     family_members.showErrorMsg = true;
    //   } else {
    //     family_members.showErrorMsg = false;
    //   }
    // }
   
    // if (firstTime === true || additional_detail.touched === true || isSubmit) {
    //   // additional_detail = Validation.notNullValidator(additional_detail);
    //   additional_detail.valid = !(additional_detail.nullValue);
    //   if (((isSubmit || additional_detail.touched) && additional_detail.valid === false)) {
    //     additional_detail.showErrorMsg = true;
    //   } else {
    //     additional_detail.showErrorMsg = false;
    //   }
    // }
   

    if (
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

  getContacts = () =>{
    ContactService.getContacts(1,10,null,false)
      .then(data=>{
        console.log("data",data);
        if(data.data && data.data.data && data.data.data.contacts){
          this.setState({ contacts : data.data.data.contacts })
        }
      })
      .catch(e=>{
        console.log("e",e);
      })
  }

  saveDetail = () => {
    const { controls } = this.state;
    const { stockId,buyDate, buyPersonId,
      buyPrice,sellDate,sellPrice,sellPersonId,status
    } = controls;   

    if (isLoading === true) {
      return;
    }
    // const isFormValid = this.handleValidation(false, true);
    // if (isFormValid === false) {
    //   return;
    // }
    console.log("controls", controls);
    let obj = {
      stockId: stockId.value,
      buyDate: buyDate.value,
      buyPersonId: buyPersonId.value,
      buyPrice: buyPrice.value,
      sellDate: sellDate.value,
      sellPersonId: sellPersonId.value,
      sellPrice: sellPrice.value,
      status: status.value,
    }
    this.setState({ isLoading: true });
    isLoading = true;
    StockService.addStock(obj)
      .then(data => {
        const message = data.data && data.data.message ? data.data.message : null;
        if (message) {
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

  updateStock = () => {
    const { stockData} = this.props;
    const { controls } = this.state;
    const { stockId,buyDate, buyPersonId,
      buyPrice,sellDate,sellPrice,sellPersonId,status
    } = controls;   
    // const isFormValid = this.handleValidation(false, true);
    // if (isFormValid === false) {
    //   return;
    // }
    console.log("controls", controls);
    let obj = {
      stockId: stockId.value,
      buyDate: buyDate.value,
      buyPersonId: buyPersonId.value,
      buyPrice: buyPrice.value,
      sellDate: sellDate.value,
      sellPersonId: sellPersonId.value,
      sellPrice: sellPrice.value,
      status: status.value,
      id: stockData.uuid
    }
    this.setState({ isLoading: true });
    StockService.updateStock(obj)
      .then(data => {
        const message = data.data && data.data.message ? data.data.message : null;
        this.setState({ isLoading: false });
        if (message) {
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
    const { stockData, } = this.props;
    const { controls, contacts } = this.state;
    const { stockId,buyDate, buyPersonId,
      buyPrice,sellDate,sellPrice,sellPersonId,status
    } = controls;   

    return <Modal isOpen={this.props.show} toggle={this.props.closeModal} >
      <ModalHeader toggle={this.props.closeModal}>Add Stock</ModalHeader>
      <ModalBody>
        {isLoading && <CustomSpinner></CustomSpinner>}
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label for="name">Stock Id</Label>
                <Input
                  type="text"
                  id="stockId"
                  name="stockId"
                  value={stockId.value}
                  onChange={this.handleInputChange}
                ></Input>
                {stockId.showErrorMsg && <div className="error">* Please enter name</div>}

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
                <Label for="status">Status</Label>
                <select name="status" onChange={this.handleInputChange} value={status.value}>
                  {statusDropDownOptions.map(s=><option value={s.value}>{s.key}</option>)}
                </select>
              </FormGroup>
            </Col>
          </Row>
          {status.value === 'in-stock' && <Row>
            <Col>
                <FormGroup>
                <Label for="password" className="field-title">Buy Date</Label>
                <div>
                  <Label className="width-100"
                    onClick={e => this.buyDate.state.open && e.preventDefault()}
                  >
                    <InputGroup>
                      <DatePicker className={"form-control calendar-input"}
                        selected={buyDate.value}
                        onChange={this.handleDateChange.bind(this, 'buyDate')}
                        showMonthDropdown
                        ref={r => this.buyDate = r}
                        // shouldCloseOnSelect={true}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        placeholderText="Select"
                        shouldCloseOnSelect
                        dropdownMode="select"
                      />
                    </InputGroup>
                  </Label>
                  {buyDate.showErrorMsg && <div className="error">
                    {/* {EMPTY_BANNER_END_DATE} */}
                  </div>}
                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="buyPrice">Buy Price</Label>
                <Input
                  type="number"
                  id="buyPrice"
                  name="buyPrice"
                  value={buyPrice.value}
                  onChange={this.handleInputChange}
                ></Input>
                {buyPrice.showErrorMsg && <div className="error">* Please enter phone number</div>}
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="buyPersonId">Buy Contact</Label>
                <select name="buyPersonId" onChange={this.handleInputChange} value={buyPersonId.value}>
                  <option>None</option>
                  {contacts.map(c=><option value={c.uuid}>{c.name}</option>)}
                </select>
                {buyPersonId.showErrorMsg && <div className="error">* Please enter phone number</div>}
              </FormGroup>
            </Col>
          </Row>}

          {(status.value === 'in-sell' || status.value === 'sold') && <Row>
            <Col>
                <FormGroup>
                <Label for="password" className="field-title">Sell Date</Label>
                <div>
                  <Label className="width-100"
                    onClick={e => this.sellDate.state.open && e.preventDefault()}
                  >
                    <InputGroup>
                      <DatePicker className={"form-control calendar-input"}
                        selected={sellDate.value}
                        onChange={this.handleDateChange.bind(this, 'sellDate')}
                        showMonthDropdown
                        ref={r => this.sellDate = r}
                        // shouldCloseOnSelect={true}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        placeholderText="Select"
                        shouldCloseOnSelect
                        dropdownMode="select"
                      />
                    </InputGroup>
                  </Label>
                  {sellDate.showErrorMsg && <div className="error">
                    {/* {EMPTY_BANNER_END_DATE} */}
                  </div>}
                </div>
              </FormGroup>
            </Col>
            {status.value === 'sold' && <Col>
              <FormGroup>
                <Label for="sellPrice">Sell Price</Label>
                <Input
                  type="number"
                  id="sellPrice"
                  name="sellPrice"
                  value={sellPrice.value}
                  onChange={this.handleInputChange}
                ></Input>
                {sellPrice.showErrorMsg && <div className="error">* Please enter phone number</div>}
              </FormGroup>
            </Col>}
            <Col>
              <FormGroup>
                <Label for="sellPersonId">Sell Contact</Label>
                <select name="sellPersonId" onChange={this.handleInputChange} value={sellPersonId.value}>
                  <option>None</option>
                  {contacts.map(c=><option value={c.uuid}>{c.name}</option>)}
                </select>
                {sellPersonId.showErrorMsg && <div className="error">* Please enter phone number</div>}
              </FormGroup>
            </Col>
          </Row>}

          
          <Button onClick={stockData ? this.updateStock: this.saveDetail}>
            Save
          </Button>
        </Form>
      </ModalBody>

    </Modal>
  }
}