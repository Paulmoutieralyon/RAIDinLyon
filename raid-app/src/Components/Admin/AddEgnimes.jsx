
import React from 'react';
import { Breadcrumb, BreadcrumbItem, Collapse, Button, CardBody, Card, InputGroup, InputGroupAddon, Input } from 'reactstrap';


export default class AddEgnimes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false
        };
    }

    toggle = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    render() {
        return (
            <div>
                <h1>Titre énigme</h1>
                <h5>Énoncé</h5>

                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Ajouter une réponse</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Réponse</InputGroupAddon>
                                <Input placeholder="réponse..." />
                            </InputGroup>
                            <Button>Ajouter</Button>
                        </CardBody>
                    </Card>
                </Collapse>

                <Breadcrumb>
                    <BreadcrumbItem active>France</BreadcrumbItem>
                    <Button close />
                </Breadcrumb>
                <Breadcrumb>
                    <BreadcrumbItem active>Japon</BreadcrumbItem>
                    <Button close />
                </Breadcrumb>
                <Breadcrumb>
                    <BreadcrumbItem active>Inde</BreadcrumbItem>
                    <Button close />
                </Breadcrumb>

                <Card body>
                    <Button>Enregistrer les modifications</Button>
                </Card>
            </div>
        );
    }
}