import React, { Component } from "react";

import { SnackbarProvider, useSnackbar } from 'notistack';

import Page from "./Page";

export default class App extends Component {

    render() {
        return (
            <SnackbarProvider maxSnack={3} preventDuplicate>
                <HookCaller />
            </SnackbarProvider>
        );
    }
}

export const HookCaller = () => {

    const { enqueueSnackbar } = useSnackbar();
    const showMessage = (message, variant="info") => enqueueSnackbar(message, { variant: variant });

    return <Page showMessage={showMessage}/>;
};
