import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Ionicon from 'react-ionicons';
import { Row, Col, Card, CardBody, Table, Label, Input, Button } from 'reactstrap';

// components
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';
import Pagination from '../../components/Pagination/Pagination';

// services
import TransactionService from '../../services/TransactionService';

// modals
import AddTransaction from '../../modal/AddTransaction';

// utils
import { downlodFile, formatDate } from '../../utils';

// css
import './Transactions.css';

const pageSize = 10;


const Transactions = () => {
	const location = useLocation();
	const [transactions, setTransactions] = useState([]);
	const [selectedTransactionToUpdate, setSelectedTransactionToUpdate] = useState(null);
	const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
	const [page, setPage] = useState(1);
	const [totalRecords, setTotalRecords] = useState(0);
	const [search, setSearch] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [controls, setControls] = useState({
		downloadCheckbox: {
			value: ['all'],
			valid: null,
			touched: false,
			required: true,
			showErrorMsg: false
		},
	});
	const [mode, setMode] = useState('all');

	useEffect(() => {
		getTransactions();
	}, [])

	useEffect(() => {
		getTransactions();
	}, [page, mode, search])

	const handleInputChange = (e) => {
		const controlName = e.target.name;
		const controlValue = e.target.value;
		let stateValue = controlValue;
		setPage(1);
		setMode(stateValue);
	}

	const getTransactions = () => {
		let personId = null;
		if (location && location.contactData) {
			personId = location.contactData.uuid;
		}
		setIsLoading(true);
		TransactionService.getTransactions(page, pageSize, search, null, null, personId, mode)
			.then(data => {
				setIsLoading(false);
				console.log(data.data);
				const transactions = data.data.data.transaction;
				const totalRecords = data.data.data.count;
				setTransactions(transactions);
				setTotalRecords(totalRecords);
			})
			.catch(e => {
				setIsLoading(false);
			})
	}


	const openAddTransactionModal = (contactData) => {
		setIsAddTransactionModalOpen(true);
		setSelectedTransactionToUpdate(contactData);
	}

	const closeAddTransactionModal = (reload) => {
		console.log("closing modal");
		setIsAddTransactionModalOpen(false);
		setSelectedTransactionToUpdate(null);
		if (reload) {
			getTransactions();
		}
	}


	const handlePageChange = (page) => {
		setPage(page);
	}

	const handleSearchInput = (e) => {
		const value = e.target.value;
		setPage(1)
		setSearch(value);
	}

	const prepareRows = () => transactions.map(t => <tr>
		<td>{t.name}</td>
		<td>{formatDate(t.transaction_date)}</td>
		<td>
			<div>{t.credit}</div>

		</td>
		<td>{t.debit}</td>
		<td>{t.mode}</td>
		<td>{t.note}</td>
		<td>
			{!(t.mode === 'stock' || !t.person_id) && <Ionicon onClick={() => openAddTransactionModal(t)} icon="md-create" fontSize="16px" color="#ad1d1d" />}
		</td>
	</tr>)

	return (
		<div id="contact">
			{isAddTransactionModalOpen &&
				<AddTransaction
					show={isAddTransactionModalOpen}
					closeModal={closeAddTransactionModal}
					transactionData={selectedTransactionToUpdate}>
				</AddTransaction>}
			<Row>
				<Col xl="12">
					<Card>
						<CardBody>
							{isLoading && <CustomSpinner></CustomSpinner>}
							<Row>
								<Col sm="3">
									<Label for="mode">Search</Label>
									<Input
										name="search"
										id="search"
										type="text"
										placeholder="Enter person name,phone numeber or company"
										onChange={handleSearchInput}
										value={search}
									></Input>
								</Col>
								<Col sm="2">
									<Label for="mode">Mode</Label>
									<div>
										<select name="mode" onChange={handleInputChange} value={mode}>
											<option value='all'>All</option>
											<option value='cash'>Cash</option>
											<option value='check'>Check</option>
											<option value='stock'>Stock</option>
											<option value='other'>Other</option>
										</select>
									</div>
								</Col>
								<Col className="text-align-right">
									<Button className="logout-button" onClick={() => openAddTransactionModal(null)}>Add Transaction</Button>&nbsp;&nbsp;
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

export default Transactions;