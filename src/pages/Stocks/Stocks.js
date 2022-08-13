import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Table, Input, Label, Button } from 'reactstrap';
import Ionicon from 'react-ionicons';

// components
import Pagination from '../../components/Pagination/Pagination';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';

// services
import StockService from '../../services/StockService';
import ModalService from '../../services/ModalService';

// modals
import AddStock from '../../modal/AddStock';

// utils
import { downlodFile, formatDate, showErrorMsg } from '../../utils';

// css
import './Stocks.css';

const pageSize = 10;

let statusDropDownOptions = [
	{
		key: 'All',
		value: 'all'
	},
	{
		key: 'Current Stock',
		value: 'current-stock'
	},
	{
		key: 'Jangad',
		value: 'jangad'
	},
	{
		key: 'Sold',
		value: 'sold'
	}
]

const Stocks = () => {
	const [stocks, setStocks] = useState([]);
	const [selectedStockToUpdate, setSelectedStockToUpdate] = useState(null);
	const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
	const [page, setPage] = useState(1);
	const [totalRecords, setTotalRecords] = useState(0);
	const [search, setSearch] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState('all');


	useEffect(() => {
		getStocks(page);
	}, [])

	useEffect(() => {
		getStocks(page);
	}, [selectedStatus])

	const handleInputChange = (e) => {
		const controlValue = e.target.value;
		console.log("controlName")
		let stateValue = controlValue;
		setSelectedStatus(stateValue);
	}


	const getStocks = (page, search) => {
		setIsLoading(true);
		StockService.getStocks(page, pageSize, search, null, null, selectedStatus)
			.then(data => {
				setIsLoading(false);
				console.log(data.data);
				const stocks = data.data.data.stocks;
				const totalRecords = data.data.data.count;
				setStocks(stocks);
				setTotalRecords(totalRecords);
			})
			.catch(e => {
				setIsLoading(false);
			})
	}

	const openAddStockModal = (stockData) => {
		setIsAddStockModalOpen(true);
		setSelectedStockToUpdate(stockData);
	}
	const closeAddStockModal = (reload) => {
		setIsAddStockModalOpen(false);
		setSelectedStockToUpdate(null);
		if (reload) {
			getStocks(page);
		}
	}

	const deleteStock = (uuid) => {
		StockService.deleteStock(uuid)
			.then(data => {
				const message = data.data && data.data.message ? data.data.message : null;
				if (message) {
					ModalService.openAlert('Stock', message, 'success');
				}
				setPage(page);
				getStocks(1, search);
			})
			.catch(e => {
				showErrorMsg('Stock', e);
			})
	}

	const handlePageChange = (page) => {
		setPage(page);
		getStocks(page, search);
	}

	const handleSearchInput = (e) => {
		const value = e.target.value;
		setSearch(value);
		searchContactData(value);
	}

	const searchContactData = (search) => {
		setPage(1);
		getStocks(1, search);
	}

	const prepareRows = () => stocks.map(s => <tr>
		<td>{s.stock_id}</td>
		<td>{s.status}</td>
		<td>{s.weight}</td>
		<td>{s.buy_person_name}</td>
		<td>
			<div>{formatDate(s.buy_date)}</div>
		</td>
		<td>{s.buy_price}</td>
		<td>{s.buy_price_per}</td>
		<td>{s.sell_person_name}</td>
		<td>{s.sell_date && formatDate(s.sell_date)}</td>
		<td>{s.sell_price}</td>
		<td>{s.sell_price_per}</td>
		<td>
			<Ionicon onClick={() => openAddStockModal(s)} icon="md-create" fontSize="16px" color="#ad1d1d" />&nbsp;
			{!(s.sell_person_name || s.sell_date || s.sell_price) && <Ionicon onClick={() => deleteStock(s.uuid)} icon="md-trash" fontSize="16px" color="#ad1d1d" />}
		</td>
	</tr>)


	return (
		<div id="contact">

			{isAddStockModalOpen &&
				<AddStock
					show={isAddStockModalOpen}
					closeModal={closeAddStockModal}
					stockData={selectedStockToUpdate}>
				</AddStock>}

			<Row>
				<Col xl="12">
					<Card>
						<CardBody>
							{isLoading && <CustomSpinner></CustomSpinner>}
							<Row>
								<Col sm="3">
									<Label for="status">Search</Label>
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
									<Label for="status">Status</Label>
									<select name="selectedStatus" onChange={handleInputChange} value={selectedStatus}>
										{statusDropDownOptions.map(s => <option value={s.value}>{s.key}</option>)}
									</select>
								</Col>
								<Col className="text-align-right">
									<Button className="logout-button" onClick={() => openAddStockModal(null)}>Add Stock</Button>&nbsp;&nbsp;
								</Col>
							</Row>

							<Table className="width-100 margin-top-10">
								<thead>
									<tr>
										<th>Stock Id</th>
										<th>Status</th>
										<th>Weight</th>
										<th>Buy Contact</th>
										<th>Buy Date</th>
										<th>Buy Price</th>
										<th>Buy Price Per</th>
										<th>Sell Contact</th>
										<th>Sell Date</th>
										<th>Sell Price</th>
										<th>Sell Price per</th>
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

export default Stocks;