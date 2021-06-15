import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';

export class Alertm extends Component {
  render() {
    return (
      <div>
        <Alert variant="danger">This is a {this.props.errMss}</Alert>
      </div>
    );
  }
}

export default Alertm;
