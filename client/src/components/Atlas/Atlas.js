import React, { Component } from 'react';
import { Col, Container, Row, Collapse, Button } from 'reactstrap';

import { Map, Marker, Popup, TileLayer, LayersControl, Polyline } from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

import { LOG } from "../../utils/constants";

import CoordinatesInput from "../SearchBar/CoordinatesInput";


const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = L.latLng(40.5734, -105.0865);
const MARKER_ICON = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;
const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";

const MAP_LAYERSCONTROL_POSITION = "topright" //supports "topright", topleft", "bottomright", "bottomleft"

//Showtrip
const DESTINATIONS = [
    { municipality: "Grand Junction", latLng: L.latLng(39.071445, -108.549728) },
    { municipality: "Alamosa", latLng: L.latLng(37.469448, -105.870018) },
    { municipality: "Pueblo", latLng: L.latLng(38.276463, -104.604607) },
    { municipality: "Denver", latLng: L.latLng(39.742043, -104.991531) },
    { municipality: "Fort Collins", latLng: L.latLng(40.585258, -105.084419) },
];

const PATHS = Array.from(
    DESTINATIONS.keys(), i => [DESTINATIONS[i], DESTINATIONS[(i + 1) % DESTINATIONS.length]]
);


export default class Atlas extends Component {

    constructor(props) {
        super(props);

        this.findMe = this.findMe.bind(this);
        this.geolocationSuccess = this.geolocationSuccess.bind(this);

        this.toggleMarkersPressed = this.toggleMarkersPressed.bind(this);
        this.toggleLinesPressed = this.toggleLinesPressed.bind(this);

        this.setMarker = this.setMarker.bind(this);
        if (this.props.addClickedLocation) {

            this.addClickedLocation = this.props.addClickedLocation;
        }
        console.log("PATHS= ");
        console.log(PATHS);

        this.state = {
            markerPosition: null,
            address: "",
            mapCenter: MAP_CENTER_DEFAULT,
            destinations: DESTINATIONS,
            paths: PATHS,
            showMarkers: false,
            showLines: true
        };
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={12} md={{ size: 10, offset: 1 }}>
                            {this.renderLeafletMap()}
                            <button onClick={this.findMe} className={"btn-block btn-secondary"}>My location</button>
                            {this.renderCoordinatesInput()}
                        </Col>
                    </Row>
                    {this.renderToggleButtons()}
                </Container>
            </div>
        );

    }

    renderCoordinatesInput() {
        return (
            <Collapse isOpen={!this.state.showAbout}>
                <CoordinatesInput setMarker={this.setMarker} update={this.updateMarker} />
            </Collapse>
        );
    }

    renderLeafletMap() {
        if (this.props.listOfLocations) {
            this.state.destinations = this.props.listOfLocations.slice();
        }
        return (
            <Map
                className={'mapStyle'}
                boxZoom={false}
                useFlyTo={true}
                zoom={15}
                minZoom={MAP_MIN_ZOOM}
                maxZoom={MAP_MAX_ZOOM}
                maxBounds={MAP_BOUNDS}
                center={this.state.mapCenter}
                onClick={this.setMarker}

            >
                {this.renderLayersControl()}
                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION} />
                {this.getMarker()}
                {this.state.destinations.map((location, index) => this.renderMarker(location, index))}
                {this.state.destinations.map((location, index) => this.renderPolyline(location, index))}
            </Map>
        );
    }

    renderMarker(destination, index) {
        if (this.state.showMarkers && destination) {
            // JS map function requires unique key for each child
            const key = index;
            return (
                <Marker position={destination.latlng} key={key} icon={MARKER_ICON}>
                    <Popup offset={[0, -18]} className="font-weight-bold">
                        {destination.latlng.lat.toFixed(6) + ", " + destination.latlng.lng.toFixed(6)}
                    </Popup>
                </Marker>
            );
        }
    }


    renderPolyline(destination, index) {
        const numDestinations = this.state.destinations.length;
        const next = (index + 1) % numDestinations;
        if (this.state.showLines && this.state.destinations[index] && this.state.destinations[next]) {
            // JS map function requires unique key for each child
            // console.log("DESTINATION PAIR:")
            // console.log(destinationPair)
            const key = JSON.stringify(this.state.destinations[index]) + JSON.stringify(this.state.destinations[next]);
            const latLngPair = [this.state.destinations[index].latlng, this.state.destinations[next].latlng];
            return (
                <Polyline positions={latLngPair} key={key}>
                    <Popup offset={[0, -1]} className="font-weight-bold">
                        Distance: Not Calculated
                    </Popup>
                </Polyline>
            );
        }
    }

    renderToggleButtons() {
        // Note: You might choose to use Reactstrap Dropdown or Popover components for progressive disclosure.
        //       You could also incorporate checkboxes or icons.
        const showMarkers = this.state.showMarkers;
        const showLines = this.state.showLines;
        return (
            <Row className="mt-3">
                {this.renderToggleButton("Markers", showMarkers, this.toggleMarkersPressed, 1)}
                {this.renderToggleButton("Lines", showLines, this.toggleLinesPressed, 0)}
            </Row>
        );
    }

    renderToggleButton(label, toggledOn, onClick, offSet) {
        const buttonColor = toggledOn ? "primary" : "secondary";
        const toggledText = toggledOn ? "On" : "Off";
        return (
            <Col md={{ size: 5, offset: offSet }} className="mb-2" >

                <Button color={buttonColor} onClick={onClick} block>
                    {toggledOn ? "Hide" : "Show"} {label}
                </Button>
            </Col>
        );
    }

    toggleMarkersPressed() {
        this.setState({ showMarkers: !this.state.showMarkers });
    }

    toggleLinesPressed() {
        this.setState({ showLines: !this.state.showLines });
    }

    setMarker(destination) {
        this.setState({ markerPosition: destination.latlng}); // Calling setState twice
        // document.cookie = "" ... do cookie here before setState//


        this.reverseGeoCoding(destination.latlng).then(() => {
            let addy = this.state.address;

            if (this.props.addClickedLocation) {

                let locationObj = {
                    "address": addy,
                    "latlng": destination.latlng
                }
                this.addClickedLocation(locationObj);
            }
        });

    }

    getMarker() {
        if (this.state.markerPosition) {
            return (
                <Marker ref={(ref) => this.showMarkerPopup(ref)} position={this.state.markerPosition} icon={MARKER_ICON}>
                    <Popup offset={[0, -18]} className="font-weight-bold">
                        {this.getStringMarkerPosition()}
                    </Popup>
                </Marker>
            );
        }
    }

    findMe() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.geolocationSuccess, this.geolocationError);
        } else {
            LOG.info("Could not retrieve user location. Geolocation is either turned off or not supported by your browser");
        }
    }

    geolocationSuccess(position) {

        const latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
        let testObj = { "latlng": latlng }
        this.setMarker(testObj)
        LOG.info("User location: ", latlng);
    }

    geolocationError() {
        LOG.info("Error getting user location.");
    }

    showMarkerPopup(ref) {
        if (ref) {
            ref.leafletElement.openPopup();
        }
    }

    getStringMarkerPosition() {
        //console.log(this.state.adress)
        return (
            <div>
                {this.state.address}
                <br />
                {this.state.markerPosition.lat.toFixed(8) + ", " + this.state.markerPosition.lng.toFixed(8)}
            </div>
        );
    }

    async reverseGeoCoding(coordinates) {
        // Here the coordinates are in LatLng Format
        // if you wish to use other formats you will have to change the lat and lng in the fetch URL
        const data = await (await fetch(GEOCODE_URL + `${coordinates.lng},${coordinates.lat}`)).json();
        //console.log("Location object " + JSON.stringify(data.address));

        const addressLabel = (data.address !== undefined) ? data.address.LongLabel : "Unknown";
        this.setState({ address: addressLabel });

    }

    renderLayersControl() {
        return (
            <LayersControl position={MAP_LAYERSCONTROL_POSITION}>
                {this.renderMapLayers(
                    true,
                    "OpenStreetMap.Mapnik",
                    "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
                    "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                )
                }
                {this.renderMapLayers(
                    false,
                    "OpenStreetMap.BlackAndWhite",
                    "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
                    "http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                )
                }
                {this.renderMapLayers(
                    false,
                    "USGS.USImageryTopo",
                    "Tiles courtesy of the <a href=&quot;https://usgs.gov/&quot;>U.S. Geological Survey</a>",
                    "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}"
                )
                }
                {this.renderMapLayers(
                    false,
                    "Humanitarian map",
                    "Humanitarian map",
                    "http://a.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png"
                )
                }
            </LayersControl>
        )
    }

    renderMapLayers(checked, name, attribution, url) {
        /*LayersControl.BaseLayer with checked option is the map which is loaded on start*/
        return (
            <LayersControl.BaseLayer checked={checked} name={name}>
                <TileLayer attribution={attribution} url={url} />
            </LayersControl.BaseLayer>
        )
    }

}
