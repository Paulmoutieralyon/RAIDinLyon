import React from 'react';
import { Button, FormGroup, Label, Input, Breadcrumb, ListGroup, Container, Col, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';
import './Classement.css';
const axios = require('axios');
const moment = require('moment');


export default class Classement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classement: [],
      timeractivation: null
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/session`)
      .then(response => {
        this.setState({
          timeractivation: response.data[0].activetimer
        })
      });
  }

  saveChoice = (e) => {
    if (e.target.value === "points") {
      axios.get(`http://localhost:5000/api/equipes/byscore`)
        .then(response => {
          console.log(response)
          this.setState({
            classement: response.data
          })
          this.renderResult()
        })
    }
  }

  renderResult = () => {
    return this.state.classement.map((classement, index) => {
      return (
        <div>
          <Breadcrumb className="Breadcrumb">
            <ListGroup className="ClassementText">
              Équipe : {classement.nom} / Points : {classement.score} / Heure de fin : {classement.h_fin}
            </ListGroup>
          </Breadcrumb>
        </div>
      )
    }
    )
  }
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col className="text-left text-md-left">
              <h1 className="titre">Classement des équipes</h1>
            </Col>
          </Row>
          <Row>
            <Col xs="0" md="4" />
            <Col xs="12" md="5" className="text-left text-md-left">
              <FormGroup>
                <Label for="exampleSelect">Selectionnez le type de classement</Label>

                <Input type="select" name="tri" id="tri" onChange={this.saveChoice}>
                  <option value="indices" name="par temps">Choix...</option>
                  <option value="points" name="par temps">Par points</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>

          {this.renderResult()}

          <NavLink to={`/Admin/SessionPage/${window.localStorage.getItem('idAdmin')}`}><Button className="text-center text-md-center">Retour</Button></NavLink>
        </Container>
      </div>
    );
  }
}