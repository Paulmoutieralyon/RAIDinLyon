import React from 'react';
import { Button, Card, Input, Label, FormGroup, FormText } from 'reactstrap';
import axios from 'axios'
import { NavLink } from 'react-router-dom';

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
            formErrors: {
                titre: "",
                enonce: "",
                nouvellerep: "",
                responses: "",
                nouvelindice: "",
                indices: "",
                lat: "",
                long: "",
                points: "",
            }
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
    addPoints= (e) => {
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


    handleSubmit = e => {
        e.preventDefault();
        
        if (formValid(this.state)) {
            console.log(`
            titre: ${this.state.titre}
            enonce: ${this.state.enonce}
            nouvellerep: ${this.state.nouvellerep}
            responses: ${this.state.responses}
            nouvelinces: ${this.state.nouvelindice}
            indices: ${this.state.indices}
            lat: ${this.state.lat}
            long: ${this.state.long}
            point: ${this.state.points}
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

            case 'enonce':
                formErrors.enonce =
                value.length < 3 ? "minimum 3 characaters required" : "";
                break;

            case 'nouvellerep':
                formErrors.nouvellerep =
                value.length < 3 ? "minimum 3 characaters required" : "";
                break;

            case 'nouvelleindice':
                formErrors.nouvelindice =
                value.length < 3 ? "minimum 3 characaters required" : "";
                break;

            case 'lat':
                formErrors.lat =
                value.length < 3 ? "minimum 3 characaters required" : "";
                break;

            case 'long':
                formErrors.long =
                value.length < 3 ? "minimum 3 characaters required" : "";
                break;

            case 'points':
                formErrors.points =
                value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case 'responses':
                formErrors.responses =
                value.length < 3 ? "minimum 3 characaters required" : "";
                break;

            case 'indices':
                formErrors.indices =
                value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };



    /* Soumissions de l'énigme - Stockage de celle ci en base de donnée */
    submit = () => {
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
        const { formErrors } = this.state;
        console.log(this.state.points)
        return (
            <div>

                <h3>Création d'une énigme </h3>
                <FormGroup>
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
                    className={formErrors.titre > 0 ? "error" : null}
                    type="titre" 
                    name="titre" 
                    id="titreennigme" 
                    onChange={this.modifyTitle} 
                    onChange={this.handleChange}
                    noValidate
                    />
                    {formErrors.titre.length > 0 && (
                        <span className="errorMessage">{formErrors.titre}</span>
                    )}
                    
                </FormGroup>

                <FormGroup>
                    <Label for="exampleText">Énoncé</Label>
                    <Input 
                    className={formErrors.enonce > 0 ? "error" : null}
                    type="textarea" 
                    name="text" 
                    id="exampleText" 
                    onChange={this.modifyAnnouncement} 
                    onChange={this.handleChange}
                    noValidate
                    />
                    <small>*obligatoire</small>
                    {formErrors.enonce.length > 0 && (
                        <span className="errorMessage">{formErrors.enonce}</span>
                    )}
                    
                </FormGroup>

                <FormGroup>
                    <Label for="exampleText">Question</Label>
                    <Input
                    type="textarea" 
                    name="text" 
                    id="exampleText" 
                    onChange={this.modifyQuestion} 
                    onChange={this.handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleText">Réponse</Label>
                    <Input 
                    className={formErrors.responses > 0 ? "error" : null}
                    type="textarea" 
                    name="text" 
                    id="exampleText" 
                    onChange={this.addResponse} 
                    onChange={this.handleChange}
                    noValidate
                    />
                    {formErrors.responses.length > 0 && (
                        <span className="errorMessage">{formErrors.responses}</span>
                    )}
                </FormGroup>

                <FormGroup>
                    <Label for="exampleText">Points à gagner pour cette énigme</Label>
                    <Input 
                    className={formErrors.points > 0 ? "error" : null}
                    type="text" 
                    name="text" 
                    id="exampleText" 
                    onChange={this.addPoints} 
                    onChange={this.handleChange}
                    noValidate
                    />
                    {formErrors.points.length > 0 && (
                        <span className="errorMessage">{formErrors.points}</span>
                    )}
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Indices</Label>
                    <Input
                        className={formErrors.indices > 0 ? "error" : null}
                        type="indice"
                        name="indice"
                        placeholder="Indice #1"
                        onChange={this.add1Clue}
                        onChange={this.handleChange}
                    />
                    <Input
                        className={formErrors.indices > 0 ? "error" : null}
                        type="indice"
                        name="indice"
                        placeholder="Indice #2"
                        onChange={this.add2Clue}
                        onChange={this.handleChange}
                    />
                    <Input
                        className={formErrors.indices > 0 ? "error" : null}
                        type="indice"
                        name="indice"
                        placeholder="Indice #3"
                        onChange={this.add3Clue}
                        onChange={this.handleChange}
                    />
                </FormGroup>


                <h3>Localisation</h3>
                <FormGroup>
                    <Label for="exampleEmail">Lattitude</Label>
                    <Input 
                    className={formErrors.lat > 0 ? "error" : null}
                    type="titre" 
                    name="titre" 
                    id="titreennigme" 
                    onChange={this.modifyLat} 
                    onChange={this.handleChange}
                    noValidate
                    />
                    {formErrors.lat.length > 0 && (
                        <span className="errorMessage">{formErrors.lat}</span>
                    )}
                    <small>*obligatoire</small>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Longitude</Label>
                    <Input
                    className={formErrors.long > 0 ? "error" : null} 
                    type="titre" 
                    name="titre" 
                    id="titreennigme" 
                    onChange={this.modifyLong} 
                    onChange={this.handleChange}
                    noValidate
                    />
                    {formErrors.long.length > 0 && (
                        <span className="errorMessage">{formErrors.long}</span>
                    )}
                    <small>*obligatoire</small>
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
                    <Button onClick={this.submit} noValidate>Enregistrer les modifications</Button>

                </Card>
                <NavLink to="/Admin/ListEnigmes"><Button>Retour</Button></NavLink>
            </div>
        );
    }
}

