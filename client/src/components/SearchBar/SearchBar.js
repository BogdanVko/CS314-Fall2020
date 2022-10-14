import React, {Component} from 'react';

import {
    Col,
    Container,
    Row,
    InputGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    Button,
    Table,
    Collapse,
    Form,
    FormGroup,
    Label,
    FormText
} from 'reactstrap';

import {getOriginalServerPort, isJsonResponseValid, sendServerRequest} from "../../utils/restfulAPI";
import * as findSchema from "../../../schemas/FindResponse.json";
import {LOG} from "../../utils/constants";

export default class SearchBar extends Component {


    constructor(props) {
        super(props);
        if (this.props.addClickedLocation) {
            this.addClickedLocation = this.props.addClickedLocation;
        }

        this.state = {
            match: "",
            places: [],
            serverSettings: {serverPort: getOriginalServerPort(), serverConfig: null},
            showSearch: false,
            type: [],
            where: [],
            showSBar: false
        };

        this.setWhere = this.setWhere.bind(this);
        this.setType = this.setType.bind(this);
        this.setMatch = this.setMatch.bind(this);
        this.processServerFindError = this.processServerFindError.bind(this)
        this.processServerFindSuccess = this.processServerFindSuccess.bind(this)
        this.toggleSearchShow = this.toggleSearchShow.bind(this)
        this.clearPlaces = this.clearPlaces.bind(this)
        this.toggleShowSBar = this.toggleShowSBar.bind(this)
    }

    clearPlaces() {
        this.setState({places: []})
    }

    sendFindRequest() {
        let whereArray = [];
        let typeArray = [];
        if (!this.state.where.isEmpty && this.state.where[0] !== "") {
            whereArray = this.state.where;
        }
        if (!this.state.type.isEmpty && this.state.where[0] !== "") {
            typeArray = this.state.type;
        }
        sendServerRequest({
            requestType: "find",
            match: this.state.match,
            where: whereArray,
            type: typeArray,
            limit: 10
        }, this.props.serverSettings.serverPort)
            .then(findResponse => {
                console.log("match in request is " + this.state.match)
                if (findResponse) {
                    this.processFindResponse(findResponse)
                } else {
                    alert("The Request To The Server Failed. Please Try Again Later.");
                }
            });
    }

    toggleSearchShow() {
        let toggleSearch = this.state.showSearch;
        this.setState({showSearch: !toggleSearch})
    }

    setWhere(e) {
        if (e.target.value === "") {
            this.setState({where: []});
        } else {
            this.setState({where: [e.target.value]});
        }

    }

    setType(e) {
        if (e.target.value === "") {
            this.setState({type: []});
        } else {
            this.setState({type: [e.target.value]});
        }

    }

    setMatch(e) {

        this.setState({match: e.target.value});
    }

    processFindResponse(findResponse) {
        if (!isJsonResponseValid(findResponse, findSchema)) {
            this.processServerFindError("Find Response Not Valid. Check The Server.");
        } else {
            this.processServerFindSuccess(findResponse);
        }
    }

    processServerFindSuccess(find) {
        console.log("FindResponse success\n" + JSON.stringify(find))
        this.setState({places: find.places})
        this.setState({showSearch: true})

        console.log("Local Places list updated \n" + JSON.stringify(this.state.places))
        console.log("The showSearch is " + this.state.showSearch)
    }

    processServerFindError(message) {
        LOG.error(message);
        //const updatedSettings = Object.assign(this.state.serverSettings);
        //updatedSettings.serverConfig = null;
        //this.setState({serverSettings: updatedSettings});
        this.props.showMessage(message, "error");
    }

    toggleShowSBar() {
        let curr = this.state.showSBar;
        this.setState({showSBar: !curr})
    }


    render() {
        const locations = this.state.places.slice();
        return (


            <div className="pb-3">
                <Container>
                    <Row>
                        <Col sm={12} md={{size: 10, offset: 1}}>
                            <button className={"btn-block btn-primary"} onClick={this.toggleShowSBar}>Show Search Bar
                            </button>
                        </Col>
                    </Row>
                </Container>
                <br/>
                <Collapse isOpen={this.state.showSBar}>
                    <Container>
                        <Row>
                            <Col sm={12} md={{size: 10, offset: 1}}>

                                <InputGroup size="normal">
                                    <InputGroupAddon addonType="prepend">
                                        <Button className={"btn-block"}
                                                onClick={() => this.sendFindRequest()}>Search</Button>

                                    </InputGroupAddon>
                                    <Input type="text" placeholder="Enter something you're looking for"
                                           onChange={this.setMatch} value={this.state.match} id="inputBar"/>
                                </InputGroup>


                            </Col>


                        </Row>
                        <Row>
                            <Col sm={12} md={{size: 10, offset: 1}}>
                                <hr/>
                            </Col>
                        </Row>
                        <Row>

                            <Col sm={12} md={{size: 10, offset: 1}}>
                                <h5>Additional Filters</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={{size: 10, offset: 1}}>
                                <Form>
                                    <FormGroup>

                                        <Input type="select" value={this.state.type} onChange={this.setType} name="select" id="exampleSelect">
                                            <option value = "">Type: none</option>
                                            <option value = "airport">Airport</option>
                                            <option value = "heliport">Heliport</option>
                                            <option value = "balloonport">Balloonport</option>

                                        </Input>
                                    </FormGroup>

                                </Form>
                            </Col>

                        </Row>
                        <Row>
                            <Col sm={12} md={{size: 10, offset: 1}}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Where</InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="none" onChange={this.setWhere} value={this.state.where}/>
                                </InputGroup>
                            </Col>

                        </Row>
                    </Container>
                    <Collapse isOpen={this.state.showSearch}>
                        <Container>

                            <Row>
                                <Col sm={12} md={{size: 10, offset: 1}}>
                                    <Table responsive>
                                        <thead>
                                        <tr>
                                            <th>Address</th>
                                            <th>Latitude</th>
                                            <th>Longitude</th>
                                            <th><Button color="danger" onClick={() => {
                                                this.clearPlaces();
                                                this.toggleSearchShow();
                                            }}> Cancel </Button></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {locations.map((location, index) => {
                                            return (

                                                <tr key={index}>
                                                    <td>

                                                        {location.name}

                                                    </td>
                                                    <td>

                                                        {location.latitude.slice(0, 6)}

                                                    </td>
                                                    <td>
                                                        {location.longitude.slice(0, 6)}
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => {

                                                            let thisLocation = {
                                                                address: location.name,
                                                                latlng: {
                                                                    lat: Number(location.latitude),
                                                                    lng: Number(location.longitude)
                                                                }

                                                            }

                                                            console.log("SBar.js: thisLocation: " + JSON.stringify(thisLocation))
                                                            this.addClickedLocation(thisLocation)
                                                        }

                                                        }> Add to trip </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Container>
                    </Collapse>
                </Collapse>
            </div>

        );
    }
}
