import React, { Component } from 'react';
import { Button, Alert, Input, FormGroup, Label, FormText } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Editable from 'react-x-editable';
const axios = require('axios');

export default class uneTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equipe: null,
            button: "invisible",
            nom: null,
            password: null,
            telephone: null,
            participants: [],
            email: null,
            score: null,
            h_fin: null,
            id: null,

        }
        this.page = this.props.match.params._id
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/equipe/${this.page}`)
            .then(response => {
                console.log(response)
                this.setState({
                    equipe: response.data,
                    id: response.data[0]._id,
                    score: response.data[0].score,
                    password: response.data[0].password,
                    nom: response.data[0].nom,
                    email: response.data[0].email,
                    participants: response.data[0].participants,
                    telephone: response.data[0].telephone,
                    h_fin: response.data[0].h_fin,
                })
            });
            console.log(this.state.participants)
    }

    modifyNom = (value) => {
        this.setState({
            nom: value,
            button: "visible"
        })
    }

    modifyEmail = (value) => {
        this.setState({
            email: value,
            button: "visible"
        })
    }

    modifyParticipants = (value) => {
        let valeur = value.split()
        this.setState({
            participants : valeur,
            button: "visible"
        })
    }

    modifyTelephone = (value) => {
        this.setState({
            telephone: value,
            button: "visible"
        })
    }

    sendModifications = () => {
        axios.put(`http://localhost:5000/api/equipes/donnees/${this.page}`,
            {
                // equipe: response.data
                score: this.state.score,
                nom: this.state.nom,
                email: this.state.email,
                participants: this.state.participants,
                telephone: this.state.telephone,
                h_fin: this.state.h_fin,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    render() {
        console.log(this.state.participants)
        return (
            <div>

                {this.state.equipe ?
                    <div>
                        <Alert color="dark">
                            Id de l'équipe : {this.state.id}
                        </Alert>

                        <Alert color="dark">
                            Mot de passe : {this.state.password}
                        </Alert>

                        <Alert color="dark">
                            Score : {this.state.score}
                        </Alert>
                        <Alert color="dark">
                            Heure de fin de parcours : {this.state.h_fin}
                        </Alert>
                        <Alert color="dark">
                            Nom :
                            <Editable
                                name="nom d'équipe"
                                dataType="text"
                                value={this.state.nom}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.modifyNom(value)
                                    }
                                }}
                            />
                        </Alert>


                        <Alert color="dark">
                            Email : <Editable
                                name="Email"
                                dataType="text"
                                value={this.state.email}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.modifyEmail(value)
                                    }
                                }
                                }
                            />
                        </Alert>


                        <Alert color="dark">
                            Participants : <Editable
                                name="Participants"
                                dataType="textarea"
                                value={this.state.participants}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.modifyParticipants(value)
                                    }
                                }
                                }
                            />
                        </Alert>
                        <Alert color="dark">
                            Telephone : <Editable
                                name="telephone"
                                dataType="text"
                                value={this.state.telephone}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.modifyTelephone(value)
                                    }
                                }
                                }
                            />
                        </Alert>
                    </div>
                    : null}

                <NavLink to='/Admin/ListTeam'>
                    <Button className={this.state.button} onClick={this.sendModifications}>Valider les modifications</Button>
                    <Button>Retour</Button>
                </NavLink>
            </div>
        );
    }
}