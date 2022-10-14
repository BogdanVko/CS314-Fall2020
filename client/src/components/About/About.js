import React, { Component } from 'react';

import {
    Container, Row, Col, Button, Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';

import { CLIENT_TEAM_NAME } from "../../utils/constants";
import newZuccs from "../../static/images/newZuccs.jpg"

import bogdanPicture from "../../static/images/bogdan.png"
import aaronPicture from "../../static/images/aaronPicture.jpg"
import benjaminPicture from "../../static/images/benjaminPicture.jpg"
import torPicture from "../../static/images/torPicture.png"
import anfengPicture from "../../static/images/anfengPicture.png"

export default class About extends Component {

    render() {
        return (
            <Container>
                {this.closeButton()}
                <Row>
                    <Col>
                        <Card>
                            <CardImg top width="80%" src={newZuccs} alt="Card image cap" />
                        </Card>
                    </Col>
                </Row>
                {this.aboutHeading()}
                <Row xs="1" sm="2" md="3" lg="4" xl="5">
                    {this.teamMemberCard(bogdanPicture, "Bogdan Vasilchenko", "Bogdan is a computer science student. He immigrated from Russia into the US when he was 14. His favorite hobbies are: jamming music with friends, working on personal CS projects, trading stocks and playing Counter Strike. Bogdan loves cats and hates PhP.")}
                    {this.teamMemberCard(benjaminPicture, "Benjamin Siler", "Benjamin is a junior studying computer science and philosophy at Colorado State University.He enjoys playing music, coding, video games and rock climbing.")}
                    {this.teamMemberCard(torPicture, "Tor Larson", "Tor is a student at CSU. When he's not working on his computer science projects and trading stonks, you can find him outside snowboarding, hiking, or fishing.")}
                    {this.teamMemberCard(anfengPicture, "Anfeng Peng", "Anfeng is a student in CSU and he majors in computer science. He loves hiking and swimming, however the Covid19 ruined his hiking and swimming plan in the winter break.")}
                    {this.teamMemberCard(aaronPicture, "Aaron Lawrence", "He is currently in his third year of college, majoring in computer science. He hopes to gain more experience working on tasks in a group environement.")}

                </Row>
            </Container>
        );
    }

    aboutHeading() {
        return (

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h4">
                                Mission statement
                        </CardTitle>
                            <CardText>Our mission is to collaborate as a team to create a functional and elegantly designed product. </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
    closeButton() {
        return (
            <Row>
                <Col>
                    <h2>{CLIENT_TEAM_NAME}</h2>
                </Col>
                <Col xs="auto">
                    <Button color="primary" onClick={this.props.closePage} xs={1}>
                        Close
            </Button>
                </Col>
            </Row>)
    }
    
    teamMemberCard(picture, name, text) {
        return (
            <Col size="auto">
                <Card>
                    <CardImg top width="100%" src={picture}></CardImg>
                    <CardBody>
                        <CardTitle tag="h5">
                            {name}
                        </CardTitle>
                        <CardText>
                            {text}
                        </CardText>
                    </CardBody>
                </Card>
            </Col>)
    }
}
