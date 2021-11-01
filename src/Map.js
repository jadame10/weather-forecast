import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {Button} from 'react-bootstrap';

const containerStyle = {
  width: '350px',
  height: '200px'
};

const center = {
  lat: 51.33624163875445,
  lng: 17.385465520639958
};



  export const Map = (loc) => {

  const [location, setLocation] = useState({'lat': 0, 'lng': 0});

  const handleClickMap = (event) => {
    let lat = event.latLng.lat(); 
    let lng = event.latLng.lng();
    setLocation({'lat': lat, 'lng': lng});
    
    };
      
  return(
    <>
    <Button className = 'btn btn-success btn-lg' onClick = {() => loc.setLocation(location)}>Pobierz lokację</Button>
    <br /><br />
    <LoadScript
    googleMapsApiKey="AIzaSyAoQz4xJLx4VGozG5IQ0A1wbOnYxBwNGXY"
  >
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
      onClick={(e) => handleClickMap(e)}
    >
        <Marker
            position={location}
        />
  <></>
        </GoogleMap>
      </LoadScript>
        </>
  );
 
  };

export default React.memo(Map);