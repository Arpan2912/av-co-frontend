import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Table, Input } from 'reactstrap';
import Ionicon from 'react-ionicons';
import { connect } from 'react-redux';
import CompanyService from '../../services/CompanyService';

import AddCompany from '../../modal/AddCompany';
import { updateCompanyDetail } from '../../actions/header-action';
import './Company.css';
import StorageService from '../../services/StorageService';

class Company extends Component {
    state = {
        companies: [],
        selectedCompanyToUpdate: null,
        isAddCompanyModalOpen: false,
        page: 1,
        totalRecords: 0,
        search: null
    }

    componentDidMount() {
        StorageService.removeCompanyDetail();
        this.props.updateCompanyDetail(null)
        this.getCompanies();
    }

    getCompanies = (search) => {
        CompanyService.getCompany(search)
            .then(data => {
                console.log(data.data);
                const companies = data.data.data.companies;
                this.setState({ companies });
            })
            .catch(e => {

            })
    }

    openAddCompanyModal = (companyData) => {
        this.setState({ isAddCompanyModalOpen: true, selectedCompanyToUpdate: companyData });
    }

    closeAddCompanyModal = () => {
        this.setState({ isAddCompanyModalOpen: false, selectedCompanyToUpdate: null });
        this.getCompanies();
    }

    handleSearchInput = (e) => {
        const value = e.target.value;
        this.setState({ search: value });
        this.searchCompanyData(value);
    }

    searchCompanyData = (search) => {
        this.getCompanies(search);
    }

    openCompany = (companyData) => {
        StorageService.setCompanyDetail(companyData);
        this.props.updateCompanyDetail(companyData);
        this.props.history.push("/home");
    }

    render() {
        const { companies, selectedCompanyToUpdate, isAddCompanyModalOpen, search } = this.state;
        const prepareRows = companies.map(c => <tr>
            <td>{c.company_name}</td>
            <td>
                <div>{c.phone}</div>
            </td>
            <td>
                <span onClick={this.openAddCompanyModal.bind(this, c)}>
                    <Ionicon icon="md-create" fontSize="16px" color="#fdbb1f" />
                </span>&nbsp;
                <span onClick={this.openCompany.bind(this, c)} style={{cursor:'pointer'}}>
                    Go to Company
                </span>&nbsp;
            </td>
        </tr>)
        return (
            <div id="contact">
                {isAddCompanyModalOpen &&
                    <AddCompany
                        show={isAddCompanyModalOpen}
                        closeModal={this.closeAddCompanyModal}
                        companyData={selectedCompanyToUpdate}>
                    </AddCompany>}
                <Row>
                    <Col xl="3"></Col>
                    <Col xl="6">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col sm="6">
                                        <Input
                                            name="search"
                                            id="search"
                                            type="text"
                                            placeholder="Enter company name"
                                            onChange={this.handleSearchInput}
                                            value={search}
                                        ></Input>
                                    </Col>
                                    <Col className="text-align-right">
                                        <span className="download-link" onClick={this.openAddCompanyModal.bind(this, null)}>Add Company</span>&nbsp;&nbsp;
                                    </Col>

                                </Row>

                                <Table className="width-100 margin-top-10">
                                    <thead>
                                        <tr>
                                            <th>Company Name</th>
                                            <th>Phone</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prepareRows}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="3"></Col>

                </Row>

            </div>
        );
    }
}

export default connect(null, { updateCompanyDetail })(Company);
