import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow} from 'enzyme';

import Footer from "../src/components/Margins/Footer";
import {beforeEach, describe, it, jest} from "@jest/globals";
import ServerSettings from "../src/components/Margins/ServerSettings";

describe('Footer', () => {
    const processServerConfigSuccess = jest.fn();
    let footerWrapper;

    beforeEach(() => {
        footerWrapper = shallow(<Footer
            serverSettings={{'serverConfig': {'requestType': 'config', 'serverName': 't24'},
                'serverPort': 'http://localhost:8000'}}
            processServerConfigSuccess={processServerConfigSuccess}
        />);
    });

    it('opens ServerSettings on link pressed', () => {
        expect(footerWrapper.state().serverSettingsOpen).toBe(false);
        footerWrapper.find('a').at(0).simulate('click');
        expect(footerWrapper.state().serverSettingsOpen).toBe(true);
    });

    it('updates state when the ServerSettings modal is closed', () => {
        const settingsModal = footerWrapper.find(ServerSettings).at(0);
        footerWrapper.setState({serverSettingsOpen: true});
        settingsModal.props()['toggleOpen']();
        expect(footerWrapper.state().serverSettingsOpen).toBe(false);
    });
});
