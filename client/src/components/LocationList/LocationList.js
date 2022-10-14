import React, {Component} from 'react';
import {Button, Col, Container, Row, Table, Collapse,
    InputGroup,
    Input,
    } from "reactstrap";
import {getOriginalServerPort, isJsonResponseValid, sendServerRequest} from "../../utils/restfulAPI";

const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";
import SaveTour from "../LoadSaveTour/SaveTour";


export default class LocationList extends Component {
    constructor(props) {
        super(props);

        if (this.props.clearList) {
            this.clearList = this.props.clearList;
        }
        if (this.props.removeClickedLocation) {
            this.removeClickedLocation = this.props.removeClickedLocation;
        }
        if (this.props.address) {
            this.address = this.props.address;
        } else {

            this.address = "Blank";
        }
        if (this.props.movetop) {
            this.movetop = this.props.movetop;
        }
        if (this.props.moveup) {
            this.moveup = this.props.moveup;
        }
        if (this.props.movebot) {
            this.movebot = this.props.movebot;
        }
        if(this.props.reorderLocation){
            this.reorderLocation = this.props.reorderLocation;
        }
        if (this.props.setClickedLocations) {
            this.setClickedLocations = this.props.setClickedLocations;
        }
        if (this.props.movereverse) {
            this.movereverse = this.props.movereverse;
        }
        this.state = {
            places: this.props.clickedLocations.slice(),
            distances: [],
            showDistances: false,
            isDebug: true, 
            shortTrip: [],
            newLocs: [],
            Notetoggle: false,
            note: null,
            totalDistance: 0
            
        }

        this.updatePlaces = this.updatePlaces.bind(this)
        this.processServerDistSuccess = this.processServerDistSuccess.bind(this)
        this.toggleDistanceShow = this.toggleDistanceShow.bind(this)
        this.resetDistancesAndPlaces = this.resetDistancesAndPlaces.bind(this)
        this.calTotalDist = this.calTotalDist.bind(this)
        this.renderUnits = this.renderUnits.bind(this)
        this.toggleShowNote = this.toggleShowNote.bind(this)
    }


    debug(message) {
        if (this.state.isDebug) {
            console.log(message)
        }
    }

    async updatePlaces(locations) {
        this.debug("Update places called with locations " + JSON.stringify(this.state.places))
        let updatedPlaces = []
        for (let i = 0; i < locations.length; i++) {
            let myLocation = {
                name: locations[i].address,
                latitude: locations[i].latlng.lat.toString(),
                longitude: locations[i].latlng.lng.toString(),
            }

            updatedPlaces.push(myLocation)
        }
        this.debug("updatedPlaces: " + JSON.stringify(updatedPlaces))
        this.setState({places: updatedPlaces})
        this.debug("Update places finished with locations " + JSON.stringify(this.state.places))
    }
    

    calDistance(locations) {


        if ((locations.length && locations) && locations.length > 1) {
            this.updatePlaces(locations).then(() => {
                    this.sendDistanceRequest()
                this.calTotalDist(this.state.distances)
                }
            )
        } else {

            alert("There needs to be at least 2 places selected!")
        }
    }
    renderTripInfo(){
        return(

                <Col sm={12} md={{size: 10, offset: 1}}>
                    <h1>Total Distance: {this.state.totalDistance} miles</h1>
                </Col>

        )
    }
    sendDistanceRequest() {
        let req = {
            requestType: "distances",
            places: this.state.places,
            earthRadius: 3959.0
        }
        sendServerRequest(req, this.props.serverSettings.serverPort)
            .then(distancesResponse => {

                if (distancesResponse) {
                    this.debug("The Distance response is" + JSON.stringify(distancesResponse))
                    this.processServerDistSuccess(distancesResponse)
                } else {
                    console.log("The Request To The Server Failed. Please Try Again Later.");
                }
            });
    }

    processServerDistSuccess(responseBody, port = this.props.serverSettings.serverPort) {
        this.debug("distances before processServerDistSuccess: " + JSON.stringify(this.state.distances))

        this.setState({distances: responseBody.distances})
        this.setState({totalDistances: this.calTotalDist(responseBody.distances)})
        this.debug("distances after processServerDistSuccess: " + JSON.stringify(this.state.distances))
        this.debug("Places after processServerDistSuccess: " + JSON.stringify(this.state.places))
    }

    calTotalDist(array) {
        if(array && array.length) {
            let sum = 0
            for (let i = 0; i < array.length; i++) {

                sum = sum + array[i]
            }

            this.setState({totalDistance: sum})

        }

    }

    toggleDistanceShow() {
        let distShow = this.state.showDistances;
        this.setState({showDistances: !distShow})
    }

    render() {
        const locations = this.props.clickedLocations.slice();

        return (
            
            <div>
                <Container>
                    <Row>
                        {this.renderTripInfo()}
                    </Row>
                    <Row>
                        {this.renderLocationList(locations)}
                    </Row>
                </Container>
            </div>
        );
    }

    resetDistancesAndPlaces() {
        this.setState({
            distances: [],
            showDistances: false,
            places: []
        })


    }

    shortTrip(locations) {
        this.updatePlaces(locations).then(() => {
            this.sendTourRequest()
        })
    }

    sendTourRequest() {
        let req = {
            requestType: "tour",
            earthRadius: 3959.0,
            response: 1.0,
            places: this.state.places.slice().reverse()
        }
        sendServerRequest(req, this.props.serverSettings.serverPort)
            .then(TourResponse => {

                if (TourResponse) {
                    this.processServerTourSuccess(TourResponse)
                } else {
                    console.log("The Request To The Server Failed. Please Try Again Later.");
                }
            });
    }

    processServerTourSuccess(responseBody, port = this.props.serverSettings.serverPort) {
        this.debug("distances before processServerDistSuccess: " + JSON.stringify(this.state.distances))
        this.setState({shortTrip: responseBody.places})


        this.debug("distances after processServerDistSuccess: " + JSON.stringify(this.state.distances))
        this.debug("Places after processServerDistSuccess: " + JSON.stringify(this.state.shortTrip))

        let newLoc = []
        for (let i = 0; i < this.state.shortTrip.length; i++) {
            for (let j = 0; j < this.state.places.length; j++) {
                if ((this.state.shortTrip[i].name == this.state.places[j].name) && 
                    (this.state.shortTrip[i].latitude==this.state.places[j].latitude) &&
                    (this.state.shortTrip[i].longitude == this.state.places[j].longitude))
                    newLoc.push(j)
            }
        }
        this.setState({newLocs : newLoc})
        this.setState({places : this.state.shortTrip})
        this.reorderLocation(this.state.newLocs)
    }
    
    toggleShowNote(){
        let curr = !this.state.Notetoggle;
        this.setState({Notetoggle: curr})
    }
    renderSaveTour(locations) {
        return (
            <Collapse isOpen={!this.state.showAbout}>
                <SaveTour places={locations}/>
            </Collapse>
        );
    }

    renderLocationList(locations) {

        return (

            <Col sm={12} md={{size: 10, offset: 1}}>
                <Table responsive>
                    <thead>
                    <tr>
                        <th><Button color="danger" onClick={() => {
                            this.clearList();
                            this.resetDistancesAndPlaces();
                        }}>Clear</Button></th>
                        <th>{this.renderSaveTour(locations)}</th>
                        <th><Button id="calDist" color="secondary" onClick={() => {
                            this.calDistance(locations)
                        }}>Distance</Button></th>
                        <th><Button id="shorterTrip" color="secondary" onClick={() => {
                            this.shortTrip(locations)
                        }}>shortTrip</Button></th>
                        <th><Button color="primary" onClick={() => this.movereverse()}>reverse</Button></th>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Distance from last location</th>
                    </tr>
                    </thead>
                    <tbody>
                    {locations.map((location, index) => {
                        return (
                            <tr key={index}>
                                <td className={"col-sm-3"}>
                                    {location.address}
                                    
                                </td>
                                <td className={"col-sm-3"}>
                                    {location.latlng.lat.toFixed(2)}
                                </td>
                                <td className={"col-sm-3"}>
                                    {location.latlng.lng.toFixed(2)}

                                </td>
                                <td>

                                    {this.renderUnits(this.state.distances[index])}

                                </td>
                                <td className={"col-sm-3"}>
                                    <Button close onClick={() => this.removeClickedLocation(location)}/>
                                    <button className={"Note-input"} onClick={this.toggleShowNote}>Note</button>
                                    <Collapse isOpen={this.state.Notetoggle}>
                                        <InputGroup>
                                        <Input type="text" placeholder = {this.state.note}/>
                                        </InputGroup>
                                    </Collapse>
                                </td>
                                <td className={"col-sm-3"}>
                                    <Button color="primary" onClick={() => this.movetop(index)}>top</Button>
                                </td>
                                <td className={"col-sm-3"}>
                                    <Button color="primary" onClick={() => this.moveup(index)}>up</Button>
                                </td>
                                <td className={"col-sm-3"}>
                                    <Button color="primary" onClick={() => this.movebot(index)}>bot</Button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Col>
        
        );
    }

    renderUnits(dist) {
        if (dist) {
            return dist + " miles";
        }
    }
}
