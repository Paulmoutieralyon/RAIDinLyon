import React from 'react';
import { CardFooter, Button, Input, Label, FormGroup } from 'reactstrap';
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import generator from 'generate-password'

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

// const telephoneRegex = RegExp(
//     /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
// ;

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

export default class AddTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: null,
            participants: [],
            email: null,
            telephone: null,
            formErrors: {
                nom: "",
                participants: "",
                email: "",
                telephone: "",
                titre: "",
            }
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

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(`
            titre: ${this.state.titre}
            email: ${this.state.email}
            participants: ${this.state.participants}
            telephone: ${this.state.telephone}
            `);
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        console.log(" Titre :", name)
        console.log(" Value :", value)
        

        switch (name) {
            case 'titre':
                formErrors.titre =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;

            case 'email':
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid Email address";
                break;

            case 'telephone':
                formErrors.telephone =
                value.length < 10 ? " minimum 10 characteres required" : "";
                break;

            case 'participants':
                formErrors.participants =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };





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
                console.log("YES", response);
                return <div>Ajout de l'équipe avec succès</div>
            })
            .catch(function (error) {
                console.log("MERDE", error);
            });
        window.location.href = 'ListTeam';
    }

    render() {
        const { formErrors } = this.state;
        return (
            <div>

                <h3>Création d'une équipe </h3>

                <FormGroup>
                    <Label for="exampleEmail">Titre de l'équipe</Label>
                    <Input
                        className={formErrors.titre > 0 ? "error" : null}
                        required
                        type="titre"
                        name="titre"
                        id="titreequipe"
                        noValidate
                        onChange={this.modifyNom}
                        onChange={this.handleChange}
                    />
                    {formErrors.titre.length > 0 && (
                        <span className="errorMessage">{formErrors.titre}</span>
                    )}
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">E-mail de l'équipe</Label>
                    <Input
                        className={formErrors.email.length > 0 ? "error" : null}
                        type="email"
                        name="email"
                        id="emailequipe"
                        noValidate
                        onChange={this.modifyEmail}
                        onChange={this.handleChange}
                    />
                    {formErrors.email.length > 0 && (
                        <span className="errorMessage">{formErrors.email}</span>
                    )}
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Téléphone de l'équipe</Label>
                    <Input
                        className={formErrors.telephone.length > 0 ? "error" : null}
                        type="phone"
                        name="phone"
                        id="phoneequipe"
                        noValidate
                        onChange={this.modifyTelephone}
                        onChange={this.handleChange}
                    />
                    {formErrors.telephone.length > 0 && (
                        <span className="errorMessage">{formErrors.telephone}</span>
                    )}
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Participants</Label><br />
                    {this.state.participants.map((participants, index) => (
                        <span key={index}>
                            <Input
                                className={formErrors.participants.length > 0 ? "error" : null}
                                type="text"
                                size="2"
                                onChange={this.handleText(index)}
                                noValidate
                                value={participants}
                                
                            />
                            {formErrors.participants.length > 0 && (
                                <span className="errorMessage">{formErrors.participants}</span>
                            )}
                            <button onClick={this.handleDelete(index)}>supprimer</button>
                            <hr />
                        </span>
                    ))}
                    <Button onClick={this.addParticipants}>Add New participants</Button>

                </FormGroup>

                <CardFooter>
                    <Button onClick={this.submitTeam} noValidate>Enregistrer les modifications</Button>
                </CardFooter>
                <NavLink to="/Admin/ListTeam"><Button>Retour</Button></NavLink>

            </div>
        );
    }
}
