import axios from 'axios';
import React, { SyntheticEvent, useCallback, useState } from 'react';
import { Container, ContentContainer, Input, InputContainer, ResultsContainer, SubmitButton, TextPart } from './styled';
import { WeatherInterface } from './interfaces/weather.interface';

const parseString = require('xml2js').parseString;

function App() {
  const [weatherData, setWeatherData] = useState<WeatherInterface>()
  const api_key = "495dd1e62d6eba6a503427dddd78ac1b";

  async function handleRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.currentTarget;
    
    try {
      const requestWeather = await axios({
        url: `https://wft7rw41de.execute-api.us-east-1.amazonaws.com/default/getCurrentWeather?cityName=${target.city.value}`,
      })
      console.log(requestWeather.data);
    } catch(e) {
      console.log(' Request error: ' + e)
    }
  }


  return (
    <div className="App">
      <Container>
        <ContentContainer>
          <InputContainer style={{justifyContent:"space-between"}} onSubmit={(event) => handleRequest(event)}>
            <Input name="city"/>
            <SubmitButton name="search"> Search </SubmitButton>
          </InputContainer>

          <b> Results for City Name: </b>

          <ResultsContainer> 
            <TextPart> Temperature: {weatherData?.current.temperature.data.value} &deg;C</TextPart>
            <TextPart> Weather conditions: {weatherData?.current.weather.data.value} </TextPart>
            <br/>
            <TextPart> Wind: {weatherData?.current.wind.speed.data.value} {weatherData?.current.wind.speed.data.unit}</TextPart>
            <TextPart> Wind direction: {weatherData?.current.wind.direction.data.code} ({weatherData?.current.wind.direction.data.name}) </TextPart>
            <TextPart> Pressure: {weatherData?.current.pressure.data.value} {weatherData?.current.pressure.data.unit}</TextPart>
            <TextPart> Humidity: {weatherData?.current.humidity.data.value}%</TextPart>
          </ResultsContainer>
        </ContentContainer>
      </Container>
    </div>
  );
}

export default App;
