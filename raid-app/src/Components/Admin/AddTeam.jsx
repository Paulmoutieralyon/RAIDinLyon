import React from 'react';
import { Row, Col, Breadcrumb, CardFooter, BreadcrumbItem, Collapse, Button, CardBody, Card, InputGroup, InputGroupAddon, Input, Label, FormGroup } from 'reactstrap';
import axios from 'axios'

export default class AddTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: null,
            participants: [],
            email: null,
            telephone: null
        };
    }

    /* Modification du nom de l'quipe*/
    modifyNom = (e) => {
        this.setState({
            nom: e.target.value
        })
    }

    /* Modification du mail*/
    modifyEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    /* Modification du phone*/
    modifyTelephone = (e) => {
        this.setState({
            telephone: e.target.value
        })
    }

    /* ________________________________
                participants
    _________________________________ */

    handleText = i => e => {
        let participants = [...this.state.participants]
        participants[i] = e.target.value
        this.setState({
            participants
        })
    }

    handleDelete = i => e => {
        e.preventDefault()
        let participants = [
            ...this.state.participants.slice(0, i),
            ...this.state.participants.slice(i + 1)
        ]
        this.setState({
            participants
        })
    }

    addParticipants = e => {
        e.preventDefault()
        let participants = this.state.participants.concat([''])
        this.setState({
            participants
        })
    }


    /* Soumissions de l'énigme - Stockage de celle ci en base de donnée */
    submitTeam = () => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/equipe',
            data: {
                score: 0,
                nom: this.state.nom,
                email: this.state.email,
                token: null,
                participants: this.state.participants,
                telephone: this.state.telephone,
                h_fin: 0,
            }
        })
            .then(function (response) {
                console.log("YES",response);
                return <div>Ajout de l'équipe avec succès</div>
            })
            .catch(function (error) {
                console.log("MERDE",error);
            });
        window.location.href = 'ListTeam';
        console.log("DONEEEEEEEEEEEEEEEEEEEEE")
    }

    render() {
        return (
            <div>

                <h3>Création d'une équipe </h3>

                <FormGroup>
                    <Label for="exampleEmail">Titre de l'équipe</Label>
                    <Input required type="titre" name="titre" id="titreequipe" onChange={this.modifyNom} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">E-mail de l'équipe</Label>
                    <Input type="email" name="email" id="emailequipe" onChange={this.modifyEmail} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Téléphone de l'équipe</Label>
                    <Input type="phone" name="phone" id="phoneequipe" onChange={this.modifyTelephone} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Participants</Label><br />
                    {this.state.participants.map((participants, index) => (
                        <span key={index}>
                                    <Input
                                        type="text"
                                        size="2"
                                        onChange={this.handleText(index)}
                                        value={participants}
                                    />
                                    <button onClick={this.handleDelete(index)}>supprimer</button>
                             <hr />
                        </span>
                    ))}
                    <Button onClick={this.addParticipants}>Add New participants</Button>
                  
                </FormGroup>

                <CardFooter>
                    <Button onClick={this.submitTeam}>Enregistrer les modifications</Button>
                </CardFooter>
            </div>
        );
    }
}
