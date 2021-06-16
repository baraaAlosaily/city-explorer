import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Alertm from './Component/Alert';
import Map from './Component/Map';
import axios from 'axios';
import Form from './Component/From';
import Weather from './Component/Weather';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorMassage: false,
      cityName: '',
      errMss: '',
      cityData: {},
      displayData: false,
      weatherData: '',
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
    const wetherUrl =
      // process.env.REACT_APP_URL ||
      'https://city-explorer-baraa2.herokuapp.com';
    try {
      let axiosResponse = await axios.get(url);
      const myAPiRes = await axios.get(`${wetherUrl}/weather`);
      console.log('myAPiRes', myAPiRes.data);
      // let WeatherData = await axios.get(`${process.env.REACT_APP_URL}/weather`);
      let data = axiosResponse.data[0];
      if (data) {
        this.setState({
          cityData: data,
          displayData: true,
          weatherData: myAPiRes.data,
          // weather: WeatherData.data,
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
        {this.state.showErrorMassage && <Alertm errMss={this.state.errMss} />}
        <Header />
        <Form
          getCitydata={this.getCitydata}
          updateCityName={this.updateCityName}
        />

        <div>
          {this.state.displayData && <Map cityData={this.state.cityData} />}
        </div>
        {this.state.displayData && (
          <Weather weatherData={this.state.weatherData} />
        )}
        <div>
          <Footer />;
        </div>
      </div>
    );
  }
}

export default App;
