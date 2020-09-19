import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label,InputGroup } from 'reactstrap';
import DatePicker from 'react-datepicker';

import CustomSpinner from '../components/CustomSpinner/CustomSpinner';
import SearchContact from '../components/SearchContact/SearchContact';

import StockService from '../services/StockService';
import ContactService from '../services/ContactService';
import Validation from '../services/Validation';
import ModalService from '../services/ModalService';

let isLoading = false;
let statusDropDownOptions = [
  {
    key:'Current Stock',
    value:'current-stock'
  },
  {
    key:'Jangad',
    value:'jangad'
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
    value: 'current-stock',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  weight: {
    value: null,
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
    this.buyPersonIdContainer = React.createRef();
    this.sellPersonIdContainer = React.createRef();
  }

 

  componentDidMount() {
    const { stockData } = this.props;
    console.log("stockData", stockData);
    if(stockData) {
      const { controls } = this.state;
      const { 
        stockId,buyDate,buyPrice,buyPersonId,sellDate,
        sellPersonId,sellPrice,status,weight
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
      weight.value = stockData.weight;
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
    let { controls } = this.state;
    let { 
      stockId,weight,buyDate,buyPrice,
      sellDate,sellPrice,buyPersonId,
      sellPersonId,status
    } = controls;

    if(firstTime === true || stockId.touched === true || isSubmit) {
      stockId = Validation.notNullValidator(stockId);
      stockId.valid = !(stockId.nullValue);
      if(((isSubmit || stockId.touched) && stockId.valid === false)) {
        stockId.showErrorMsg = true;
      } else {
        stockId.showErrorMsg = false;
      }
    }

    if(firstTime === true || weight.touched === true || isSubmit) {
      weight = Validation.notNullValidator(weight);
      weight.valid = !(weight.nullValue);
      if(((isSubmit || weight.touched) && weight.valid === false)) {
        weight.showErrorMsg = true;
      } else {
        weight.showErrorMsg = false;
      }
    }

    if(status.value === 'current-stock'){
      if(firstTime === true || buyDate.touched === true || isSubmit) {
        console.log("buyDate",buyDate);
        buyDate = Validation.notNullValidator(buyDate);
        buyDate.valid = !(buyDate.nullValue);
        if(((isSubmit || buyDate.touched) && buyDate.valid === false)) {
          buyDate.showErrorMsg = true;
        } else {
          buyDate.showErrorMsg = false;
        }
      }
   

      if(firstTime === true || buyPrice.touched === true || isSubmit) {
        buyPrice = Validation.notNullValidator(buyPrice);
        buyPrice.valid = !(buyPrice.nullValue);
        if(((isSubmit || buyPrice.touched) && buyPrice.valid === false)) {
          buyPrice.showErrorMsg = true;
        } else {
          buyPrice.showErrorMsg = false;
        }
      }

      if(firstTime === true || buyPersonId.touched === true || isSubmit) {
        buyPersonId = Validation.notNullValidator(buyPersonId);
        buyPersonId.valid = !(buyPersonId.nullValue);
        if(((isSubmit || buyPersonId.touched) && buyPersonId.valid === false)) {
          buyPersonId.showErrorMsg = true;
        } else {
          buyPersonId.showErrorMsg = false;
        }
      }
    }

  if(status.value === 'jangad' || status.value === 'sold'){

    if(firstTime === true || sellPrice.touched === true || isSubmit) {
      sellPrice = Validation.notNullValidator(sellPrice);
      sellPrice.valid = !(sellPrice.nullValue);
      if(((isSubmit || sellPrice.touched) && sellPrice.valid === false)) {
        sellPrice.showErrorMsg = true;
      } else {
        sellPrice.showErrorMsg = false;
      }
    }

    if(firstTime === true || sellDate.touched === true || isSubmit) {
      sellDate = Validation.notNullValidator(sellDate);
      sellDate.valid = !(sellDate.nullValue);
      if(((isSubmit || sellDate.touched) && sellDate.valid === false)) {
        sellDate.showErrorMsg = true;
      } else {
        sellDate.showErrorMsg = false;
      }
    } 
  }

  if(status.value === 'jangad'){
    if(firstTime === true || sellPersonId.touched === true || isSubmit) {
      sellPersonId = Validation.notNullValidator(sellPersonId);
      sellPersonId.valid = !(sellPersonId.nullValue);
      if(((isSubmit || sellPersonId.touched) && sellPersonId.valid === false)) {
        sellPersonId.showErrorMsg = true;
      } else {
        sellPersonId.showErrorMsg = false;
      }
    }
  }
  let isFormValid = stockId.valid && weight.valid;
  if(status.value === 'current-stock'){
    isFormValid = isFormValid && buyPersonId.valid && buyPrice.valid && buyDate.valid
  }
  if(status.value === 'jangad' || status.value === 'sold'){
    isFormValid = isFormValid && sellPrice.valid && sellDate.valid
  }
  if(status.value === 'jangad'){
    isFormValid = isFormValid && sellPersonId.valid 
  }
  console.log("isFormValid",isFormValid);
  console.log("controls", controls);
    // console.log('controls', controls);
    // console.log('isFormValid', isBusinessFormValid);
  this.setState({ controls, isFormValid });
  return isFormValid;
  }

  getSelectedBuyPersonControl = (personControl) => {
    const { controls } = this.state;
    controls.buyPersonId = personControl;
    console.log("person",controls);
    this.setState({ controls });
  }

  getSelectedSellPersonControl = (personControl) => {
    const { controls } = this.state;
    controls.sellPersonId = personControl;
    console.log("person",controls);
    this.setState({ controls });
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
      buyPrice,sellDate,sellPrice,sellPersonId,status,weight
    } = controls;   

    if(isLoading === true) {
      return;
    }
    const isFormValid = this.handleValidation(false, true);
    if(isFormValid === false) {
      return;
    }
    let buyDateVar = null;
    let sellDateVar = null;
    if(buyDate.value){
      buyDate.value.setHours(5,30,0,0);
      console.log("buyDate",buyDate);
      buyDateVar = buyDate.value.toISOString();
    }
    if(sellDate.value){
      sellDate.value.setHours(5,30,0,0);
      console.log("sellDate",sellDate);
      sellDateVar = sellDate.value.toISOString();
    }
    console.log("controls", controls);
    let obj = {
      stockId: stockId.value,
      buyDate: buyDateVar,
      buyPersonId: buyPersonId.value,
      buyPrice: buyPrice.value,
      sellDate: sellDateVar,
      sellPersonId: sellPersonId.value,
      sellPrice: sellPrice.value,
      status: status.value,
      weight:weight.value
    }
    this.setState({ isLoading: true });
    isLoading = true;
    StockService.addStock(obj)
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

  updateStock = () => {
    const { stockData} = this.props;
    const { controls } = this.state;
    const { stockId,buyDate, buyPersonId,
      buyPrice,sellDate,sellPrice,sellPersonId,status,weight
    } = controls;   
    const isFormValid = this.handleValidation(false, true);
    if(isFormValid === false) {
      return;
    }
    console.log("controls", controls);
    let buyDateVar = null;
    let sellDateVar = null;
    if(buyDate.value){
      buyDate.value.setHours(5,30,0,0);
      console.log("buyDate",buyDate);
      buyDateVar = buyDate.value.toISOString();
    }
    if(sellDate.value){
      sellDate.value.setHours(5,30,0,0);
      console.log("sellDate",sellDate);
      sellDateVar = sellDate.value.toISOString();
    }

    let obj = {
      stockId: stockId.value,
      buyDate:buyDateVar,
      buyPersonId: buyPersonId.value,
      buyPrice: buyPrice.value,
      sellDate: sellDateVar,
      sellPersonId: sellPersonId.value,
      sellPrice: sellPrice.value,
      status: status.value,
      weight:weight.value,
      id: stockData.uuid
    }
    this.setState({ isLoading: true });
    StockService.updateStock(obj)
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
    const { stockData, } = this.props;
    const { controls, contacts } = this.state;
    const { stockId,buyDate, buyPersonId,
      buyPrice,sellDate,sellPrice,sellPersonId,status,weight
    } = controls;   
    let isUpdate = stockData && stockData.uuid ? true :false;
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
                  disabled={isUpdate}
                ></Input>
                {stockId.showErrorMsg && <div className="error">* Please enter name</div>}

              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="weight">Weight</Label>
                <Input
                  type="number"
                  id="weight"
                  name="weight"
                  value={weight.value}
                  onChange={this.handleInputChange}
                ></Input>
                {weight.showErrorMsg && <div className="error">* Please enter weight</div>}
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
                  {statusDropDownOptions.map((s,i)=>{
                    if(!isUpdate){
                      if(i===0){
                        return <option value={s.value}>{s.key}</option>
                      }
                    } else {
                      return <option value={s.value}>{s.key}</option>
                    }
                })}
                </select>
              </FormGroup>
            </Col>
          </Row>
          {status.value === 'current-stock' && <Row>
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
                    *Please enter buy date
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
                {buyPrice.showErrorMsg && <div className="error">* Please enter buy price</div>}
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="buyPersonId">Buy Contact</Label>
                <SearchContact 
                  ref={this.buyPersonIdContainer} 
                  person={buyPersonId}
                  getSelectedPersonControl={this.getSelectedBuyPersonControl}
                ></SearchContact>
                {/* <select name="buyPersonId" onChange={this.handleInputChange} value={buyPersonId.value}>
                  <option>None</option>
                  {contacts.map(c=><option value={c.uuid}>{c.name}</option>)}
                </select> */}
                {buyPersonId.showErrorMsg && <div className="error">* Please enter buy contact</div>}
              </FormGroup>
            </Col>
          </Row>}

          {(status.value === 'jangad' || status.value === 'sold') && <Row>
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
                    * Please enter sell date
                  </div>}
                </div>
              </FormGroup>
            </Col>
            {<Col>
              <FormGroup>
                <Label for="sellPrice">Sell Price</Label>
                <Input
                  type="number"
                  id="sellPrice"
                  name="sellPrice"
                  value={sellPrice.value}
                  onChange={this.handleInputChange}
                ></Input>
                {sellPrice.showErrorMsg && <div className="error">* Please enter sell price</div>}
              </FormGroup>
            </Col>}
            <Col>
              <FormGroup>
                <Label for="sellPersonId">Sell Contact</Label>
                <SearchContact 
                  ref={this.sellPersonIdContainer} 
                  person={sellPersonId}
                  getSelectedPersonControl={this.getSelectedSellPersonControl}
                ></SearchContact>
                {/* <select name="sellPersonId" onChange={this.handleInputChange} value={sellPersonId.value}>
                  <option>None</option>
                  {contacts.map(c=><option value={c.uuid}>{c.name}</option>)}
                </select> */}
                {sellPersonId.showErrorMsg && <div className="error">* Please enter sell contact</div>}
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