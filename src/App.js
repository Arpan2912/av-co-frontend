import React, { Fragment, Component } from 'react';
import { HashRouter as Router, NavLink } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import Routes from './router/routes';
import { updateCompanyDetail } from './actions/header-action';
import StorageService from './services/StorageService';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    updateHeader: 'login',
    companyDetail: null
  }

  componentDidMount() {
    const companyDetail = StorageService.getCompanyDetail();
    this.props.updateCompanyDetail(companyDetail);
  }

  componentWillReceiveProps(nextProps) {
    console.log("header props", nextProps);
    const headerReducer = nextProps.headerReducer;
    const updateHeader = headerReducer && headerReducer.header ? headerReducer.header : 'login';
    const companyDetail = headerReducer && headerReducer.companyDetail ? headerReducer.companyDetail : null;
    this.setState({ updateHeader: updateHeader, companyDetail });
  }

  logoutFromCompany = () => {
    StorageService.removeCompanyDetail();
    this.props.updateCompanyDetail(null);
  }

  render() {
    const { updateHeader, companyDetail } = this.state;
    console.log("updateHeader", updateHeader);
    console.log("companyDetail", companyDetail);
    const token = StorageService.getToken();
    return (
      <div>
        <Router>

          {/* <header className="App-header">
        </header> */}
          <header style={{ height: '50px' }}>
            <Row>
              <Col sm="4" style={{ lineHeight: '67px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '20px', paddingLeft: '20px' }}>AV&Co.</span>
                {companyDetail && <span
                  style={{ fontSize: '20px', paddingLeft: '20px', cursor: 'pointer' }}
                  onClick={this.logoutFromCompany}
                >
                  Logout From {companyDetail.company_name}
                </span>}
              </Col>
              {token && <Fragment>
                <Col sm="6" className="text-align-right">
                  {companyDetail && <>
                    <NavLink exact activeClassName="active" className="nav-link" to="/dashboard">Dashboard</NavLink>
                    <NavLink exact activeClassName="active" className="nav-link" to="/contact">Contact</NavLink>
                    <NavLink exact activeClassName="active" className="nav-link" to="/stocks">Stock</NavLink>
                    <NavLink exact activeClassName="active" className="nav-link" to="/transactions">Transactions</NavLink>
                  </>}
                </Col>
                <Col sm="2" className="text-align-right">
                  <NavLink exact activeClassName="active" className="nav-link" to="/logout">Logout</NavLink>

                </Col>
              </Fragment>}
            </Row>
          </header>
          <hr />

          <Routes />
        </Router>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  headerReducer: state.headerReducer
})
export default connect(mapStateToProps, { updateCompanyDetail })(App);


