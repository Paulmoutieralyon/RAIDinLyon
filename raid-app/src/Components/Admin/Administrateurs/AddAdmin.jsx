
import React from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, FormText, Col, Card } from 'reactstrap';

export default class AddEgnimes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>

                <h1>Ajouter un administrateur</h1>
                <FormGroup>
                    <Label for="exampleText">Nom Prénom</Label>
                    <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleText">Adresse e-mail</Label>
                    <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>


                <Card body>
                    <Button>Enregistrer les modifications </Button>
                </Card>
            </div>
        );
    }
}