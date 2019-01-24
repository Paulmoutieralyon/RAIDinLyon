import React from 'react';
import { CardFooter, Button, Input, Label, FormGroup } from 'reactstrap';
import axios from 'axios';
import ReactDOM from "react-dom";
import { NavLink } from 'react-router-dom';
import generator from 'generate-password'

function validateform(email) {
    const errors = [];
    if (email.length === 0) {
        errors.push("Email doit être remplis");
    }
    if (email.split("").filter(x => x === "@").length !== 1) {
        errors.push("Email should contain a @");
    }
    if (email.indexOf(".") === -1) {
        errors.push("Email should contain at least one dot");
      }
        return errors;
    }
export default class AddTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: null,
            participants: [],
            errors: [],
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
        console.log(this.state.email)
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
        const password = generator.generate({
            length: 5,
            numbers: true,
            uppercase: false
        });
        const email = ReactDOM.findDOMNode(this._emailInput).value;

            const errors = validateform (email);
            if (errors.length > 0) {
                this.setState({errors});
                return
            }
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/equipes',
            data: {
                score: 0,
                nom: this.state.nom,
                email: this.state.email,
                password: password,
                participants: this.state.participants,
                telephone: this.state.telephone,
            }
        })
            .then(function (response) {
                if (response.status === 200) {
                    window.location.href = 'ListTeam'
                }
            })
            .catch(function (error) {
                console.log("MERDE", error);
            });
        ;
    }

    render() {
        const { errors } = this.state;
        return (
            <div>

                <h3>Création d'une équipe </h3>

                <FormGroup>{errors.map(error => (<p key={error}> Error: {error}</p>))}
                    <Label for="exampleEmail">Titre de l'équipe</Label>
                    <Input required type="titre" name="titre" id="titreequipe" onChange={this.modifyNom} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">E-mail de l'équipe</Label>
                    <small className="obligatoire"> (*obligatoire)</small>
                    <Input type="email" name="email" id="emailequipe" 
                    ref={emailInput => (this._emailInput = emailInput)}
                    onChange={this.modifyEmail} />
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
                <NavLink to={`/Admin/ListTeam/${window.localStorage.getItem('idAdmin')}`}><Button>Retour</Button></NavLink>

            </div>
        );
    }
}
