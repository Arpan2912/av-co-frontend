import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label, InputGroup } from 'reactstrap';
import DatePicker from 'react-datepicker';

import CustomSpinner from '../components/CustomSpinner/CustomSpinner';
import SearchContact from '../components/SearchContact/SearchContact';

import TransactionService from '../services/TransactionService';
import ContactService from '../services/ContactService';
import Validation from '../services/Validation';
import ModalService from '../services/ModalService';

let isLoading = false;

let defaultControls = {
  transactionDate: {
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
  person: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  type: {
    value: 'credit',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  mode: {
    value: 'cash',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  note: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  amount: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  } 
}

export default class AddTransaction extends Component {

  state = {
    contacts:[],
    controls: JSON.parse(JSON.stringify(defaultControls)),
    isLoading: false,
    personName :null, 
    search:null,
    showPersonList : false
  }

  constructor() {
    super();
    this.container = React.createRef();
  }


  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    const { transactionData } = this.props;
    console.log("transactionData", transactionData);
    this.getContacts();
    if (transactionData) {
      const { controls } = this.state;
      const { 
        transactionDate, type, mode, note, amount, person
      } = controls;
      
      transactionDate.value = new Date(transactionData.transaction_date);
      if(transactionData.credit){
        type.value = 'credit';
        amount.value = transactionData.credit;
      } 
      if(transactionData.debit) {
        type.value = 'debit';
        amount.value = transactionData.debit;
      }
      mode.value = transactionData.mode;
      note.value = transactionData.note;
      person.value = transactionData.person_id;

      this.setState({ controls });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
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
      transactionDate, type, mode, note, amount, person
    } = controls;

    if (firstTime === true || person.touched === true || isSubmit) {
      person = Validation.notNullValidator(person);
      person.valid = !(person.nullValue);
      if (((isSubmit || person.touched) && person.valid === false)) {
        person.showErrorMsg = true;
      } else {
        person.showErrorMsg = false;
      }
    }

    if (firstTime === true || type.touched === true || isSubmit) {
      type = Validation.notNullValidator(type);
      type.valid = !(type.nullValue);
      if (((isSubmit || type.touched) && type.valid === false)) {
        type.showErrorMsg = true;
      } else {
        type.showErrorMsg = false;
      }
    }


    if (firstTime === true || mode.touched === true || isSubmit) {
      mode = Validation.notNullValidator(mode);
      mode.valid = !(mode.nullValue);
      if (((isSubmit || mode.touched) && mode.valid === false)) {
        mode.showErrorMsg = true;
      } else {
        mode.showErrorMsg = false;
      }
    }

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
      type.valid === true &&
      mode.valid === true && 
      amount.valid === true &&  
      person.valid === true
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

  getContacts = () => {
    const { personName } =this.state;
    ContactService.getContacts(1,1000000,personName,false)
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


  // handlePersonSearchChange = (e) => {
  //   let { personName, controls } = this.state;
  //   const { person } = controls;
  //   personName = e.target.value;
  //   person.value = null;
  //   // const value = e.target.value;
  //   this.setState({ personName,controls  },()=>{
  //     this.getContacts();
  //   });
  // }

  // openPersonToggle = () => {
  //   let { showPersonList } = this.state;
  //   showPersonList = true;
  //   this.setState({
  //     showPersonList
  //   });
  // }

  // onSelectPerson = (contact) => {
  //   let { personName, showPersonList, controls } = this.state;
  //   const { person } = controls;
  //   const { name, uuid } = contact;
  //   personName = name;
  //   person.value = uuid;
  //   showPersonList = false;
  //   this.setState({ personName, controls, showPersonList });
  // }

  saveDetail = (isEdit) => {
    const { controls } = this.state;
    const { transactionDate, type, mode, amount, note, person } = controls;   
    const { transactionData } = this.props;
    if (isLoading === true) {
      return;
    }
    const isFormValid = this.handleValidation(false, true);
    if (isFormValid === false) {
      return;
    }
    console.log("controls", controls);
    const { contactData } = this.props;
    let transactionDateVar = null;
    if(transactionDate.value){
      transactionDate.value.setHours(5,30,0,0);
      console.log("transactionDate",transactionDate);
      transactionDateVar = transactionDate.value.toISOString();
    }
    let obj = {
      transactionDate: transactionDateVar,
      type: type.value,
      mode: mode.value,
      amount: amount.value,
      note: note.value,
      personId: person.value
    }
    
    if(isEdit === true){
      obj.id = transactionData.uuid
    }

    this.setState({ isLoading: true });
    isLoading = true;
    let functionToCall = null;
    if(isEdit === true){
      functionToCall = TransactionService.updateTransaction(obj);
    } else {
      functionToCall = TransactionService.addTransaction(obj);
    }

    functionToCall
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

  handleClickOutside = event => {
      if (this.container.current && !this.container.current.contains(event.target)) {
        // if (!this.container.current ) {
        console.log("setting to hide")
        this.setState({
          showPersonList: false,
        });
      }
  }
  
  getSelectedPersonControl = (personControl) => {
    const { controls } = this.state;
    controls.person = personControl;
    console.log("person",controls);
    this.setState({ controls });
  }

  render() {
    const { transactionData } = this.props;
    const { controls,isLoading, contacts, personName, personUuid, showPersonList } = this.state;
    const { transactionDate, mode, type, amount, note, person } = controls;


    return <Modal isOpen={this.props.show} toggle={this.props.closeModal} >
      <ModalHeader toggle={this.props.closeModal}>Add Transaction</ModalHeader>
      <ModalBody>
        {isLoading && <CustomSpinner></CustomSpinner>}
        <Form>
          <Row>
          <Col>
                <FormGroup>
                <Label for="password" className="field-title">Transaction Date</Label>
                <div>
                  <Label className="width-100"
                    onClick={e => this.transactionDate.state.open && e.preventDefault()}
                  >
                    <InputGroup>
                      <DatePicker className={"form-control calendar-input"}
                        selected={transactionDate.value}
                        onChange={this.handleDateChange.bind(this, 'transactionDate')}
                        showMonthDropdown
                        ref={r => this.transactionDate = r}
                        // shouldCloseOnSelect={true}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        placeholderText="Select"
                        shouldCloseOnSelect
                        dropdownMode="select"
                      />
                    </InputGroup>
                  </Label>
                  {transactionDate.showErrorMsg && <div className="error">
                    {/* {EMPTY_BANNER_END_DATE} */}
                  </div>}
                </div>
              </FormGroup>
            </Col>
            
          </Row>
          <Row >
            <Col>
              <Label for="person">Contact Name</Label>
              <SearchContact 
                ref={this.container} 
                person={person}
                getSelectedPersonControl={this.getSelectedPersonControl}
              ></SearchContact>
              {person.showErrorMsg && <div className="error">* Please select person name</div>}

                {/* <div ref={this.container}>
                  <Label for="status">Contact Name</Label>
                  <Input type="text" name="person" autoComplete="off" value={personName} onChange={this.handlePersonSearchChange.bind(this)}
                    onFocus={this.openPersonToggle.bind(this)}></Input>
                  {person.showErrorMsg && <div className="error">* Please select person name</div>}
                  {showPersonList &&
                    <div className="p-list">
                      {contacts.map((c, i) =>
                        <Button
                          className="list-button"
                          onClick={this.onSelectPerson.bind(this, c)}
                        >
                          {c.name}
                        </Button>
                      )}
                    </div>
                  }
                </div> */}

              </Col>
          </Row>
          <Row className="margin-top-5">
            <Col>
              <FormGroup>
                <Label for="type">Type</Label>
                <div>
                  <select name="type" onChange={this.handleInputChange} value={type.value}>
                    <option value='credit'>Credit</option>
                    <option value='debit'>Debit</option>
                  </select>
                  {type.showErrorMsg && <div className="error">* Please enter phone number</div>}
                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="mode">Mode</Label>
                <div>
                  <select name="mode" onChange={this.handleInputChange} value={mode.value}>
                    <option value='cash'>Cash</option>
                    <option value='check'>Check</option>
                    {/* <option value='stock'>Stock</option> */}
                  </select>
                  {mode.showErrorMsg && <div className="error">* Please enter phone number</div>}
                </div>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Label for="amount">Amount</Label>
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  value={amount.value}
                  onChange={this.handleInputChange}
                ></Input>
                {amount.showErrorMsg && <div className="error">* Please enter valid amount</div>}

              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="note">Note</Label>
                <Input
                  type="text"
                  id="note"
                  name="note"
                  value={note.value}
                  onChange={this.handleInputChange}
                ></Input>
                {note.showErrorMsg && <div className="error">* Please enter valid company name</div>}

              </FormGroup>
            </Col>
          </Row>
          
          
          <Button onClick={transactionData ? this.saveDetail.bind(this,true): this.saveDetail}>
            Save
          </Button>
        </Form>
      </ModalBody>

    </Modal>
  }
}