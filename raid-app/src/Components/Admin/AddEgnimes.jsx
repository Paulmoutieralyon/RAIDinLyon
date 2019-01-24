import React from 'react';
import ReactDOM from "react-dom";

import { Button, Card, Input, Label, FormGroup, FormText } from 'reactstrap';
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import './AddEnigme.css';


function validateform(enonce, lat, long){
    const errors = [];
    if (enonce.length === 0) {
        errors.push("L'ennonce doit être remplis");
    }
    if (lat.length === 0) {
        errors.push("La Latitude doit être remplis");
    }
    if (long.length === 0) {
        errors.push("La longitude doit être remplis");
    }
    return errors;
}

export default class AddEgnimes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            coordonnees: [],
            titre: null,
            enonce: null,
            nouvellerep: null,
            responses: null,
            nouvelindice: null,
            indices: [],
            info: null,
            image: null,
            points: null,
            errors: [],
        };
        this.addResp = [];
        this.Clue1 = null;
        this.Clue2 = null;
        this.Clue3 = null;
    }


    /* Ajout d'une image */
    modifyImage = (e) => {
        this.setState({
            image: e.target.value
        })
    }

    /* Modification du titre*/
    modifyTitle = (e) => {
        this.setState({
            titre: e.target.value
        })
    }
    /* Modification de l'énnonce */
    modifyAnnouncement = (e) => {
        this.setState({
            enonce: e.target.value
        })
    }

    /* Modification de la question */
    modifyQuestion = (e) => {
        this.setState({
            question: e.target.value
        })
    }


    /* _________________________________
    Reponses et points
    _________________________________ */

    /* Ajout de la réponse */
    addResponse = (e) => {
        this.setState({
            responses: e.target.value
        })
    }

    /* Ajout des points pour cette enigme */
    addPoints = (e) => {
        this.setState({
            points: e.target.value
        })
    }


    /* ________________________________
    INDICES
    _________________________________ */


    /* Ajout des indices */
    add1Clue = (e) => {
        const indices = this.state.indices.slice()
        indices[0] = e.target.value
        this.setState({ indices: indices })

    }

    add2Clue = (e) => {
        const indices = this.state.indices.slice()
        indices[1] = e.target.value
        this.setState({ indices: indices })
    }

    add3Clue = (e) => {
        const indices = this.state.indices.slice()
        indices[2] = e.target.value
        this.setState({ indices: indices })
    }

    /* ________________________________
    LOCALISATION
    _________________________________ */

    modifyLat = (e) => {
        const newLat = this.state.coordonnees.slice()
        newLat[0] = e.target.value
        this.setState({ coordonnees: newLat })
    }
    modifyLong = (e) => {
        const newLong = this.state.coordonnees.slice()
        newLong[1] = e.target.value
        this.setState({ coordonnees: newLong })
    }

    modifyInfo = (e) => {
        this.setState({
            info: e.target.value
        })
    }

    
    
    /* Soumissions de l'énigme - Stockage de celle ci en base de donnée */
    submit = () => {
        const enonce = ReactDOM.findDOMNode(this._enonceInput).value;
        const lat = ReactDOM.findDOMNode(this._latInput).value;
        const long = ReactDOM.findDOMNode(this._longInput).value;

        const errors = validateform (enonce, lat, long);
        if (errors.length > 0) {
            this.setState({errors});
            return
        }
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/enigmes',
            data: {
                titre: this.state.titre,
                question: this.state.question,
                enonce: this.state.enonce,
                indices: this.state.indices,
                info: this.state.info,
                coordonnee: this.state.coordonnees,
                img: this.state.image,
                reponse: this.state.responses,
                agagner: this.state.points,
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        window.location.href = 'ListEnigmes';

    }

    render() {
        const { errors } = this.state;
        console.log(this.state.points)
        return (
            <div>

                <h3>Création d'une énigme </h3>
                <FormGroup >{errors.map(error => (<p key={error}> Error: {error}</p>))}
                    <Label for="exampleFile">Image</Label>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText color="muted">
                        Importer une image pour cette session
</FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">URL d'une image d'illustration</Label>
                    <Input type="titre" name="titre" id="titreennigme" onChange={this.modifyImage} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Titre énigme</Label>
                    <Input
                        type="titre"
                        name="titre"
                        id="titreennigme"
                        onChange={this.modifyTitle}
                        noValidate
                    />

                </FormGroup>

                <FormGroup>
                    <Label for="exampleText">Énoncé</Label>
                    <small className="obligatoire"> (*obligatoire)</small>
                    <Input
                        type="textarea"
                        ref={enonceInput => (this._enonceInput = enonceInput)}
                        name="text"
                        id="exampleText"
                        onChange={this.modifyAnnouncement}
                        noValidate
                    />

                </FormGroup>

                <FormGroup>
                    <Label for="exampleText">Question</Label>
                    <Input
                        type="textarea"
                        name="text"
                        id="exampleText"
                        onChange={this.modifyQuestion}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleText">Réponse</Label>
                    <Input
                        type="textarea"
                        name="text"
                        id="exampleText"
                        onChange={this.addResponse}
                        noValidate
                    />
                    
                </FormGroup>

                <FormGroup>
                    <Label for="exampleText">Points à gagner pour cette énigme</Label>
                    <Input
                        type="text"
                        name="text"
                        id="exampleText"
                        onChange={this.addPoints}
                        noValidate
                    />
                    
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Indices</Label>
                    <Input
                        type="indice"
                        name="indice"
                        placeholder="Indice #1"
                        onChange={this.add1Clue}
                    />
                    <Input
                        type="indice"
                        name="indice"
                        placeholder="Indice #2"
                        onChange={this.add2Clue}
                    />
                    <Input
                        type="indice"
                        name="indice"
                        placeholder="Indice #3"
                        onChange={this.add3Clue}
                    />
                </FormGroup>


                <h3>Localisation</h3>
                <FormGroup>
                    <Label for="exampleEmail">Lattitude</Label>
                    <small className="obligatoire"> (*obligatoire)</small>
                    <Input
                        type="titre"
                        name="titre"
                        id="titreennigme"
                        onChange={this.modifyLat}
                        ref={latInput => (this._latInput = latInput)}
                        noValidate
                        require='required'
                    />
                    

                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Longitude</Label>
                    <small className="obligatoire"> (*obligatoire)</small>
                    <Input
                        type="titre"
                        name="titre"
                        id="titreennigme"
                        onChange={this.modifyLong}
                        ref={longInput => (this._longInput = longInput)}
                        noValidate
                        require='required'
                    />
                    

                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Règles du lieu</Label>
                    <Input
                        type="titre"
                        name="titre"
                        id="titreennigme"
                        onChange={this.modifyInfo}
                    />
                </FormGroup>

                <Card body>
                    <Button onClick={this.submit}>Enregistrer les modifications</Button>

                </Card>
                <NavLink to="/Admin/ListEnigmes"><Button>Retour</Button></NavLink>
            </div>
        );
    }
}

