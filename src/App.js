import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Col, Row, Button, Table} from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';
import {Map} from './Map';
import {SunCloud} from './Suncloud';
import {Sun} from './Sun';
import {Cloud} from './Cloud';
import {Mostly} from './Mostly';
import {Cloudy} from './Cloudy';
import {Drizzle} from './Drizzle';
import {LightRain} from './LightRain';
import {Rain} from './Rain';
import {Fog} from './Fog';
import {LightFog} from './LightFog';
import {HeavyRain} from './HeavyRain';
import {Snow} from './Snow';


const App = () => {

const [location, setLocation] = useState({'lat': 0, 'lng': 0});
const [result, setResult] = useState('');
const [date, setDate] = useState('data');
const [loc, setLoc] = useState({'lat': 0, 'lng': 0});

 const getData = () => {
    axios({
      method: "get",
     url: `https://api.tomorrow.io/v4/timelines?location=${location.lat}, ${location.lng}&fields=temperature&fields=weatherCode&fields=windSpeed&fields=windDirection&&apikey=XaGHP00wfLQvoQ5e6QD3DX4XDUQKtk8j`
      //url: './db.json'
    })
      .then((response) => {
        console.log(response);
        setResult(response);
      })
      .catch((error) => {
        console.log(error);
      });
     
    }

    const onChange2 = (e) =>{
      setDate(e.target.value);
  }
 const onReceive = (loc) => {
  console.log(loc);
 }
  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs = {12} md ={4}>
         
            <div>{location.lat}</div>
            <div>{location.lng}</div>
          <br />
          <label>Wybierz dzień</label><br />
          <input type = 'date' name = 'date0' className = 'chooseDate' onChange = {onChange2} />  <br /><br />
          <Map setLocation = {setLocation} /> <br /><br />
          <Button className = 'btn btn-success btn-lg' onClick = {getData}>Pobierz dane pogodowe</Button>
          </Col>
          <Col xs={12} md ={8}>
          <Table>
            <thead>
               <tr>
                 <th>
                   godzina
                 </th>
                 <th>
                   pogoda
                </th>
                 <th>
                   temperatura
                 </th>
                 <th>
                   kierunek wiatru
                 </th>
                 <th>
                   prędkość wiatru
                 </th>
                 </tr>   
           </thead>
            <tbody>
          { result && date && location ?
            result.data.data.timelines[0].intervals.filter((item) => item.startTime.split('T')[0] === date).map((item, i)=>(
            <tr key = {i}>
              <td> {item.startTime.split('T')[1].split('Z')}</td>
              <td>
              {item.values.weatherCode === 1100 ? <SunCloud />
              : item.values.weatherCode === 1000  ? <Sun />
              : item.values.weatherCode === 1102  ? <Cloud />
              : item.values.weatherCode === 1101  ? <Mostly />
              : item.values.weatherCode === 1001  ? <Cloudy />
              : item.values.weatherCode === 4000  ? <Drizzle />
              : item.values.weatherCode === 4200  ? <LightRain />
              : item.values.weatherCode === 4001  ? <Rain />
              : item.values.weatherCode === 2000  ? <Fog />
              : item.values.weatherCode === 2001  ? <LightFog />
              : item.values.weatherCode === 4201  ? <HeavyRain />
              : item.values.weatherCode === 5000  ? <Snow />
              : item.values.weatherCode}
              </td>
            
               <td>{item.values.temperature} C </td>
               <td>
               {item.values.windDirection > 337.5 || item.values.windDirection <=22.5 ? 'N'
            : item.values.windDirection > 22.5 && item.values.windDirection <= 67.5 ? 'NE'
            : item.values.windDirection > 67.5 && item.values.windDirection <= 135 ? 'E'
            : item.values.windDirection > 135 && item.values.windDirection <= 157.5 ? 'SE'
            : item.values.windDirection > 157.5 && item.values.windDirection <= 202.5 ? 'S'
            : item.values.windDirection > 202.5 && item.values.windDirection <= 247.5 ? 'SW'
            : item.values.windDirection > 247.5 && item.values.windDirection <= 292.5 ? "W"
            : item.values.windDirection > 292.5 && item.values.windDirection <= 337.5 ? "NW"
            : 'none'}
                </td>
                <td>
                {item.values.windSpeed} m/s
                </td>
             </tr>
          
            )): null}
            </tbody>
            </Table>
          </Col>
        </Row>
     
        </Container>
    </div>
  );
}

export default App;
