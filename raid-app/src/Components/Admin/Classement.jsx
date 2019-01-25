import React from 'react';
import { Button, FormGroup, Label, Input, Breadcrumb, ListGroup } from 'reactstrap';
import { NavLink } from 'react-router-dom';
const axios = require('axios');
export default class Classement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classement: [],
    };
  }

  saveChoice = (e) => {
    if (e.target.value === "points") {
      axios.get(`/api/equipes/byscore`)
        .then(response => {
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
          <Breadcrumb>
            <ListGroup>
              {classement.nom} : {classement.score} points
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
        <h1>Classement</h1>
        <FormGroup>
          <Label for="exampleSelect">Selectionnez le type de Classement</Label>
          <Input type="select" name="tri" id="tri" onChange={this.saveChoice}>
            <option value="temps" name="par temps">Par temps</option>
            <option value="indices" name="par temps">Par indices</option>
            <option value="points" name="par temps">Par points</option>
          </Input>
        </FormGroup>

        {this.renderResult()}

        <NavLink to={`/Admin/SessionPage/${window.localStorage.getItem('idAdmin')}`}><Button>Retour</Button></NavLink>
      </div>
    );
  }
}