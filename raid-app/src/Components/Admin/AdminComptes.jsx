
import React from 'react';
import { Breadcrumb, BreadcrumbItem, Collapse, Button, CardBody, Card, InputGroup, InputGroupAddon, Input } from 'reactstrap';

export default class AddTeam extends React.Component {
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
                <h1>Administrateurs</h1>

                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Ajouter un administrateur</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Prenom, Nom</InputGroupAddon>
                                <Input placeholder="username" />
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                                <Input placeholder="username" />
                            </InputGroup>
                            <Button>Ajouter</Button>
                        </CardBody>
                    </Card>
                </Collapse>

                <Breadcrumb>
                    <BreadcrumbItem active>Admin 1</BreadcrumbItem>
                    <Button close />
                </Breadcrumb>

                <Breadcrumb>
                    <BreadcrumbItem active>Admin 2</BreadcrumbItem>
                    <Button close />
                </Breadcrumb>


                <Card body>
                    <Button>Enregistrer les modifications</Button>
                </Card>
            </div>

        );
    }
}