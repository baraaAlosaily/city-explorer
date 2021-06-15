import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export class myFrom extends Component {
  render() {
    return (
      <div>
        <Form onSubmit={this.props.getCitydata}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>City Name : </Form.Label>
            <Form.Control
              onChange={this.props.updateCityName}
              type="text"
              placeholder="Enter City"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explor!
          </Button>
        </Form>
      </div>
    );
  }
}

export default myFrom;
