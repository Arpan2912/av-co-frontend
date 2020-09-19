import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Table, Input,Label } from 'reactstrap';
import Ionicon from 'react-ionicons';
import Pagination from '../../components/Pagination/Pagination';

import StockService from '../../services/StockService';
import ModalService from '../../services/ModalService';

import AddStock from '../../modal/AddStock';
import {downlodFile,formatDate, showErrorMsg} from '../../utils';

import './Stocks.css';

const pageSize = 10;

let statusDropDownOptions = [
    {
        key:'All',
        value:'all'
    },
    {
      key:'Current Stock',
      value:'current-stock'
    },
    {
      key:'Jangad',
      value:'jangad'
    },
    {
      key:'Sold',
      value:'sold'
    }
]

class Stocks extends Component {
    state = {
      stocks: [],
      downloadExcelFields:['all'],
      selectedStockToUpdate: null,
      isAddContactModalOpen: false,
      isAddStockModalOpen: false,
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
      selectedStatus:'all'
    }

    componentDidMount() {
        this.getStocks(this.state.page);
    }

    handleInputChange = (e) => {
        const controlName = e.target.name;
        const controlValue = e.target.value;
        console.log("controlName",)
        let stateValue = controlValue;
        let obj = {
            page:1
        };
        obj[controlName]=stateValue;
        console.log("obj",obj);
        this.setState(obj,()=>{
            this.getStocks()
        });
        // this.handleValidation();
      }
    

    getStocks = (page, search,isDownload) => {
        let { controls, selectedStatus  }=this.state;
        let {downloadCheckbox}=controls;
        let body={
            downloadExcelFields:downloadCheckbox.value
        }
        StockService.getStocks(page, pageSize, search,isDownload,body,selectedStatus)
            .then(data => {
                console.log(data.data);
                if(isDownload){
                    if(data.data.data && data.data.data.file){
                        downlodFile(data.data.data.file);
                    }
                } else {
                    const stocks = data.data.data.stocks;
                    const totalRecords = data.data.data.count;
                    this.setState({ stocks, totalRecords });
                }      
            })
            .catch(e => {
                
            })
    }

    openAddStockModal = (stockData) => {
        this.setState({ isAddStockModalOpen: true, selectedStockToUpdate: stockData });
    }
    closeAddStockModal = (reload) => {
        console.log("closing modal");
        this.setState({ isAddStockModalOpen: false, selectedStockToUpdate: null });
        if(reload) {
            this.getStocks(this.state.page);
        }
    }

    deleteStock = (uuid) => {
        StockService.deleteStock(uuid)
            .then(data=>{
                this.setState({page:1},()=>{
                    this.getStocks(1,this.state.search);
                })
            })
            .catch(e=>{
                showErrorMsg('',e);
            })
    }

    handlePageChange = (page) => {
        this.setState({ page: page });
        this.getStocks(page, this.state.search);
        // this.getAllDealerReport(page, null, false, uuid);
    }

    handleSearchInput = (e) => {
        const value = e.target.value;
        this.setState({ search: value });
        this.searchContactData(value);
    }

    searchContactData = (search) => {
        this.setState({ page: 1 });
        this.getStocks(1, search);
    }

    downloadExcel=()=>{
        this.getStocks(this.state.page,this.state.search,true);
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
        const { stocks, selectedStockToUpdate, isAddContactModalOpen,
             page, totalRecords, search,controls,
             isAddStockModalOpen,selectedStatus
            } = this.state;
        const { downloadCheckbox }=controls;
        const prepareRows = stocks.map(s => <tr>
            <td>{s.stock_id}</td>
            <td>{s.status}</td>
            <td>{s.weight}</td>
            <td>{s.buy_person_name}</td>
            <td>
                <div>{formatDate(s.buy_date)}</div>
            </td>
            <td>{s.buy_price}</td>
            <td>{s.sell_person_name}</td>
            <td>{s.sell_date && formatDate(s.sell_date)}</td>
            <td>{s.sell_price}</td>
            <td>
              <Ionicon onClick={this.openAddStockModal.bind(this, s)} icon="md-create" fontSize="16px" color="#fdbb1f" />&nbsp;
              {!(s.sell_person_name || s.sell_date || s.sell_price) && <Ionicon onClick={this.deleteStock.bind(this, s.uuid)} icon="md-trash" fontSize="16px" color="#fdbb1f" />}
            </td>
        </tr>)
        return (
            <div id="contact">
                {/* {isAddContactModalOpen &&
                    <AddContact
                        show={isAddContactModalOpen}
                        closeModal={this.closeAddContactModal}
                        contactData={selectedContactToUpdate}>
                    </AddContact>} */}

                {isAddStockModalOpen &&
                    <AddStock
                        show={isAddStockModalOpen}
                        closeModal={this.closeAddStockModal}
                        stockData={selectedStockToUpdate}>
                    </AddStock>}

                <Row>
                    <Col xl="10">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col sm="3">
                                    <Label for="status">Search</Label>
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
                                        <Label for="status">Status</Label>
                                        <select name="selectedStatus" onChange={this.handleInputChange} value={selectedStatus}>
                                            {statusDropDownOptions.map(s=><option value={s.value}>{s.key}</option>)}
                                        </select>
                                    </Col>
                                    <Col className="text-align-right">
                                    <span className="download-link" onClick={this.openAddStockModal.bind(this, null)}>Add Stock</span>&nbsp;&nbsp;
                                        {/* <span className="download-link" onClick={this.openUploadContactModal}>Upload Contact</span> */}
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
                                            <th>Sell Contact</th>
                                            <th>Sell Date</th>
                                            <th>Sell Price</th>
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

export default Stocks;