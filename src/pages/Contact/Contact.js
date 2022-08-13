import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router';
import Ionicon from 'react-ionicons';

// components
import Pagination from '../../components/Pagination/Pagination';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';

// services
import ContactService from '../../services/ContactService';

// modals
import AddContact from '../../modal/AddContact';
import UploadContact from '../../modal/UploadContactModal';

// utils
import { downlodFile } from '../../utils';

// css
import './Contact.css';

const pageSize = 10;


const Contact = () => {
	const navigate = useNavigate();
	const [contacts, setContacts] = useState([]);
	const [selectedContactToUpdate, setSelectedContactToUpdate] = useState(null);
	const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
	const [isUploadContactModalOpen, setIsUploadContactModalOpen] = useState(false);
	const [page, setPage] = useState(1);
	const [totalRecords, setTotalRecords] = useState(0);
	const [search, setSearch] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	// const { downloadCheckbox } = controls;

	useEffect(() => {
		console.log("rendering")
		getContacts(page);
	}, [])

	const getContacts = (page, search) => {
		setIsLoading(true);
		ContactService.getContacts(page, pageSize, search)
			.then(data => {
				setIsLoading(false);
				console.log(data.data);
				const contacts = data.data.data.contacts;
				const totalRecords = data.data.data.count;
				setContacts(contacts);
				setTotalRecords(totalRecords);
			})
			.catch(e => {
				setIsLoading(false);
			})
	}


	const openAddContactModal = (contactData) => {
		setIsAddContactModalOpen(true);
		setSelectedContactToUpdate(contactData);
	}
	const closeAddContactModal = (reload) => {
		console.log("closing modal");
		setIsAddContactModalOpen(false);
		setSelectedContactToUpdate(null);
		if (reload) {
			getContacts(page);
		}
	}

	const openTransactions = (contactData) => {
		navigate("/transactions", { state: { contactData } })
	}

	const openUploadContactModal = () => {
		setIsUploadContactModalOpen(true);
	}
	const closeUploadContactModal = (reload) => {
		setIsUploadContactModalOpen(false);

		if (reload) {
			getContacts(page);
		}
	}

	const handlePageChange = (page) => {
		setPage(page)
		getContacts(page, search);
	}

	const handleSearchInput = (e) => {
		const value = e.target.value;
		setSearch(value);
		searchContactData(value);
	}

	const searchContactData = (search) => {
		setPage(1);
		getContacts(1, search);
	}

	const prepareRows = () => contacts.map(c => <tr>
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
			<span onClick={() => openAddContactModal(c)}>
				<Ionicon icon="md-create" fontSize="16px" color="#ad1d1d" />
			</span>&nbsp;
			<span onClick={() => openTransactions(c)} title="Transactions">
				<Ionicon icon="md-git-compare" fontSize="16px" color="#ad1d1d"></Ionicon>
			</span>
		</td>
	</tr>)

	return (
		<div id="contact">
			{isAddContactModalOpen &&
				<AddContact
					show={isAddContactModalOpen}
					closeModal={closeAddContactModal}
					contactData={selectedContactToUpdate}>
				</AddContact>}

			{isUploadContactModalOpen &&
				<UploadContact
					show={isUploadContactModalOpen}
					closeModal={closeUploadContactModal}
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
										onChange={handleSearchInput}
										value={search}
									></Input>
								</Col>
								<Col className="text-align-right">
									<Button className="logout-button" onClick={() => openAddContactModal(null)}>Add Contact</Button>&nbsp;&nbsp;
									<Button className="logout-button" onClick={() => openUploadContactModal()}>Upload Contact</Button>
								</Col>
							</Row>
							{isLoading && <CustomSpinner></CustomSpinner>}
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
									{prepareRows()}
								</tbody>
							</Table>
							{<Pagination
								margin={2}
								page={page}
								pageSize={pageSize}
								totalRecords={totalRecords}
								onPageChange={handlePageChange}
							></Pagination>}
						</CardBody>
					</Card>
				</Col>

			</Row>

		</div>
	);
}

export default Contact;