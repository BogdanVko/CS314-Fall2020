import React, {Component} from 'react';
import {Container} from "reactstrap";

import HeaderLogo from '../../static/images/tcoLogo.svg';

import {CLIENT_TEAM_NAME} from '../../utils/constants';

const COURSE_URL = "https://cs.colostate.edu/~cs314";

export default class Header extends Component {

    render() {
        return (
            <div className="full-width header">
                <div className="vertical-center">
                    <Container>
                        <div className="vertical-center">
                            <a href={COURSE_URL} target="_blank">
                                <img className="tco-logo" src={HeaderLogo} alt="TCO Brand Logo"/>
                            </a>
                            <a onClick={this.props.toggleAbout}>
                                <h1 className="tco-text-upper">{CLIENT_TEAM_NAME}</h1>
                            </a>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}
