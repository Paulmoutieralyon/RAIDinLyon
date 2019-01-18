
import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {NavLink} from 'react-router-dom'
export default class Classement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Classement</h1>
        <FormGroup>
          <Label for="exampleSelect">Selectionnez le type de Classement</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>Par points</option>
            <option>Par temps</option>
            <option>Par indices</option>
            
          </Input>
        </FormGroup>
        <Button>Réinitialiser</Button>
        <NavLink to = "/Admin/SessionPage"><Button>Retour</Button></NavLink>
      </div>
    );
  }
}