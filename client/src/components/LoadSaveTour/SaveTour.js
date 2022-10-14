import React, {Component} from 'react';
import { Button, Container, Row, Col } from "reactstrap";

export default class SaveTour extends Component {
  constructor(props) {
    super(props);
    this.onDownloadCSVPressed = this.onDownloadCSVPressed.bind(this);


    this.state = {
      earthRadius: 6371.0,
      places: this.props.places,
      distances: []
    };
  }

  render() {
    //console.log(this.props.places);
    return (
        <Button 
          color="success" onClick={() => { this.onDownloadCSVPressed();}} >Save CSV
        </Button>
        
    );
  }



  onDownloadCSVPressed() {
    downloadFile(this.buildTripTextCSV(), "trip.csv", "text/csv");
  }


  buildTripTextCSV() {
    let csvTripText = "";
    
    const KEYS = ["earthRadius", "distances", "latitude", 
                  "longitude", "name"];
    csvTripText += KEYS.map(key => `"${key}"`).join(",") + "\n";
      
    for (let i = 0; i < this.props.places.length; i++) {
      csvTripText += this.getRowTextCSV(this.props.places[i], i) + "\n";
    }
    return csvTripText;
  }


  getRowTextCSV(place, placeIndex) {
    const earthRadius = this.state.earthRadius;
    const distance = this.state.distances[placeIndex];
    
    const placeValues = [earthRadius, distance, place.latlng.lat, place.latlng.lng, place.address]; 
    
    return placeValues.map(value => `"${value}"`).join(",");
  }



}

function downloadFile(fileText, fileName, fileType) {
  let file = new Blob([fileText], {type: fileType});
  let a = document.createElement('a'),
  url = URL.createObjectURL(file);
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}
