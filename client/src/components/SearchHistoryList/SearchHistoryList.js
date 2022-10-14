import React, {Component} from 'react';
import {Button, Col, Container, Row, Table} from "reactstrap";


export default class SearchHistoryList extends Component {
    constructor(props) {
        super(props);
        if(this.props.clearList) {
            this.clearList=this.props.clearList;
        }
        if(this.props.removeClickedLocation) {
            this.removeClickedLocation=this.props.removeClickedLocation;
        }
    }

    render() {
        return (
            // Add a list that help to manage search history
            // Act with SearchBar and create a list of search history
            Null
        );
    }
}
