
import React from 'react';
import { Breadcrumb, BreadcrumbItem, Collapse, Button, CardBody, Card, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import './AdminComptes.css'
import axios from 'axios'

export default class AddTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            email: null,
            mdp: null
        };
    }

    /* Modification de email*/
    modifyEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    /* Modification de mdp */
    modifyMdp = (e) => {
        this.setState({
            mdp: e.target.value
        })
    }

    /* Soumissions d'administrateur' - Stockage de celui ci en base de donnée */
    submit = () => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/administrateurs',
            data: {
                email: this.state.email,
                mdp: this.state.mdp,
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        window.location.href = 'ListAdmin';

    }

    endChange = () => {
        window.location.href = 'ListAdmin';
    }

    toggle = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }
    render() {
        return (
            <div class="containerAdminComptes">
                <h1>Administrateurs</h1>

                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Ajouter un administrateur</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                                <Input placeholder="username" onChange={this.modifyEmail} />
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Mot de passe</InputGroupAddon>
                                <Input placeholder="username" onChange={this.modifyMdp} />
                            </InputGroup>
                            <Button onClick={this.submit}>Ajouter</Button>
                        </CardBody>
                    </Card>
                </Collapse>

{/*                 <Breadcrumb>
                    <BreadcrumbItem active>Admin 1</BreadcrumbItem>
                    <Button close />
                </Breadcrumb>

                <Breadcrumb>
                    <BreadcrumbItem active>Admin 2</BreadcrumbItem>
                    <Button close />
                </Breadcrumb> */}


                <Card body>
                    <Button onClick={this.endChange}>Enregistrer les modifications</Button>
                </Card>
            </div>

        );
    }
}