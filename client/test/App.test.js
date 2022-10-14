import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow} from 'enzyme';

import App, {HookCaller} from "../src/components/App";
import {beforeEach, describe, it} from "@jest/globals";

import { SnackbarProvider } from 'notistack';

describe('App', () => {
    let appWrapper;

    beforeEach(() => {
        appWrapper = shallow(<App />);
    });

    it('renders a SnackbarProvider', () => {
        expect(appWrapper.find(SnackbarProvider).length).toEqual(1);
    });

    it('renders a HookCaller', () => {
        expect(appWrapper.find(HookCaller).length).toEqual(1);
    });
});
