import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export class Weather extends Component {
  render() {
    return this.props.weatherData.map((value) => {
      return (
        <>
          <ListGroup>
            <ListGroup.Item>{value.description}</ListGroup.Item>
            <ListGroup.Item>{value.date}</ListGroup.Item>
          </ListGroup>
        </>
      );
    });
  }
}

export default Weather;
