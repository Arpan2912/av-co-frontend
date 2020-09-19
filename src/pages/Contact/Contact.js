import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Ionicon from 'react-ionicons';

import Pagination from '../../components/Pagination/Pagination';

import ContactService from '../../services/ContactService';
import Validation from '../../services/Validation';

import AddContact from '../../modal/AddContact';
import UploadContact from '../../modal/UploadContactModal';

import {downlodFile} from '../../utils';
import './Contact.css';

const pageSize = 10;


class Contact extends Component {
    state = {
        contacts: [],
        downloadExcelFields:['all'],
        selectedContactToUpdate: null,
        isAddContactModalOpen: false,
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
        }
    }

    componentDidMount() {
        this.getContacts(this.state.page);
    }

    getContacts = (page, search,isDownload) => {
        let {controls}=this.state;
        let {downloadCheckbox}=controls;
        let body={
            downloadExcelFields:downloadCheckbox.value
        }
        ContactService.getContacts(page, pageSize, search,isDownload,body)
            .then(data => {
                console.log(data.data);
                if(isDownload){
                    if(data.data.data && data.data.data.file){
                        downlodFile(data.data.data.file);
                    }
                } else {
                    const contacts = data.data.data.contacts;
                    const totalRecords = data.data.data.count;
                    this.setState({ contacts, totalRecords });
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

    openTransactions = (contactData) =>{
        this.props.history.push({
            pathname: "/transactions",
            contactData
        })
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
        this.setState({ page: page });
        this.getContacts(page, this.state.search);
        // this.getAllDealerReport(page, null, false, uuid);
    }

    handleSearchInput = (e) => {
        const value = e.target.value;
        this.setState({ search: value });
        this.searchContactData(value);
    }

    searchContactData = (search) => {
        this.setState({ page: 1 });
        this.getContacts(1, search);
    }

    downloadExcel=()=>{
        this.getContacts(this.state.page,this.state.search,true);
    }


    render() {
        const { contacts, selectedContactToUpdate, isAddContactModalOpen,
             page, totalRecords, search,controls,
             isUploadContactModalOpen
            } = this.state;
        const {downloadCheckbox}=controls;
        const prepareRows = contacts.map(c => <tr>
            <td>{c.name}</td>
            <td>
                <div>{c.mobile1}</div>
                <div>{c.mobile2}</div>
            </td>
            <td>{c.email}</td>
            <td>{c.address}</td>
            <td>{c.city}</td>
            <td>{c.company}</td>
            <td>{c.type}</td>
            <td>
                <span  onClick={this.openAddContactModal.bind(this, c)}>
                    <Ionicon icon="md-create" fontSize="16px" color="#fdbb1f" />    
                </span>&nbsp;
                <span  onClick={this.openTransactions.bind(this, c)} title="Transactions">
                    <Ionicon icon="md-git-compare" fontSize="16px" color="#fdbb1f"></Ionicon>
                </span>
            </td>
        </tr>)
        return (
            <div id="contact">
                {isAddContactModalOpen &&
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
                    </UploadContact>}
                <Row>
                    <Col xl="12">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col sm="4">
                                        <Input
                                            name="search"
                                            id="search"
                                            type="text"
                                            placeholder="Enter person name,phone numeber or company"
                                            onChange={this.handleSearchInput}
                                            value={search}
                                        ></Input>
                                    </Col>
                                    <Col className="text-align-right">
                                    <span className="download-link" onClick={this.openAddContactModal.bind(this, null)}>Add Contact</span>&nbsp;&nbsp;
                                        <span className="download-link" onClick={this.openUploadContactModal}>Upload Contact</span>
                                    </Col>
                                </Row>

                                <Table className="width-100 margin-top-10">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            <th>City</th>
                                            <th>Company</th>
                                            <th>Type</th>
                                            <th>Action</th>
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

export default Contact;