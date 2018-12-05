
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


                <FormGroup>
                    <Label for="exampleText">Titre</Label>
                    <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleText">Description de l'énigme</Label>
                    <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>


                <FormGroup row>
                    <Label for="exampleFile" sm={2}>Importer une photo pour votre énigme</Label>
                    <Col sm={10}>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                            This is some placeholder block-level help text for the above input.
            </FormText>
                    </Col>
                </FormGroup>

                <Button>Ajouter une réponse</Button>

                <Breadcrumb>
                    <BreadcrumbItem active>Réponse 2</BreadcrumbItem>
                    <Form>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="checkbox" />
                            </Label>
                        </FormGroup>
                    </Form>
                </Breadcrumb>

                <Breadcrumb>
                    <BreadcrumbItem active>Réponse 1</BreadcrumbItem>
                    <Form>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="checkbox" />
                            </Label>
                        </FormGroup>
                    </Form>
                </Breadcrumb>


                <Card body>
                    <Button>Enregistrer les modifications </Button>
                </Card>
            </div>
        );
    }
}