
import React from 'react';
import { Breadcrumb, BreadcrumbItem, Collapse, Button, CardBody, Card, InputGroup, InputGroupAddon, Input, Label, FormGroup } from 'reactstrap';
import axios from 'axios'

export default class AddEgnimes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            coordonnees: [],
            titre: null,
            enonce: null,
            nouvellerep: null,
            responses: [],
            nouvelindice: null,
            indices: [],
            info: null,
            image: null
        };
        this.addResp = [];
        this.addClu = [];
    }

    /* Questionnaire déroulant d'ajout d'une reponse */
    toggle = () => {
        this.setState({
            collapse: !this.state.collapse
        });
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

    delete = (e) => {

    }
    /* _________________________________
                Reponses
    _________________________________ */

    /* Stockage momentané de la réponse en cours de rédaction */
    momentaryResp = (e) => {
        this.setState({
            nouvellerep: e.target.value
        })
    }

    /* Stockage  de la réponse*/
    addResponse = (e) => {
        this.addResp.push(this.state.nouvellerep)
        this.setState({
            responses: this.addResp,
            /*collapse: !this.state.collapse*/
        })
    }

    /* Affichage des réponses*/
    responseList = (e) => {
        return this.state.responses.map((x, index) => {
            return (
                <Breadcrumb id="zone">
                    <BreadcrumbItem active>{x}</BreadcrumbItem>
                    <Button close />
                </Breadcrumb>
            )
        })
    }

    /* Rassemblement des fonctions declenchées par OnClick lors de l'ajout d'une reponse*/
    rassemblement = (e) => {
        this.addResponse();
        this.responseList();
    }

    /* ________________________________
                INDICES
    _________________________________ */

    /* Stockage  de l'indice'*/
    addClue = (e) => {
        this.addClu.push(this.state.nouvellerep)
        this.setState({
            indices: this.addClu,
            /*collapse: !this.state.collapse*/
        })
    }

    /* Affichage des indices*/
    clueList = (e) => {
        return this.state.indices.map((x, index) => {
            return (
                <Breadcrumb>
                    <BreadcrumbItem active>{x}</BreadcrumbItem>
                    <Button close/>
                </Breadcrumb>
            )
        })
    } 

    /* Rassemblement des fonctions declenchées par OnClick lors de l'ajout d'une reponse*/
    rassemblementClue = (e) => {
        this.addClue();
        this.clueList()
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
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/enigmes',
            data: {
                titre: this.state.titre,
                question: this.state.question,
                coordonnees: this.state.coordonnees,
                reponses: this.state.responses,
                enonce: this.state.enonce,
                indices: this.state.indices,
                info: this.state.info,
                url_image: this.state.image
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
        return (
            <div>

                <h3>Création d'une énigme </h3>
                <FormGroup>
                    <Label for="exampleEmail">URL d'une image d'illustration</Label>
                    <Input type="titre" name="titre" id="titreennigme" onChange={this.modifyImage} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Titre énigme</Label>
                    <Input type="titre" name="titre" id="titreennigme" onChange={this.modifyTitle} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleText">Énoncé</Label>
                    <Input type="textarea" name="text" id="exampleText" onChange={this.modifyAnnouncement} />
                </FormGroup>

                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Ajouter une reponse / un indice</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend"></InputGroupAddon>
                                <Input type="reponse" placeholder="Tapez une réponse / un indice" onChange={this.momentaryResp} />
                            </InputGroup>
                            <Button onClick={this.rassemblement} >Ajouter une reponse</Button>
                            <Button onClick={this.rassemblementClue} >Ajouter un indice</Button>
                        </CardBody>
                    </Card>
                </Collapse>
                <h5>Réponses possible : </h5>
                {this.responseList()}
                <h5>Indices : </h5>
                {this.clueList()}



                <h3>Localisation</h3>
                <FormGroup>
                    <Label for="exampleEmail">Lattitude</Label>
                    <Input type="titre" name="titre" id="titreennigme" onChange={this.modifyLat} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Longitude</Label>
                    <Input type="titre" name="titre" id="titreennigme" onChange={this.modifyLong} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Règles du lieu</Label>
                    <Input type="titre" name="titre" id="titreennigme" onChange={this.modifyInfo} />
                </FormGroup>


                <Card body>
                    <Button onClick={this.submit}>Enregistrer les modifications</Button>
                </Card>
            </div>
        );
    }
}
