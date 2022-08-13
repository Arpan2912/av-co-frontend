import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateHeaderMenus } from '../../redux-slices/header-slice';
import StorageService from '../../services/StorageService';

import './Logout.css';



class Logout extends Component {
    state = {

    }

    componentDidMount() {
        this.logout();
        // this.getPerson();
    }

    logout = () => {
        StorageService.removeToken();
        StorageService.removeCompanyDetail();
        this.props.updateHeaderMenus("logout");
        this.props.history.push("/");
    }

    render() {

        return (
            <div id="login">


            </div>
        );
    }
}

export default connect(null, { updateHeaderMenus })(Logout);