import React, { Component } from 'react';
import { Button, Alert, Input, FormGroup, Label, FormText } from 'reactstrap';
import Editable from 'react-x-editable';
import { NavLink } from 'react-router-dom';
import './UnEnigme.css';
const axios = require('axios');



export default class UnEnigme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enigmes: null,
            tomodify: false,

            collapse: false,
            coordonnees: [],
            titre: null,
            enonce: null,
            nouvellerep: null,
            responses: null,
            nouvelindice: null,
            indices: [],
            info: null,
            image: null
        }
        this.page = this.props.match.params._id;
        this.addResp = [];
        this.Clue1 = null;
        this.Clue2 = null;
        this.Clue3 = null;
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/enigmes/${this.page}`)
            .then(response => {
                this.setState({
                    enigmes: response.data
                })
            })
    }

    changeInput = (e) => {
        this.setState({
            tomodify: !this.state.tomodify
        })
        console.log(e)
    }

    modifyImage = (e) => {
        this.setState({
            image: e.target.value
        })
    }

    modifyTitle = (value) => {
        this.setState({
            titre: value
        })
    }

    modifyAnnouncement = (value) => {
        this.setState({
            enonce: value
        })
    }

    modifyQuestion = (value) => {
        this.setState({
            question: value
        })
    }
    /* _________________________________
    MODIFICATION REPONSES
    _________________________________ */

    addResponse = (value) => {
        this.setState({
            responses: value
        })
    }
    /* ________________________________
    MODIFICATION INDICES
    _________________________________ */

    add1Clue = (value) => {
        const indices = this.state.indices.slice()
        indices[0] = value
        this.setState({ indices: indices })
    }
    add2Clue = (value) => {
        const indices = this.state.indices.slice()
        indices[1] = value
        this.setState({ indices: indices })
    }
    add3Clue = (value) => {
        const indices = this.state.indices.slice()
        indices[2] = value
        this.setState({ indices: indices })
    }

    /* ________________________________
    MODIFICATION LOCALISATION
    _________________________________ */

    modifyLat = (value) => {
        const newLat = this.state.coordonnees.slice()
        newLat[0] = value
        this.setState({ coordonnees: newLat })
    }
    modifyLong = (value) => {
        const newLong = this.state.coordonnees.slice()
        newLong[1] = value
        this.setState({ coordonnees: newLong })
    }
    modifyInfo = (value) => {
        this.setState({
            info: value
        })
    }


    sendModifications = () => {
        axios.put(`http://localhost:5000/api/enigmes/${this.page}`,
            {
                titre: this.state.titre,
                question: this.state.question,
                enonce: this.state.enonce,
                indices: [this.state.indices[0], this.state.indices[1], this.state.indices[2]],
                info: this.state.info,
                coordonnee: [this.state.coordonnees[0], this.state.coordonnees[1]],
                img: this.state.image,
                reponse: this.state.responses,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        { console.log(this.state.titre) }
        return (
            <div>
                {this.state.enigmes ?
                    <div>
                        <Alert color="dark">
                            Titre :
                            <Editable
                                name="username"
                                dataType="text"
                                value={this.state.enigmes[0].titre}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.modifyTitle(value)
                                    }
                                }
                                }
                            />
                        </Alert>

                        <Alert color="dark">
                            Image utilisée : {this.state.enigmes[0].img}
                           

                            <FormGroup>
                                <Label >Image : </Label>
                                <Input onChange={this.modifyImage} />
                            </FormGroup>
                        </Alert>
                        <Alert color="dark">
                            Énoncé : <Editable
                                name="username"
                                dataType="textarea"
                                value={this.state.enigmes[0].enonce}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.modifyAnnouncement(value)
                                    }
                                }
                                }
                            />

                        </Alert>
                        <Alert color="dark">
                            Question : <Editable
                                name="username"
                                dataType="textarea"
                                value={this.state.enigmes[0].question}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.modifyQuestion(value)
                                    }
                                }
                                }
                            />
                        </Alert>
                        <Alert color="dark">
                            Indices :
                        <Editable
                                name="username"
                                dataType="text"
                                value={this.state.enigmes[0].indices[0]}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.add1Clue(value)
                                    }
                                }
                                }
                            />
                            <Editable
                                name="username"
                                dataType="text"
                                value={this.state.enigmes[0].indices[1]}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.add2Clue(value)
                                    }
                                }
                                }
                            />
                            <Editable
                                name="username"
                                dataType="text"
                                value={this.state.enigmes[0].indices[2]}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.add3Clue(value)
                                    }
                                }
                                }
                            />
                        </Alert>
                        <Alert color="dark">
                            <Editable
                                name="username"
                                dataType="text"
                                value={this.state.enigmes[0].reponse}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.addResponse(value)
                                    }
                                }
                                }
                            />
                        </Alert>
                        <h3>Informations géographiques :</h3>
                        <Alert color="dark">
                            Coordonnées :
                            Lattitude <Editable
                                name="username"
                                dataType="text"
                                value={this.state.enigmes[0].coordonnee[0]}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.modifyLat(value)
                                    }
                                }
                                }
                            />
                            ; Longitude -
                            <Editable
                                name="username"
                                dataType="text"
                                value={this.state.enigmes[0].coordonnee[1]}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.modifyLong(value)
                                    }
                                }
                                }
                            />
                        </Alert>
                        <Alert color="dark">
                            Précautions sur le lieu :
                            <Editable
                                name="username"
                                dataType="text"
                                value={this.state.enigmes[0].info}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.modifyInfo(value)
                                    }
                                }
                                }
                            />
                        </Alert>
                    </div>
                    : null}
                <NavLink to='/Admin/ListEnigmes'>
                    <Button>Retour</Button>
                </NavLink>
            </div>


        );
    }
}


   