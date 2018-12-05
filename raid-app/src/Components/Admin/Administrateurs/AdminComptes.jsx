
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
                <h2>Comptes administrateurs</h2>
                <Breadcrumb>
                    <BreadcrumbItem active>Léa the boss of the boss of the planet </BreadcrumbItem>
                    <Form>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="checkbox" />
                            </Label>
                        </FormGroup>
                    </Form>
                </Breadcrumb>

                <Breadcrumb>
                    <BreadcrumbItem active>2e Admin qui existe pas</BreadcrumbItem>
                    <Form>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="checkbox" />
                            </Label>
                        </FormGroup>
                    </Form>
                </Breadcrumb>

                <Breadcrumb>
                    <BreadcrumbItem active>3e Admin qui existe pas</BreadcrumbItem>
                    <Form>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="checkbox" />
                            </Label>
                        </FormGroup>
                    </Form>
                </Breadcrumb>

                <Card body>
                    <Button>Nouvel administrateur </Button>
                </Card>
            </div>
        );
    }
}