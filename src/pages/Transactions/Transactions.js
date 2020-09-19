import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Ionicon from 'react-ionicons';

import Pagination from '../../components/Pagination/Pagination';


import TransactionService from '../../services/TransactionService';
import Validation from '../../services/Validation';

import AddContact from '../../modal/AddContact';
import UploadContact from '../../modal/UploadContactModal';
import AddTransaction from '../../modal/AddTransaction';

import {downlodFile,formatDate} from '../../utils';
import './Transactions.css';

const pageSize = 10;


class Transactions extends Component {
    state = {
        transactions: [],
        downloadExcelFields:['all'],
        selectedContactToUpdate: null,
        selectedTransactionToUpdate: null,
        isAddContactModalOpen: false,
        isAddTransactionModalOpen: false,
        isUploadContactModalOpen: false,
        page: 1,
        totalRecords: 0,
        search: null,
        controls:{
            downloadCheckbox: {
                value: ['all'],
                valid: null,
                touched: false,
                required: true,
                showErrorMsg: false
              },
        },
        mode:'all'
    }

    componentDidMount() {   
        this.getTransactions();
    }

    handleInputChange = (e) => {
        const controlName = e.target.name;
        const controlValue = e.target.value;
        let stateValue = controlValue;
        let obj = {
            page:1
        };
        obj[controlName]=stateValue;
        console.log("obj",obj);
        this.setState(obj,()=>{
            this.getTransactions()
        });
        // this.handleValidation();
    }

    getTransactions = (isDownload) => {
        let { controls, page, search,mode }=this.state;
        console.log("this.props",this.props);
        let personId = null;
        if(this.props.location && this.props.location.contactData){
            personId = this.props.location.contactData.uuid;
        }
        let {downloadCheckbox} = controls;
        let body={
            downloadExcelFields:downloadCheckbox.value
        }
        TransactionService.getTransactions(page, pageSize, search,isDownload,body,personId,mode)
            .then(data => {
                console.log(data.data);
                if(isDownload){
                    if(data.data.data && data.data.data.file){
                        downlodFile(data.data.data.file);
                    }
                } else {
                    const transactions = data.data.data.transaction;
                    const totalRecords = data.data.data.count;
                    this.setState({ transactions, totalRecords });
                }      
            })
            .catch(e => {

            })
    }

    openAddContactModal = (contactData) => {
        this.setState({ isAddContactModalOpen: true, selectedContactToUpdate: contactData });
    }
    closeAddContactModal = (reload) => {
        console.log("closing modal");
        this.setState({ isAddContactModalOpen: false, selectedContactToUpdate: null });
        if(reload) {
            this.getContacts(this.state.page);
        }
    }

    openAddTransactionModal = (contactData) => {
        this.setState({ isAddTransactionModalOpen: true, selectedTransactionToUpdate: contactData });
    }
    
    closeAddTransactionModal = (reload) => {
        console.log("closing modal");
        this.setState({ isAddTransactionModalOpen: false, selectedTransactionToUpdate: null });
        if(reload) {
            this.getTransactions();
        }
    }

    openUploadContactModal = () => {
        this.setState({ isUploadContactModalOpen: true });
    }
    closeUploadContactModal = (reload) => {
        this.setState({ isUploadContactModalOpen: false });
        if(reload) {
            this.getContacts(this.state.page);
        }
    }

    handlePageChange = (page) => {
        this.setState({ page: page },() => {
            this.getTransactions();
        });
    }

    handleSearchInput = (e) => {
        const value = e.target.value;
        this.setState({ page:1, search: value },()=>{
            this.getTransactions();
        })
    }

    downloadExcel=()=>{
        this.getContacts(this.state.page,this.state.search,true);
    }

    handledownloadCheckboxInput = (e) => {
        const { controls } = this.state;
        const { downloadCheckbox } = controls;
        let checkBoxValue = downloadCheckbox.value;
        let valueIndex = checkBoxValue.indexOf(e);
        if(valueIndex < 0) {
          if((e !== 'all' && checkBoxValue && checkBoxValue[0] === 'all') || e === 'all') {
            checkBoxValue = [e];
          } else {
            checkBoxValue.push(e);
          }
        } else {
          checkBoxValue.splice(valueIndex, 1);
        }
        downloadCheckbox.value = checkBoxValue;
        
        this.setState({ controls })
      }

    render() {
        const { transactions, selectedContactToUpdate, isAddContactModalOpen,
             page, totalRecords, search,controls,
             isUploadContactModalOpen,isAddTransactionModalOpen,selectedTransactionToUpdate,mode
            } = this.state;
        const {downloadCheckbox}=controls;
        const prepareRows = transactions.map(t => <tr>
            <td>{t.name}</td>
            <td>{formatDate(t.transaction_date)}</td>
            <td>
                <div>{t.credit}</div>
                
            </td>
            <td>{t.debit}</td>
            <td>{t.mode}</td>
            <td>{t.note}</td>
            <td>
              {!(t.mode === 'stock' || !t.person_id) && <Ionicon onClick={this.openAddTransactionModal.bind(this, t)} icon="md-create" fontSize="16px" color="#fdbb1f" />}
            </td>
        </tr>)
        return (
            <div id="contact">
                {/* {isAddContactModalOpen &&
                    <AddContact
                        show={isAddContactModalOpen}
                        closeModal={this.closeAddContactModal}
                        contactData={selectedContactToUpdate}>
                    </AddContact>}

                    {isUploadContactModalOpen &&
                    <UploadContact
                        show={isUploadContactModalOpen}
                        closeModal={this.closeUploadContactModal}
                        >
                    </UploadContact>} */}

                    {isAddTransactionModalOpen &&
                    <AddTransaction
                        show={isAddTransactionModalOpen}
                        closeModal={this.closeAddTransactionModal}
                        transactionData={selectedTransactionToUpdate}>
                    </AddTransaction>}
                <Row>
                    <Col xl="12">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col sm="3">
                                    <Label for="mode">Search</Label>
                                        <Input
                                            name="search"
                                            id="search"
                                            type="text"
                                            placeholder="Enter person name,phone numeber or company"
                                            onChange={this.handleSearchInput}
                                            value={search}
                                        ></Input>
                                    </Col>
                                    <Col sm="2">
                                        <Label for="mode">Mode</Label>
                                        <div>
                                            <select name="mode" onChange={this.handleInputChange} value={mode}>
                                                <option value='all'>All</option>
                                                <option value='cash'>Cash</option>
                                                <option value='check'>Check</option>
                                                <option value='stock'>Stock</option>
                                                <option value='other'>Other</option>
                                            </select>
                                        </div>
                                    </Col>
                                    <Col className="text-align-right">
                                    <span className="download-link" onClick={this.openAddTransactionModal.bind(this, null)}>Add Transaction</span>&nbsp;&nbsp;
                                    {/* <span className="download-link" onClick={this.openAddContactModal.bind(this, null)}>Add Contact</span>&nbsp;&nbsp; */}
                                        {/* <span className="download-link" onClick={this.openUploadContactModal}>Upload Contact</span> */}
                                    </Col>
                                </Row>

                                <Table className="width-100 margin-top-10">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Date</th>
                                            <th>Credit</th>
                                            <th>Debit</th>
                                            <th>Mode</th>
                                            <th>Note</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prepareRows}
                                    </tbody>
                                </Table>
                                {<Pagination
                                    margin={2}
                                    page={page}
                                    pageSize={pageSize}
                                    totalRecords={totalRecords}
                                    onPageChange={this.handlePageChange}
                                ></Pagination>}
                            </CardBody>
                        </Card>
                    </Col>
                   
                </Row>

            </div>
        );
    }
}

export default Transactions;