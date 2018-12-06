
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
                    <Label for="exampleText">Titre de l'équipe</Label>
                    <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>



                <Button>Ajouter un participant</Button>

                <Breadcrumb>
                    <BreadcrumbItem active>Jerzy</BreadcrumbItem>
                    <Form>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="checkbox" />
                            </Label>
                        </FormGroup>
                    </Form>
                </Breadcrumb>

                <Breadcrumb>
                    <BreadcrumbItem active>Jeffrey</BreadcrumbItem>
                    <Form>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="checkbox" />
                            </Label>
                        </FormGroup>
                    </Form>
                </Breadcrumb>
                <Breadcrumb>
                    <BreadcrumbItem active>Alex</BreadcrumbItem>
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