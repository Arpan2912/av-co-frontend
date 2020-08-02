import React, { Component } from 'react';
import { connect } from 'react-redux';


import { updateHeaderMenus } from '../../actions/header-action';
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