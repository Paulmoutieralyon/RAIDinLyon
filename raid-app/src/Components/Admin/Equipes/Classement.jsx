
import React from 'react';
import { Form, Input, Button } from 'reactstrap';

export default class Classement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Classement</h1>

        <Form>

          <Input type="select">
            <option>Tri de la mort </option>
            <option>Tri super cool</option>
            <option>Tri des perdants</option>
          </Input>
        </Form>

        <Button>Réinitialiser</Button>
      </div>
    );
  }
}
