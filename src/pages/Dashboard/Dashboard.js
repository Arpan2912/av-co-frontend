import React, { useEffect, useState } from 'react';
import { Card, CardBody, Row, Col, Input, Table } from 'reactstrap';
import Ionicon from 'react-ionicons';

// components
import Pagination from '../../components/Pagination/Pagination';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';

// services
import OpeningBalanceService from '../../services/OpeningBalanceService';
import TransactionService from '../../services/TransactionService';
import DashboardService from '../../services/DashboardService';

// modals
import AddStock from '../../modal/AddStock';
import AddOpeningBalance from '../../modal/AddOpeningBalance';
import AddTransaction from '../../modal/AddTransaction';

const pageSizeDalal = 10;
const pageSizeAccountSummary = 10;
const Dashboard = () => {
  const [isAddOpeningBalanceModalOpen, setIsAddOpeningBalanceModalOpen] = useState(false);
  const [isAddOpeningBalanceButtonVisible, setIsAddOpeningBalanceButtonVisible] = useState(false);
  const [openingBalanceData, setOpeningBalanceData] = useState({});
  const [selectedOpeningBalanceToUpdate, setSelectedOpeningBalanceToUpdate] = useState(null);
  const [closingBalanceData, setClosingBalanceData] = useState({});
  const [dalalData, setDalalData] = useState([]);
  const [searchDalal, setSearchDalal] = useState(null);
  const [pageDalal, setPageDalal] = useState(1);
  const [totalDalals, setTotalDalals] = useState(0);
  const [pageAccountSummary, setPageAccountSummary] = useState(1);
  const [totalAccountSummary, setTotalAccountSummary] = useState(0);
  const [searchAccountSummary, setSearchAccountSummary] = useState(null);
  const [accountSummaryData, setAccountSummaryData] = useState([]);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [isDalalDataLoading, setIsDalalDataLoading] = useState(false);
  const [isAccountSummaryLoading, setIsAccountSummaryLoading] = useState(false);

  useEffect(() => {
    getTodayOpeningBalance();
    getTodayCloseAmount();
    getStockAndAmtWithDalal();
    getAccountSummary();
  }, [])

  useEffect(() => {
    getStockAndAmtWithDalal();
  }, [pageDalal, searchDalal])

  useEffect(() => {
    getAccountSummary();
  }, [pageAccountSummary, searchAccountSummary])

  const openAddOpeningBalanceModal = (OpeningBalanceData) => {
    setIsAddOpeningBalanceModalOpen(true);
    setSelectedOpeningBalanceToUpdate(OpeningBalanceData);
  }

  const closeAddOpeningBalanceModal = (reload) => {
    setIsAddOpeningBalanceModalOpen(false);
    setSelectedOpeningBalanceToUpdate(null);
    if (reload) {
      getTodayOpeningBalance();
    }
  }

  const getTodayOpeningBalance = () => {
    OpeningBalanceService.getTodayOpeningBalance()
      .then(data => {
        if (data.data.data) {
          setOpeningBalanceData(data.data.data)
        } else {
          setIsAddOpeningBalanceButtonVisible(true);
        }
        console.log("data", data);
      })
      .catch(e => {
        console.error("e", e);
      })
  }

  const getTodayCloseAmount = () => {
    TransactionService.getCloseAmountToday()
      .then(data => {
        if (data.data.data) {
          setClosingBalanceData(data.data.data);
        }
      })
      .catch(e => {

      })
  }

  const getStockAndAmtWithDalal = () => {
    const obj = {
      page: pageDalal,
      limit: pageSizeDalal,
      search: searchDalal
    }
    setIsDalalDataLoading(true);
    DashboardService.getStockAndAmtWithDalal(obj)
      .then(data => {
        setIsDalalDataLoading(false);
        if (data.data.data && data.data.data.data) {
          setDalalData(data.data.data.data)
        }
        if (data.data.data && data.data.data.count) {
          setTotalDalals(data.data.data.count)
        }
      })
      .catch(e => {

      })
  }

  const getAccountSummary = () => {
    const obj = {
      page: pageAccountSummary,
      limit: pageSizeAccountSummary,
      search: searchAccountSummary
    }
    setIsAccountSummaryLoading(true);
    DashboardService.getAccountSummary(obj)
      .then(data => {
        setIsAccountSummaryLoading(false);
        if (data.data.data && data.data.data.data) {
          setAccountSummaryData(data.data.data.data);
        }
        if (data.data.data && data.data.data.count) {
          setTotalAccountSummary(data.data.data.count)
        }
      })
      .catch(e => {
        setIsAccountSummaryLoading(false);

      })
  }

  const handleSearchDalalInput = (e) => {
    const value = e.target.value;
    setPageDalal(1);
    setSearchDalal(value);
  }

  const handlePageChange = (page) => {
    setPageDalal(page);
  }

  const handleSearchAccountSummaryInput = (e) => {
    const value = e.target.value;
    setPageAccountSummary(1);
    setSearchAccountSummary(value);
  }

  const handleAccountSummaryPageChange = (page) => {
    setPageAccountSummary(page);
  }

  const openAddStockModal = () => {
    setIsAddStockModalOpen(true);
  }

  const closeAddStockModal = () => {
    console.log("closing modal");
    setIsAddStockModalOpen(false);
  }

  const openAddTransactionModal = () => {
    setIsAddTransactionModalOpen(true);
  }

  const closeAddTransactionModal = () => {
    console.log("closing modal");
    setIsAddTransactionModalOpen(false);
  }

  const { value: amount } = openingBalanceData;
  const { total } = closingBalanceData;
  return <div id="dashboard">
    {
      isAddOpeningBalanceModalOpen &&
      <AddOpeningBalance
        show={isAddOpeningBalanceModalOpen}
        closeModal={closeAddOpeningBalanceModal}
        openingBalanceData={selectedOpeningBalanceToUpdate}
      >
      </AddOpeningBalance>
    }

    {isAddStockModalOpen &&
      <AddStock
        show={isAddStockModalOpen}
        closeModal={closeAddStockModal}
      >
      </AddStock>
    }

    {isAddTransactionModalOpen &&
      <AddTransaction
        show={isAddTransactionModalOpen}
        closeModal={closeAddTransactionModal}
      >
      </AddTransaction>
    }
    <Row>
      <Col sm="12" md="3">
        <Card>
          <CardBody>
            {!isAddOpeningBalanceButtonVisible &&
              <>

                <Row>
                  <Col sm="10">Opening Balance : {amount}</Col>
                  <Col className="text-align-right">
                    <div onClick={() => openAddOpeningBalanceModal(openingBalanceData)}>
                      <Ionicon icon="md-create" fontSize="16px" color="#d10404" />
                    </div>
                  </Col>
                </Row>
                <div> </div>
              </>}

            {isAddOpeningBalanceButtonVisible &&
              <>
                <div onClick={() => openAddOpeningBalanceModal(null)}>Add Opening Balance</div>
              </>}
          </CardBody>
        </Card>
      </Col>
      <Col sm="12" md="3">
        <Card>
          <CardBody>
            <div>Current Balance : {total}</div>
          </CardBody>
        </Card>
      </Col>
      <Col sm="12" md="6" className="text-align-right">
        <button onClick={() => openAddStockModal(null)} className="logout-button">Add Stock</button>&nbsp;
        <button onClick={() => openAddTransactionModal(null)} className="logout-button">Add Transaction</button>
      </Col>
    </Row>
    <Row>
      <Col sm="12" md="6">
        <Card className="width-100 margin-top-10">
          <CardBody>
            {isDalalDataLoading && <CustomSpinner></CustomSpinner>}
            <Row>
              <Col>
                <div className='dashboard-saction-title'>Dalal Data</div>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <Input
                  name="search"
                  id="search"
                  type="text"
                  placeholder="Enter person name,phone numeber or company"
                  onChange={handleSearchDalalInput}
                  value={searchDalal}
                ></Input>
              </Col>
            </Row>
            <Table className="width-100 margin-top-10" striped>
              <thead>
                <tr>
                  <th style={{ width: '190px' }}>Name</th>
                  <th>Stock Id</th>
                  <th title="Total Weight">Weight</th>
                  <th title="Total diamond piece">TD Piece</th>
                  <th title='Total diamond price'>TD price</th>
                </tr>
              </thead>
              <tbody>
                {dalalData.length > 0 && dalalData.map(d => <tr>
                  <td>{d.name}</td>
                  <td>{d.stones}</td>
                  <td>{d.weight}</td>
                  <td>{d.totalStones}</td>
                  <td>{d.amount}</td>
                </tr>)}
                {dalalData.length === 0 && <td colSpan={5} className="text-align-center">No data available</td>}
              </tbody>
            </Table>
            {dalalData.length > 0 && <Pagination
              margin={2}
              page={pageDalal}
              pageSize={pageSizeDalal}
              totalRecords={totalDalals}
              onPageChange={handlePageChange}
            ></Pagination>}
          </CardBody>
        </Card>
      </Col>
      <Col sm="12" md="6">
        <Card className="width-100 margin-top-10">
          <CardBody>
            {isAccountSummaryLoading && <CustomSpinner></CustomSpinner>}
            <Row>
              <Col>
                <div className='dashboard-saction-title'>Account Summary</div>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <Input
                  name="search"
                  id="search"
                  type="text"
                  placeholder="Enter person name,phone numeber or company"
                  onChange={handleSearchAccountSummaryInput}
                  value={searchAccountSummary}
                ></Input>
              </Col>
            </Row>
            <Table className="width-100 margin-top-10">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Debit</th>
                  <th>Credit</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {accountSummaryData.map(d => <tr>
                  <td>{d.name}</td>
                  <td>{d.debit}</td>
                  <td>{d.credit}</td>
                  <td>{d.total}</td>
                </tr>)}
              </tbody>
            </Table>
            {<Pagination
              margin={2}
              page={pageAccountSummary}
              pageSize={pageSizeAccountSummary}
              totalRecords={totalAccountSummary}
              onPageChange={handleAccountSummaryPageChange}
            ></Pagination>}
          </CardBody>
        </Card>
      </Col>
    </Row>
  </div>
}

export default Dashboard;