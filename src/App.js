import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Alertm from './Component/Alert';
import Map from './Component/Map';
import axios from 'axios';
import Form from './Component/From';
import Weather from './Component/Weather';
import Movies from './Component/Movies';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorMassage: false,
      cityName: '',
      errMss: '',
      cityData: {},
      displayData: false,
      weatherData: [],
      lat: '',
      lon: '',
      movies: [],
    };
  }
  updateCityName = (e) => {
    this.setState({
      cityName: e.target.value,
    });
  };

  getCitydata = async (e) => {
    e.preventDefault();

    await axios
      .get(
        `https://us1.locationiq.com/v1/search.php?key=pk.81a1dda2f438258981d046ccdc477a53&q=${this.state.cityName}&format=json`
      )
      .then((response) => {
        this.setState({
          cityData: response.data[0],
          displayData: true,
          showErrorMassage: false,
        });
      })
      .catch((error) => {
        this.setState({
          showErrorMassage: true,
          displayData: false,
          errMss: error.message,
        });
      });
    await axios
      .get(
        `http://localhost:8080/weather?lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`
      )
      .then((response) => {
        this.setState({
          weatherData: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          showErrorMassage: true,
          displayData: false,
          errMss: error.message,
        });
      });
    await axios
      .get(`http://localhost:8080/movies?query=${this.state.cityName}`)
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          showError: true,
          errorMessage: error.message,
        });
      });
  };

  setShowerror = () => {
    this.setState({
      showErrorMassage: false,
    });
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
          <div>
            {this.state.weatherData.map((item) => (
              <Weather date={item.date} description={item.description} />
            ))}
          </div>
        )}
        <div>
          {this.state.displayData && (
            <div>
              {this.state.movies.map((item) => (
                <Movies
                  title={item.title}
                  overview={item.overview}
                  image_url={item.image_url}
                  released_on={item.released_on}
                  popularity={item.popularity}
                  average_votes={item.average_votes}
                  total_votes={item.total_votes}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <Footer />;
        </div>
      </div>
    );
  }
}

export default App;
