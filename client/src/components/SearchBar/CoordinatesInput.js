import React, {Component} from 'react';
import {Col, Container, Row, InputGroup, Input, InputGroupAddon, InputGroupText, Button} from 'reactstrap';

import Coordinates from "coordinate-parser";
import { latLng, map } from 'leaflet';
import Atlas from '../Atlas/Atlas';
import { LOG } from '../../utils/constants';

export default class CoordinatesInput extends Component {
  constructor(props) {
    super(props);
    
    this.processCoordinatesInput = this.processCoordinatesInput.bind(this);
    this.goToCoordinates = this.goToCoordinates.bind(this);
    this.setMarker = props.setMarker;
    this.state = {
      coordinatesInputText: "",
      convertedLatLng: null
    };
  }


  render() {
    return (
      <div>
        {this.renderCoordinatesInput()}

          <button onClick={this.goToCoordinates} className={"btn-block btn-primary"} >Go</button>

      </div>
    );
  }



  goToCoordinates(processsCoordinatesInput) {
    //place a marker
    const latLng = this.state.convertedLatLng; 
    if(latLng != null) {
      const geocodingFormatLatLng = {latlng: latLng};
      this.setMarker(geocodingFormatLatLng);
    }
  }
  
  

  renderResultText() {
    const latLng = this.state.convertedLatLng;
    if (latLng) {
      return (
        <h4 className="mt-4">
          Latitude: {latLng.lat}, Longitude: {latLng.lng}
        </h4>
      );
    }
  }


  renderCoordinatesInput() {
    const validCoordinates = this.state.convertedLatLng != null;
    const inputBoxEmpty = !this.state.coordinatesInputText;

    return (
        <div>
      <InputGroup className="mt-4">

        <InputGroupAddon addonType="prepend">
          <InputGroupText>Coordinates</InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder="Latitude, Longitude"
          onChange={this.processCoordinatesInput}
          value={this.state.coordinatesInputText}
          valid={validCoordinates}
          invalid={!inputBoxEmpty && !validCoordinates}
        />
        
      </InputGroup>
        </div>
    );
  }


  processCoordinatesInput(onChangeEvent) {
    const inputText = onChangeEvent.target.value;
    const latLng = this.getCoordinatesOrNull(inputText);
  
    this.setState({ coordinatesInputText: inputText, convertedLatLng: latLng });
  }

  getCoordinatesOrNull(coordinateString) {
    try {
      const convertedCoordinates = new Coordinates(coordinateString);
      return {
        lat: convertedCoordinates.getLatitude(),
        lng: convertedCoordinates.getLongitude()
      };
    } catch (error) {
      return null;
    }
  }
}

