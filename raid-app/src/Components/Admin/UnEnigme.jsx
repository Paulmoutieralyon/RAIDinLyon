import React, { Component } from 'react';
import { Button, Alert, Card, Input, Label, FormGroup, FormText } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './UnEnigme.css';
import axios from 'axios'
import pen from './modifiable.png';


export default class UnEnigme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enigmes: null,
            invisible: "visible",
            visible: "invisible",

            coordonnees: [],
            titre: null,
            enonce: null,
            nouvellerep: null,
            responses: null,
            nouvelindice: null,
            indices: [],
            info: null,
            image: null,

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


    /* Ajout d'une image */
    modifyImage = (e) => {
        this.setState({
            image: e.target.value,
            invisible: "invisible",
            visible: "visible"
        })
    }

    /* Modification du titre*/
    modifyTitle = (e) => {
        this.setState({
            titre: e.target.value,
            invisible: "invisible",
            visible: "visible"
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
    Reponses
    _________________________________ */

    /* Ajout de la réponse */
    addResponse = (e) => {
        this.setState({
            responses: e.target.value
        })
        console.log(this.state.responses)
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

        return (
            <div>
                {this.toModify}
                {this.state.enigmes ?
                    < div>
                        <Alert color="dark">
                            <a href="#" className="alert-link"> Titre de l'énigme : </a> <b className={this.state.invisible}>{this.state.enigmes[0].titre}</b>
                            <Input className={this.state.visible} type="text" name="titre" id="titreennigme" defaultValue={this.state.enigmes[0].titre} onChange={this.modifyTitle} />
                            <img src={pen} />
                        </Alert>
                        <Alert color="dark">
                            <a href="#" className="alert-link"> Image utilisée : </a> <b className={this.state.invisible}>{this.state.enigmes[0].img}</b>
                            <img src={pen} />
                        </Alert>
                        <Alert color="dark">
                            <a href="#" className="alert-link"> Énoncé : </a> <b className={this.state.invisible}>{this.state.enigmes[0].enonce}</b>
                            <Input className={this.state.visible} type="text" name="text" id="exampleText" defaultValue={this.state.enigmes[0].enonce} onChange={this.modifyAnnouncement} />
                            <img src={pen} />
                        </Alert>
                        <Alert color="dark">
                            <a href="#" className="alert-link">Question : </a> <b className={this.state.invisible}>{this.state.enigmes[0].question}</b>
                            <Input className={this.state.visible} type="text" name="text" id="exampleText" defaultValue={this.state.enigmes[0].question} onChange={this.modifyQuestion} />
                            <img src={pen} />
                        </Alert>
                        <Alert color="dark">
                            Indices : <b className={this.state.invisible}>{this.state.enigmes[0].indices}</b>
                            <Input
                                defaultValue={this.state.enigmes[0].indices[0]}
                                className={this.state.visible}
                                type="text"
                                name="indice"
                                onChange={this.add1Clue}
                            />
                            <Input
                                defaultValue={this.state.enigmes[0].indices[1]}
                                className={this.state.visible}
                                type="text"
                                name="indice"
                                onChange={this.add2Clue}
                            />
                            <Input
                                defaultValue={this.state.enigmes[0].indices[2]}
                                className={this.state.visible}
                                type="text"
                                name="indice"
                                onChange={this.add3Clue}
                            />
                        </Alert>
                        <Alert color="dark">
                            Réponse : <b className={this.state.invisible}>{this.state.enigmes[0].reponse}</b>
                            <Input className={this.state.visible} defaultValue={this.state.enigmes[0].reponse} type="text" name="text" id="exampleText" onChange={this.addResponse} />

                        </Alert>

                        <h3>Informations géographiques :</h3>
                        <Alert color="dark">
                            Coordonnées :
                         Lattitude : - <b className={this.state.invisible}>{this.state.enigmes[0].coordonnee[0]}</b> <Input className={this.state.visible} defaultValue={this.state.enigmes[0].coordonnee[0]} type="text" name="titre" id="titreennigme" onChange={this.modifyLat} />;
                         Longitude - <b className={this.state.invisible}>{this.state.enigmes[0].coordonnee[1]}</b> <Input className={this.state.visible} defaultValue={this.state.enigmes[0].coordonnee[1]} type="text" name="titre" id="titreennigme" onChange={this.modifyLong} />
                        </Alert>
                        <Alert color="dark">
                            Précautions sur le lieu : <b className={this.state.invisible}>{this.state.enigmes[0].info}</b>
                            <Input className={this.state.visible} defaultvalue={this.state.enigmes[0].info} type="text" name="titre" id="titreennigme" onChange={this.modifyInfo} />
                        </Alert>
                    </div>
                    : null
                }
                <NavLink to='/Admin/ListEnigmes'>
                    <Button>Retour</Button>
                </NavLink>
                <Button onClick={this.toModify} className={this.state.invisible}>Modifier</Button>
                <Button onClick={this.sendModifications} className={this.state.visible}>Valider les modifications</Button>
            </div >


        );
    }
}

