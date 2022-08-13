import React, { Fragment, Component, useState, useEffect } from 'react';
import { HashRouter as Router, NavLink, useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import Routes from './router/routes';
import { updateCompanyDetail, updateHeaderMenus } from './redux-slices/header-slice';
// import { updateCompanyDetail, updateHeaderMenus } from './actions/header-action';
import StorageService from './services/StorageService';
import logo from './logo.svg';
import './App.scss';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headersReducer = useSelector(state => state)
  console.log("headersReducer", headersReducer)

  const headerReducer = useSelector(state => state.headerReducer)
  const { header: updateHeader, companyDetail } = headerReducer
  // const [updateHeader, setUpdateHeader] = useState('login');
  // const [companyDetail, setCompanyDetail] = useState(null);
  const token = StorageService.getToken();

  useEffect(() => {
    const companyDetail = StorageService.getCompanyDetail();
    dispatch(updateCompanyDetail(companyDetail));
  }, [])

  // componentWillReceiveProps(nextProps) {
  //   console.log("header props", nextProps);
  //   const headerReducer = nextProps.headerReducer;
  //   const updateHeader = headerReducer && headerReducer.header ? headerReducer.header : 'login';
  //   const companyDetail = headerReducer && headerReducer.companyDetail ? headerReducer.companyDetail : null;
  //   this.setState({ updateHeader: updateHeader, companyDetail });
  // }

  const logoutFromCompany = () => {
    StorageService.removeCompanyDetail();
    dispatch(updateCompanyDetail(null));
    navigate("/company")
  }

  const logout = () => {
    StorageService.removeToken();
    StorageService.removeCompanyDetail();
    dispatch(updateHeaderMenus("logout"));
    dispatch(updateCompanyDetail(null));
    navigate("/")
    // this.props.history.push("/");
  }
  // render() {
  // const { updateHeader, companyDetail } = this.state;
  // console.log("updateHeader", updateHeader);
  // console.log("companyDetail", companyDetail);
  return (
    <div>
      {/* <Router> */}

      {/* <header className="App-header">
        </header> */}
      {/* <header style={{ height: '50px' }}> */}
      <Row className='header'>
        <Col sm="4" style={{ lineHeight: '67px' }}>
          <span className='logo-title'>AV&Co.</span>
          {companyDetail && <span
            className='company-header-text'
            onClick={logoutFromCompany}
          >
            Logout From <span className='company-header-title'>{companyDetail.company_name}</span>
          </span>}
        </Col>
        {token && <Fragment>
          <Col sm="7" className="text-align-right">
            {companyDetail && <>
              <NavLink exact activeClassName="active" className="nav-link" to="/dashboard">Dashboard</NavLink>
              <NavLink exact activeClassName="active" className="nav-link" to="/contact">Contact</NavLink>
              <NavLink exact activeClassName="active" className="nav-link" to="/stocks">Stock</NavLink>
              <NavLink exact activeClassName="active" className="nav-link" to="/transactions">Transactions</NavLink>
            </>}
          </Col>
          <Col sm="1" className="text-align-right logout-button-container">
            <Button className='logout-button' onClick={() => logout()}>Logout</Button>
            {/* <NavLink exact activeClassName="active" className="nav-link" to="/logout">Logout</NavLink> */}

          </Col>
        </Fragment>}
      </Row>
      {/* </header> */}
      {/* <hr /> */}

      <Routes />
      {/* </Router> */}
    </div>
  )
}
// }
export default App;


