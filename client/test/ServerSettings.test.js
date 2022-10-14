import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import {ModalHeader} from 'reactstrap';
import Page from '../src/components/Page';
import Footer from '../src/components/Margins/Footer';
import ServerSettings from '../src/components/Margins/ServerSettings';

describe('Server Settings Modal', () => {
    let settingsWrapper;
    let isOpen;

    const serverSettings = {'serverPort': 'black-bottle.cs.colostate.edu:31400', 'serverConfig': {}};
    const toggleOpen = () => isOpen = !isOpen;
    const processServerConfigSuccess = jest.fn();

    beforeEach(() => {
        isOpen = true;
        settingsWrapper = shallow(
            <ServerSettings
                isOpen={isOpen}
                serverSettings={serverSettings}
                toggleOpen={toggleOpen}
                processServerConfigSuccess={processServerConfigSuccess}
            />);
    });

    it('gets rendered by the Footer component', () => {
        const footerWrapper = shallow(
            <Footer
                serverSettings={serverSettings}
                processServerConfigSuccess={processServerConfigSuccess}
            />);

        expect(footerWrapper.find('ServerSettings').length).toEqual(1);
    });

    it('toggles isOpen after X button pressed in header or clicking outside of the modal', () => {
        const modal = settingsWrapper.find('Modal').at(0);
        expect(modal).not.toEqual(null);

        expect(isOpen).toBe(true);
        modal.props().toggle(); // normally called when user clicks outside of modal
        expect(isOpen).toBe(false);

        isOpen = true;
        const modalHeader = settingsWrapper.find(ModalHeader);
        modalHeader.props().toggle(); // normally called when user clicks X button in header
        expect(isOpen).toEqual(false);
    });

    it('renders an Input field for the server URL', () => {
        expect(settingsWrapper.find('Input').length).toEqual(1);
    });

    it('updates inputText following an onChange event from the server Input', () => {
        expect(settingsWrapper.state().inputText).toEqual(serverSettings.serverPort);

        const newInput = 'New Input Text';
        simulateServerPortInputChange(settingsWrapper, {target: {value: newInput}});
        expect(settingsWrapper.state().inputText).toEqual(newInput);
    });

    it('correctly handles an invalid Config response', () => {
        settingsWrapper.setState({validServer: true, config: {'serverName': '', 'requestType': 'config'}});

        const invalidConfigResponse = {'features': ["invalid"], 'info': 'this response will not pass the schema'};
        settingsWrapper.instance().processConfigResponse(invalidConfigResponse);

        expect(settingsWrapper.state().validServer).toEqual(false);
        expect(settingsWrapper.state().config).toEqual(false);
    });

    it('updates the server port in the Page component on Save button click', () => {
        mockConfigResponse();

        const pageWrapper = shallow(<Page />);

        const pageConfigSuccess = (value, config) => pageWrapper.instance().processServerConfigSuccess(value, config);
        settingsWrapper.setProps({processServerConfigSuccess: pageConfigSuccess});

        const actualBeforeServerPort = pageWrapper.state().serverSettings.serverPort;
        const expectedBeforeServerPort = `http://${location.hostname}:`;

        const inputText = 'https://black-bottle.cs.colostate.edu:31400';
        simulateServerPortInputChange(settingsWrapper, {target: {value: inputText}});
        settingsWrapper.find('Button').at(1).simulate('click');

        const actualAfterServerPort = pageWrapper.state().serverSettings.serverPort;

        expect(actualBeforeServerPort).toEqual(expectedBeforeServerPort);
        expect(actualAfterServerPort).toEqual(inputText);
    });

    function simulateServerPortInputChange(wrapper, event) {
        wrapper.find('Input').at(0).simulate('change', event);
        wrapper.update();
    }

    function mockConfigResponse() {
        const responseData = {
            requestType: "config",
            serverName: "t24",
            features: ["config"]
        };
        fetch.mockResponse(JSON.stringify(responseData));
    }
});
