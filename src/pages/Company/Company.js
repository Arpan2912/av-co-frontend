import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Input, Button } from 'reactstrap';
import Ionicon from 'react-ionicons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

// services
import CompanyService from '../../services/CompanyService';
import StorageService from '../../services/StorageService';

// modals
import AddCompany from '../../modal/AddCompany';

// redux-slices
import { updateCompanyDetail } from '../../redux-slices/header-slice';

// css
import './Company.css';

const Company = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [companies, setCompanies] = useState([]);
	const [selectedCompanyToUpdate, setSelectedCompanyToUpdate] = useState(null);
	const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
	const [search, setSearch] = useState(null);

	useEffect(() => {
		StorageService.removeCompanyDetail();
		dispatch(updateCompanyDetail(null));
		getCompanies();
	}, [])

	const getCompanies = (search) => {
		CompanyService.getCompany(search)
			.then(data => {
				console.log(data.data);
				const companies = data.data.data.companies;
				setCompanies([...companies]);
			})
			.catch(e => {

			})
	}

	const openAddCompanyModal = (companyData) => {
		setIsAddCompanyModalOpen(true);
		setSelectedCompanyToUpdate(companyData);
	}

	const closeAddCompanyModal = () => {
		setIsAddCompanyModalOpen(false);
		setSelectedCompanyToUpdate(null);
		getCompanies();
	}

	const handleSearchInput = (e) => {
		const value = e.target.value;
		setSearch(value);
		searchCompanyData(value);
	}

	const searchCompanyData = (search) => {
		getCompanies(search);
	}

	const openCompany = (companyData) => {
		StorageService.setCompanyDetail(companyData);
		dispatch(updateCompanyDetail(companyData))
		navigate("/home")
	}

	const prepareRows = () => companies.map(c => <tr>
		<td>{c.company_name}</td>
		<td>
			<div>{c.phone}</div>
		</td>
		<td>
			<span onClick={() => openAddCompanyModal(c)}>
				<Ionicon icon="md-create" fontSize="16px" color="#ad1d1d" />
			</span>&nbsp;
			<span onClick={() => openCompany(c)} style={{ cursor: 'pointer' }}>
				Go to Company
			</span>&nbsp;
		</td>
	</tr>)

	return (
		<div id="contact">
			{isAddCompanyModalOpen &&
				<AddCompany
					show={isAddCompanyModalOpen}
					closeModal={closeAddCompanyModal}
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
										onChange={handleSearchInput}
										value={search}
									></Input>
								</Col>
								<Col className="text-align-right">
									<Button className="logout-button" onClick={() => openAddCompanyModal(null)}>Add Company</Button>&nbsp;&nbsp;
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
									{prepareRows()}
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

export default Company;
