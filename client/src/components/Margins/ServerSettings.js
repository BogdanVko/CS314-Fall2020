import React, { Component } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import {UncontrolledPopover, PopoverHeader, PopoverBody} from 'reactstrap';

import { sendServerRequest, isJsonResponseValid } from "../../utils/restfulAPI";

import * as configSchema from "../../../schemas/ConfigResponse";

export default class ServerSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputText: this.props.serverSettings.serverPort,
            validServer: null,
            config: false,
            features: [], 
            type: [], 
            where: []
        };

        this.saveInputText = this.state.inputText;
    }

    render() {
        return (
            <div>
            <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggleOpen()}>
                <ModalHeader toggle={() => this.props.toggleOpen()}>Server Connection</ModalHeader>
                {this.renderSettings(this.getCurrentServerName())}
                {this.renderFooterActions()}
            </Modal>
            
            </div>
        );
    }

    renderSettings(currentServerName) {
        return (
            <ModalBody>
                <Row className="m-2">
                    <Col>
                        Name: {currentServerName}
                    </Col>
                </Row>
                <Row className="m-2">
                    <Col xs={2}>
                        URL:
                    </Col>
                    <Col xs={10}>
                        {this.renderInputField()}
                    </Col>
                </Row>
                <Row className="m-2">
                    <Col>
                        Feature: {this.showFeatures()}
                    </Col>
                </Row>
                <Row className="m-2">
                    <Col>
                        Type: {this.showType()}
                    </Col>
                </Row>
                <Row className="m-2">
                    <Col>
                        Where: {this.showWhere()} items
                    </Col>
                </Row>
            </ModalBody>
        );
    }

    renderInputField() {
        return(
            <Input onChange={(e) => this.updateInput(e.target.value)}
                   value={this.state.inputText}
                   placeholder={this.props.serverPort}
                   valid={this.state.validServer}
                   invalid={!this.state.validServer && this.state.validServer !== null}
            />
        );
    }

    renderFooterActions() {
        return (
            <ModalFooter>
                <Button color="primary" onClick={() => this.resetServerSettingsState()}>Cancel</Button>
                <Button color="primary" onClick={() =>
                {
                    this.props.processServerConfigSuccess(this.state.config, this.state.inputText);
                    this.resetServerSettingsState(this.state.inputText);
                }}
                        disabled={!this.state.validServer}
                >
                    Save
                </Button>
                <Button id="allContry" color="secondary" onClick={() => {}}> Show All Contry </Button>
                <UncontrolledPopover trigger="focus" placement="bottom" target="allContry">
                        <PopoverHeader>Show All Contry</PopoverHeader>
                        <PopoverBody>{this.showCountry()}</PopoverBody>
                </UncontrolledPopover>
            </ModalFooter>
        );
    }

    getCurrentServerName() {
        let currentServerName = this.props.serverSettings.serverConfig && this.state.validServer === null ?
                                this.props.serverSettings.serverConfig.serverName : "";
        //console.log(this.state.config)
        if (this.state.config && Object.keys(this.state.config).length > 0) {
            currentServerName = this.state.config.serverName;
        }
        return currentServerName;
    }

    updateInput(url) {
        this.setState({inputText: url}, () => {
            if (this.shouldAttemptConfigRequest(url)) {
                this.sendConfigRequest(url);
            } else {
                this.setState({validServer: false, config: {}});
            }
        });
    }
    showFeatures(){
        let longString = ""
        for (let i = 0; i < this.state.features.length; i++) {
            longString = longString + this.state.features[i] + ", "
        }
        return longString
    }
    showType(){
        let longString = ""
        for (let i = 0; i < this.state.type.length; i++) {
            longString = longString + this.state.type[i] + ", "
        }
        return longString
    }
    showWhere(){
        return this.state.where.length
    }
    showCountry(){
        let longString = ""
        for (let i = 0; i < this.state.where.length; i++) {
            longString = longString + this.state.where[i] + ", "
        }
        return longString
    }
    sendConfigRequest(destinationUrl) {
        this.setState({validServer: null});
        sendServerRequest({requestType: "config"}, destinationUrl)
            .then(configResponse => {
                if (destinationUrl === this.state.inputText) {
                    if (configResponse) {
                        this.processConfigResponse(configResponse);
                    } else {
                        this.setState({validServer: false, config: null});
                    }
                }
            });
    }

    shouldAttemptConfigRequest(resource) {
        const urlRegex = /https?:\/\/.+/;
        return resource.match(urlRegex) !== null && resource.length > 15;
    }

    processConfigResponse(configResponse) {
        if (!isJsonResponseValid(configResponse, configSchema)) {
            this.setState({validServer: false, config: false});
        } else {
            this.setState({validServer: true, config: configResponse});
            if (configResponse.features){
                this.setState({features: configResponse.features});
            } else{this.setState({features: []})
            }
            if (configResponse.type){
                this.setState({type: configResponse.type});
            }else{this.setState({type: []})
            }
            if (configResponse.where){
                this.setState({where: configResponse.where});
            }else{this.setState({where: []})
            }
        }
    }

    resetServerSettingsState(inputText=this.saveInputText) {
        this.props.toggleOpen();
        this.setState({
            inputText: inputText,
            validServer: null,
            config: false
        });
    }
}
