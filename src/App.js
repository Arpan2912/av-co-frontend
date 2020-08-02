import React, { Fragment, Component } from 'react';
import { HashRouter as Router, NavLink } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import Routes from './router/routes';

import StorageService from './services/StorageService';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    updateHeader: 'login'
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    const updateHeader = nextProps.headerReducer && nextProps.headerReducer.header ? nextProps.headerReducer.header : 'login';
    this.setState({ updateHeader: updateHeader });
  }

  render() {
    const { updateHeader } = this.state;
    console.log("updateHeader", updateHeader);
    const token = StorageService.getToken();
    return (
      <div>
        <Router>

          {/* <header className="App-header">
        </header> */}
          <header style={{ height: '50px' }}>
            <Row>
              <Col sm="2" style={{ lineHeight: '67px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '20px', paddingLeft: '20px' }}>AV&Co.</span>
              </Col>
              {token && <Fragment>
                <Col sm="8" className="text-align-right">
                  <NavLink exact activeClassName="active" className="nav-link" to="/dashboard">Dashboard</NavLink>
                  <NavLink exact activeClassName="active" className="nav-link" to="/contact">Contact</NavLink>
                  <NavLink exact activeClassName="active" className="nav-link" to="/stocks">Stock</NavLink>
                  <NavLink exact activeClassName="active" className="nav-link" to="/transactions">Transactions</NavLink>
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

export default connect(mapStateToProps)(App);


