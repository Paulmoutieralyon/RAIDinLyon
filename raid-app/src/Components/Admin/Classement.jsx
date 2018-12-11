
import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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
          <Label for="exampleSelect">Selectionnez le type de tri</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>Tri de la mort qui tue</option>
            <option>Tri du meilleur perdant</option>
            <option>Tri du tri</option>
            <option>Tri du tri pour le tri du tri</option>
          </Input>
        </FormGroup>
        <Button>Réinitialiser</Button>
      </div>
    );
  }
}