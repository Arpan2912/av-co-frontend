import React, { Component } from 'react';
import {
  Spinner
} from 'reactstrap';

class CustomSpinner extends Component {
  render() {
    return <div className="spinner-middle-con">
      <Spinner className="spinner-middle" />
    </div>;
  }
}

export default CustomSpinner;