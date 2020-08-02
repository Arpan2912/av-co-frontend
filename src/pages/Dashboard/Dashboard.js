import React, { Component } from 'react';
import { Card, CardBody, Row, Col,Input, Table } from 'reactstrap';
import Ionicon from 'react-ionicons';

import Pagination from '../../components/Pagination/Pagination';

import OpeningBalanceService from '../../services/OpeningBalanceService';
import TransactionService from '../../services/TransactionService';
import DashboardService from '../../services/DashboardService';

import AddStock from '../../modal/AddStock';
import AddOpeningBalance from '../../modal/AddOpeningBalance';
import AddTransaction from '../../modal/AddTransaction';

class Dashboard extends Component {
  state = {
    isAddOpeningBalanceModalOpen: false,
    isAddOpeningBalanceButtonVisible:false,
    openingBalanceData:{},
    selectedOpeningBalanceToUpdate: null,
    closingBalanceData:{},
    dalalData: [],
    searchDalal: null,
    pageDalal: 1,
    pageSizeDalal: 10,
    totalDalals:0,
    pageAccountSummary: 1,
    pageSizeAccountSummary: 10,
    totalAccountSummary:0,
    searchAccountSummary: null,
    accountSummaryData:[],
    isAddStockModalOpen:false,
    isAddTransactionModalOpen: false,
  }

  componentDidMount(){
    this.getTodayOpeningBalance();
    this.getTodayCloseAmount();
    this.getStockAndAmtWithDalal();
    this.getAccountSummary();
  }

  openAddOpeningBalanceModal = (OpeningBalanceData) => {
    this.setState({ isAddOpeningBalanceModalOpen: true, selectedOpeningBalanceToUpdate:OpeningBalanceData });
  }
  
  closeAddOpeningBalanceModal = (reload) => {
    this.setState({ isAddOpeningBalanceModalOpen: false,selectedOpeningBalanceToUpdate:null });
    if (reload) {
        this.getTodayOpeningBalance();
    }
  }

  getTodayOpeningBalance = () => {
    OpeningBalanceService.getTodayOpeningBalance()
      .then(data=>{
        if(data.data.data){
          this.setState({openingBalanceData: data.data.data });
        } else {
          this.setState({ isAddOpeningBalanceButtonVisible:true });
        }
        console.error("data",data);
      })
      .catch(e=>{
        console.error("e",e);
      })
  }

  getTodayCloseAmount = () => {
    TransactionService.getCloseAmountToday()
    .then(data=>{
      if(data.data.data){
        this.setState({ closingBalanceData: data.data.data });
      }
    })
    .catch(e=>{

    })
  }

  getStockAndAmtWithDalal = () => {
    const { pageDalal, pageSizeDalal, searchDalal }=this.state;
    const obj={
      page: pageDalal,
      limit: pageSizeDalal,
      search: searchDalal
    }
    DashboardService.getStockAndAmtWithDalal(obj)
    .then(data=>{
      if(data.data.data && data.data.data.data){
        this.setState({ dalalData: data.data.data.data });
      }
      if(data.data.data && data.data.data.count){
        this.setState({ totalDalals: data.data.data.count });
      }
    })
    .catch(e=>{

    })
  }

  getAccountSummary = () => {
    const { pageAccountSummary, pageSizeAccountSummary, searchAccountSummary }=this.state;
    const obj={
      page: pageAccountSummary,
      limit: pageSizeAccountSummary,
      search: searchAccountSummary
    }
    DashboardService.getAccountSummary(obj)
    .then(data=>{
      if(data.data.data && data.data.data.data){
        this.setState({ accountSummaryData: data.data.data.data });
      }
      if(data.data.data && data.data.data.count){
        this.setState({ totalAccountSummary: data.data.data.count });
      }
    })
    .catch(e=>{

    })
  }

  handleSearchDalalInput = (e) => {
    const value = e.target.value;
    this.setState({ pageDalal:1, searchDalal: value },()=>{;
      this.getStockAndAmtWithDalal();
    })
  }

  handlePageChange = (page) => {
    this.setState({ pageDalal: page },()=>{
      this.getStockAndAmtWithDalal();
    });
  }

  handleSearchAccountSummaryInput = (e) => {
    const value = e.target.value;
    this.setState({ pageAccountSummary:1, searchAccountSummary: value },()=>{;
      this.getAccountSummary();
    })
  }

  handleAccountSummaryPageChange = (page) => {
    this.setState({ pageAccountSummary: page },()=>{
      this.getAccountSummary();
    });
  }

  openAddStockModal = (stockData) => {
    this.setState({ isAddStockModalOpen: true, selectedStockToUpdate: stockData });
  }
  
  closeAddStockModal = (reload) => {
    console.log("closing modal");
    this.setState({ isAddStockModalOpen: false, selectedStockToUpdate: null });
    // if (reload) {
    //     this.getStocks(this.state.page);
    // }
  }

  openAddTransactionModal = (contactData) => {
    this.setState({ isAddTransactionModalOpen: true, selectedTransactionToUpdate: contactData });
  }

  closeAddTransactionModal = (reload) => {
    console.log("closing modal");
    this.setState({ isAddTransactionModalOpen: false, selectedTransactionToUpdate: null });
    // if (reload) {
    //     this.getTransactions();
    // }
  }

  
  render(){
    const { 
      isAddOpeningBalanceModalOpen,isAddOpeningBalanceButtonVisible,
      openingBalanceData ={}, selectedOpeningBalanceToUpdate,
      closingBalanceData={}, dalalData=[], searchDalal, pageDalal, pageSizeDalal, searchAccountSummary,
      totalDalals, accountSummaryData, pageAccountSummary, pageSizeAccountSummary, totalAccountSummary,
      isAddStockModalOpen, isAddTransactionModalOpen
    } = this.state;
    const { amount, uuid } = openingBalanceData;
    const { total, openingBalance } = closingBalanceData;
    return <div>
      {
        isAddOpeningBalanceModalOpen &&
        <AddOpeningBalance
          show={isAddOpeningBalanceModalOpen}
          closeModal={this.closeAddOpeningBalanceModal}
          openingBalanceData={selectedOpeningBalanceToUpdate}
        >
        </AddOpeningBalance>
      }

      {isAddStockModalOpen &&
        <AddStock
            show={isAddStockModalOpen}
            closeModal={this.closeAddStockModal}
            // stockData={selectedStockToUpdate}
          >
        </AddStock>
      }

      {isAddTransactionModalOpen &&
        <AddTransaction
            show={isAddTransactionModalOpen}
            closeModal={this.closeAddTransactionModal}
            // transactionData={selectedTransactionToUpdate}
          >
        </AddTransaction>
      }
       <Row>
        <Col sm="3">
          <Card>
            <CardBody>
              {!isAddOpeningBalanceButtonVisible &&
              <>
                
                <Row>
                  <Col sm="10">Opening Balance : {amount}</Col>
                  <Col className="text-align-right">
                    <div onClick={this.openAddOpeningBalanceModal.bind(this,openingBalanceData)}>
                    <Ionicon icon="md-create" fontSize="16px" color="#fdbb1f" />
                </div>
                  </Col>
                </Row>
                <div> </div>
              </>}

              {isAddOpeningBalanceButtonVisible &&
              <>
                <div onClick={this.openAddOpeningBalanceModal.bind(this,null)}>Add Opening Balance</div>
              </>}
            </CardBody>
          </Card>
        </Col>
        <Col sm="3">
          <Card>
            <CardBody>
              {/* <div>Opening Balance : {openingBalance}</div> */}
              <div>Current Balance : {total}</div>
            </CardBody>
          </Card>
        </Col>
        <Col sm="6" className="text-align-right">
          {/* <Card>
            <CardBody> */}
              {/* <div>Opening Balance : {openingBalance}</div> */}
              <button onClick={this.openAddStockModal.bind(this,null)}>Add Stock</button>&nbsp;
              <button onClick={this.openAddTransactionModal.bind(this,null)}>Add Transaction</button>

            {/* </CardBody>
          </Card> */}
        </Col>
      </Row>
      <Row>
        <Col sm="6">
          <Card className="width-100 margin-top-10">
            <CardBody>
            <Row>
              <Col>
                <h4>Dalal Data</h4>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <Input
                  name="search"
                  id="search"
                  type="text"
                  placeholder="Enter person name,phone numeber or company"
                  onChange={this.handleSearchDalalInput}
                  value={searchDalal}
                ></Input>
              </Col>
            </Row>
              <Table className="width-100 margin-top-10">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Total Stones</th>
                    <th>Stones</th>
                  </tr>
                </thead>
                <tbody>
                  {dalalData.map(d=><tr>
                    <td>{d.name}</td>
                    <td>{d.amount}</td>
                    <td>{d.totalStones}</td>
                    <td>{d.stones}</td>
                  </tr>)}
                </tbody>
              </Table>
              {<Pagination
                  margin={2}
                  page={pageDalal}
                  pageSize={pageSizeDalal}
                  totalRecords={totalDalals}
                  onPageChange={this.handlePageChange}
              ></Pagination>}
            </CardBody>
          </Card>
        </Col>
        <Col sm="6">
          <Card className="width-100 margin-top-10">
            <CardBody>
            <Row>
              <Col>
                <h4>Account Summary</h4>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <Input
                  name="search"
                  id="search"
                  type="text"
                  placeholder="Enter person name,phone numeber or company"
                  onChange={this.handleSearchAccountSummaryInput}
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
                  {accountSummaryData.map(d=><tr>
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
                  onPageChange={this.handleAccountSummaryPageChange}
              ></Pagination>}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  }
}

export default Dashboard;