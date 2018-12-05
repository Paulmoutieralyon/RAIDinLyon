
import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, Button, Form, FormGroup, Label, Input } from 'reactstrap';


export default class ListSessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h2>Équipe</h2>
                <Breadcrumb>
                    <BreadcrumbItem active>Équipe 1</BreadcrumbItem>
                    <Form>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="checkbox" />
                            </Label>
                        </FormGroup>
                    </Form>
                </Breadcrumb>

                <Breadcrumb>
                    <BreadcrumbItem active>Équipe 2</BreadcrumbItem>
                    <Form>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="checkbox" />
                            </Label>
                        </FormGroup>
                    </Form>
                </Breadcrumb>

                <Breadcrumb>
                    <BreadcrumbItem active>Équipe 3</BreadcrumbItem>
                    <Form>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="checkbox" />
                            </Label>
                        </FormGroup>
                    </Form>
                </Breadcrumb>

                <Card body>
                    <Button>Nouvelle équipe </Button>
                </Card>
            </div>
        );
    }
}