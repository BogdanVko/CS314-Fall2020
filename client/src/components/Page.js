import React, { Component } from "react";

import { Collapse, Table } from "reactstrap";

import Header from "./Margins/Header";
import Footer from "./Margins/Footer";
import About from "./About/About";
import Atlas from "./Atlas/Atlas";
import LocationList from "./LocationList/LocationList";
import SearchBar from "./SearchBar/SearchBar";


import {LOG} from "../utils/constants";
import * as configSchema from "../../schemas/ConfigResponse";
import { getOriginalServerPort, isJsonResponseValid, sendServerRequest } from "../utils/restfulAPI";

export default class Page extends Component {

	constructor(props) {
		super(props);

		this.addClickedLocation=this.addClickedLocation.bind(this);
		this.clearList=this.clearList.bind(this);
		this.removeClickedLocation=this.removeClickedLocation.bind(this);
		this.movetop = this.movetop.bind(this);
		this.moveup = this.moveup.bind(this);
		this.movebot = this.movebot.bind(this);
		this.movereverse = this.movereverse.bind(this);
		this.reorderLocation=this.reorderLocation.bind(this);
		this.state = {
			showAbout: false,
			serverSettings: {serverPort: getOriginalServerPort(), serverConfig: null},
			clickedLocations: [],
			fullLocations: []
		};

		this.toggleAbout = this.toggleAbout.bind(this);
		this.processServerConfigSuccess = this.processServerConfigSuccess.bind(this);


		sendServerRequest({requestType: "config"}, this.state.serverSettings.serverPort)
			.then(configResponse => {
				if (configResponse) {
					this.processConfigResponse(configResponse);
				} else {
					this.props.showMessage("The Request To The Server Failed. Please Try Again Later.", "error");
				}
			});
	}

	render() {
		return (
			<>
				<Header toggleAbout={this.toggleAbout}/>
				{this.renderAbout()}
				{this.renderSearchBar()}
				{this.renderAtlas()}
				<hr/>
				{this.renderLocationList()}
				<Footer
					serverSettings={this.state.serverSettings}
					processServerConfigSuccess={this.processServerConfigSuccess}
				/>
			</>
		);
	}

	renderSearchBar(){
		return(
			<Collapse isOpen={!this.state.showAbout}>
			<SearchBar addClickedLocation={this.addClickedLocation} serverSettings = {this.state.serverSettings}/>
			</Collapse>


		);
	}
	renderAbout() {
		return(
			<Collapse isOpen={this.state.showAbout}>
				<About closePage={this.toggleAbout}/>
			</Collapse>
		);
	}

	renderAtlas() {
		const listOfLocations = this.state.clickedLocations.slice()
		return (
			<Collapse isOpen={!this.state.showAbout}>
				<Atlas showMessage={this.props.showMessage} addClickedLocation={this.addClickedLocation} listOfLocations={listOfLocations}/>
			</Collapse>
		);
	}


	updateMarker(message) {
		console.log(message);
	}

	renderLocationList() {
		const clickedLocations = this.state.clickedLocations.slice()

		// document.cookie = "location=" + this.state.clickedLocations[0]; Should only render
		return (

			<Collapse isOpen={!this.state.showAbout}>
				<LocationList clickedLocations={clickedLocations} clearList={this.clearList}
							  removeClickedLocation={this.removeClickedLocation} movetop={this.movetop} moveup={this.moveup} 
							  movebot={this.movebot} serverSettings = {this.state.serverSettings}
							  reorderLocation = {this.reorderLocation} movereverse = {this.movereverse}></LocationList>
			</Collapse>
		);
	}


	addClickedLocation(mapClickLatLng) {
		const clickedLocations = this.state.clickedLocations.slice()

		clickedLocations.unshift(mapClickLatLng)

		this.setState({clickedLocations: clickedLocations});
	}

	clearList() {
		this.setState({clickedLocations: []});
	}

	removeClickedLocation(element) {
		const clickedLocations = this.state.clickedLocations.slice()
		clickedLocations.splice(clickedLocations.indexOf(element), 1);
		this.setState({clickedLocations: clickedLocations})
	}
	movetop(index) {
		const clickedLocations = this.state.clickedLocations.slice()
		if (index != 0){
			var temp = clickedLocations[index]
			for (let i = clickedLocations.length -1; i > 0; i--) {
				if (i <= index){
					clickedLocations[i] = clickedLocations[i-1]
				}
			}
				clickedLocations[0] = temp
		}
		this.setState({clickedLocations: clickedLocations})
	}

	moveup(index) {
		const clickedLocations = this.state.clickedLocations.slice()
		if (index != 0){
			var temp = clickedLocations[index]
			clickedLocations[index] = clickedLocations[index - 1]
			clickedLocations[index - 1] = temp
		}
		this.setState({clickedLocations: clickedLocations})
	}
	movebot(index) {
		const clickedLocations = this.state.clickedLocations.slice()
		if (index != clickedLocations.length-1){
			var temp = clickedLocations[index]
			clickedLocations[index] = clickedLocations[index + 1]
			clickedLocations[index + 1] = temp
		}
		this.setState({clickedLocations: clickedLocations})
	}
	movereverse(){
		let clickedLocations1 = []
		const clickedLocations2 = this.state.clickedLocations.slice() 
		for(let j =0; j<clickedLocations2.length; j++){
			clickedLocations1.unshift(clickedLocations2[j])
		}
		this.setState({clickedLocations: clickedLocations1})
	}
	reorderLocation(index) {
		let clickedLocations1 = []
		const clickedLocations2 = this.state.clickedLocations.slice() 
		
		for(let j =0; j<clickedLocations2.length; j++){
			console.log('index[j] is ' + index[j])
			clickedLocations1.push(clickedLocations2[index[j]])
			console.log(clickedLocations1)
		}
		this.setState({clickedLocations: clickedLocations1})
	}
	toggleAbout() {
		this.setState({showAbout: !this.state.showAbout});
	}

	processConfigResponse(configResponse) {
		if (!isJsonResponseValid(configResponse, configSchema)) {
			this.processServerConfigError("Configuration Response Not Valid. Check The Server.");
		} else {
			this.processServerConfigSuccess(configResponse);
		}
	}

	processServerConfigSuccess(config, port=this.state.serverSettings.serverPort) {
		LOG.info("Switching to Server:", this.state.serverSettings.serverPort);
		const updatedSettings = { serverConfig: config, serverPort: port };
		this.setState({serverSettings: updatedSettings});
	}

	processServerConfigError(message) {
		LOG.error(message);
		const updatedSettings = Object.assign(this.state.serverSettings);
		updatedSettings.serverConfig = null;
		this.setState({serverSettings: updatedSettings});
		this.props.showMessage(message, "error");
	}

	reformatPlaceObject(place) {
		console.log(typeof place.latitude)
		console.log(place.latitude)
		console.log(place)
		let reformattedPlace = {
			address: place.name,
			latlng:
				{lat: parseFloat(place.latitude),
				lng: parseFloat(place.longitude)}
		}

		return reformattedPlace;
	}
}
