import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Container, ContentContainer, Input, InputContainer, ResultsContainer, SubmitButton, TextPart } from './styled';
import { WeatherInterface } from './interfaces/weather.interface';
const parseString = require('xml2js').parseString;

function App() {

  const [weatherData, setWeatherData] = useState<WeatherInterface>()
  const api_key = "495dd1e62d6eba6a503427dddd78ac1b";

  async function handleRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.currentTarget;
    const submitter = (event.nativeEvent as any).submitter.name
    
    try {
      if(submitter === 'search') {
        const requestWeather = await axios({
          'url': `https://api.openweathermap.org/data/2.5/weather?q=${target.city.value}&appid=${api_key}&units=metric&mode=xml`,
        })
        console.log(requestWeather);
        parseString(requestWeather.data, {explicitArray: false, attrkey: 'data'}, (err: any, result: WeatherInterface) => {
          setWeatherData(result);
        })
        
      } else if(submitter === 'search_server') {
        const requestWeatherFromServer = await fetch('http://localhost:3001/api/get/weather', {
          method: 'POST',
          body: JSON.stringify({ city: target.city.value }),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        console.log(requestWeatherFromServer);
      }

    } catch(e) {
      console.log('Request failed', e)
    }
  }


  return (
    <div className="App">
      <Container>
        <ContentContainer>
          <InputContainer style={{justifyContent:"space-between"}} onSubmit={(event) => handleRequest(event)}>
            <Input name="city"/>
            <SubmitButton name="search"> Search </SubmitButton>
            <SubmitButton name="search_server"> Search with server </SubmitButton>
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
