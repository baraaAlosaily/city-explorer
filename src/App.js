import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Component/Header';
import Footer from './Component/Footer';
import axios from 'axios';
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorMassage: false,
      cityName: '',
      errMss: '',
      cityData: {},
      displayData: false,
    };
  }
  updateCityName = (e) => {
    this.setState({
      cityName: e.target.value,
    });
    console.log(this.state);
  };

  getCitydata = async (e) => {
    e.preventDefault();
    let url = `https://us1.locationiq.com/v1/search.php?key=pk.81a1dda2f438258981d046ccdc477a53&q=${this.state.cityName}&format=json`;
    try {
      let axiosResponse = await axios.get(url);
      let WeatherData = await axios.get(`${process.env.REACT_APP_URL}/weather`);
      let data = axiosResponse.data[0];
      if (data) {
        this.setState({
          cityData: data,
          displayData: true,
          weather: WeatherData.data,
        });
      }
    } catch (error) {
      this.setState({
        errMss: 'Error please enter correct value',
        displayData: false,
        showErrorMassage: true,
      });
      console.log(this.state.errMss);
    }
  };
  render() {
    return (
      <div>
        <Header />
        <Form onSubmit={this.getCitydata}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>City Name : </Form.Label>
            <Form.Control
              onChange={this.updateCityName}
              type="text"
              placeholder="Enter City"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explor!
          </Button>
        </Form>
        {this.state.displayData && (
          <div>
            {' '}
            <h2>City Name: {this.state.cityData.display_name}</h2>
            <text>Lat :{this.state.cityData.lat}</text>
            <br></br>
            <text>Lat :{this.state.cityData.lon}</text>
            <br></br>
            <br></br>
            <img
              src={`https://maps.locationiq.com/v3/staticmap?key=pk.d36871f015649f915282f374cff76628&q&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=1-18`}
              alt=""
            />
            <p>Des: ${this.state.weather.description}</p>
            <p>Date: ${this.state.weather.date}</p>
          </div>
        )}
        {this.state.showErrorMassage && (
          <>
            <h3>Error:{this.state.errMss}</h3>
          </>
        )}
        <div>
          <Footer />;
        </div>
      </div>
    );
  }
}

export default App;
