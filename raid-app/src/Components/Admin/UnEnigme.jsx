import React, { Component } from 'react';
import { Button, Alert, Input, FormGroup, Label, FormText } from 'reactstrap';
import Editable from 'react-x-editable';
import { NavLink } from 'react-router-dom';
import './UnEnigme.css';
import './ListEnigmes.css';
import './SessionPage.css';
import "react-toggle-component/styles.css";
import { FaScroll, FaChevronLeft } from 'react-icons/fa'
const axios = require('axios');


export default class UnEnigme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            button: "invisible",
            collapse: false,
            coordonnees: [],
            titre: null,
            enonce: null,
            question: null,
            nouvellerep: null,
            reponse: null,
            nouvelindice: null,
            indices: [],
            info: null,
            image: null,
            id: null,
            agagner: null
        }
        this.page = this.props.match.params.id;
        this.addResp = [];
        this.Clue1 = null;
        this.Clue2 = null;
        this.Clue3 = null;
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/enigmes/${this.page}`)
            .then(response => {
                console.log(response)
                console.log('ok', response.data[0].indices)
                this.setState({
                    id: response.data[0]._id,
                    titre: response.data[0].titre,
                    img: response.data[0].img,
                    enonce: response.data[0].enonce,
                    question: response.data[0].question,
                    indices: response.data[0].indices,
                    reponse: response.data[0].reponse,
                    coordonnees: response.data[0].coordonnee,
                    info: response.data[0].info,
                    agagner: response.data[0].agagner
                })
            })
            .then(console.log('ok', this.state.indices))
    }

    modifyImage = (value) => {
        this.setState({
            img: value,
            button: "visible"
        })
    }

    modifyTitle = (value) => {
        this.setState({
            titre: value,
            button: "visible"
        })
    }

    modifyAnnouncement = (value) => {
        this.setState({
            enonce: value,
            button: "visible"
        })
    }

    modifyQuestion = (value) => {
        this.setState({
            question: value,
            button: "visible"
        })
    }
    /* _________________________________
    MODIFICATION REPONSES
    _________________________________ */

    addResponse = (value) => {
        this.setState({
            responses: value,
            button: "visible"
        })
    }
    /* ________________________________
    MODIFICATION INDICES
    _________________________________ */

    add1Clue = (value) => {
        const indices = this.state.indices.slice()
        indices[0] = value
        this.setState({ indices: indices, button: "visible" })
    }
    add2Clue = (value) => {
        const indices = this.state.indices.slice()
        indices[1] = value
        this.setState({ indices: indices, button: "visible" })
    }
    add3Clue = (value) => {
        const indices = this.state.indices.slice()
        indices[2] = value
        this.setState({ indices: indices, button: "visible" })
    }

    /* ________________________________
    MODIFICATION LOCALISATION
    _________________________________ */

    modifyLat = (value) => {
        const newLat = this.state.coordonnees.slice()
        newLat[0] = value
        this.setState({ coordonnees: newLat, button: "visible" })
    }
    modifyLong = (value) => {
        const newLong = this.state.coordonnees.slice()
        newLong[1] = value
        this.setState({ coordonnees: newLong, button: "visible" })
    }
    modifyInfo = (value) => {
        this.setState({
            info: value,
            button: "visible"
        })
    }


    sendModifications = () => {
        console.log(this.state)
        axios.put(`http://localhost:5000/api/enigmes/${this.page}`,
            {
                titre: this.state.titre,
                question: this.state.question,
                enonce: this.state.enonce,
                indices: [this.state.indices[0], this.state.indices[1], this.state.indices[2]],
                info: this.state.info,
                coordonnee: [this.state.coordonnees[0], this.state.coordonnees[1]],
                img: this.state.img,
                reponse: this.state.reponse,
                agagner: this.state.agagner
            })
            .then(function (response) {
                console.log(response)
                if (response.status === 200) {
                    window.location.href = `/Admin/ListEnigmes/${window.localStorage.getItem('idAdmin')}`
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        return (
            <Button>
            <div className='textButtonUne'>

                {this.state.titre ?
                    <div>
                        <Alert 
                        color="dark">
                            Id Enigme {this.state.id}
                        </Alert>

                        <Alert 
                        className="id"
                        color="dark">
                        
                        <p className="titre">Titre : </p>
                            <Editable
                                className="id"
                                name="username"
                                dataType="text"
                                value={this.state.titre}
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

                        <Alert className="id"
                        color="dark">
                            <p className="titre">Points à gagner :</p>
                            <Editable
                                className="titre"
                                name="agagner"
                                dataType="number"
                                value={this.state.agagner}
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

                        
                        <Alert className="id"
                        color="dark">
                             <p className="titre">Énoncé :</p><Editable
                                name="username"
                                dataType="textarea"
                                value={this.state.enonce}
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
                        <Alert className="id"
                        color="dark">
                             <p className="titre">Question : </p><Editable
                                name="username"
                                dataType="textarea"
                                value={this.state.question}
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
                        <Alert className="id"
                        color="dark">
                            <p className="titre"> Indices : </p>
                        <Editable
                                name="username"
                                dataType="text"
                                value={this.state.indices[0]}
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
                                value={this.state.indices[1]}
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
                                value={this.state.indices[2]}
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
                        <Alert className="id"
                        color="dark">
                            <p className="titre"> Réponse : </p>
                            <Editable
                                name="username"
                                dataType="text"
                                value={this.state.reponse}
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
                        <h3 className="edit">Informations géographiques du lieu :</h3>
                        <Alert className="id"
                        color="dark">
                            <p className="titre">Lattitude : </p> <Editable
                                name="username"
                                dataType="text"
                                value={this.state.coordonnees[0]}
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
                            <p className="titre">Longitude : </p>
                            <Editable
                                name="username"
                                dataType="text"
                                value={this.state.coordonnees[1]}
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
                        <Alert className="id"
                        color="dark">
                            <p className="titre">Précautions sur le lieu : </p>
                            <Editable
                                name="username"
                                dataType="text"
                                value={this.state.info}
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
                <Button className={this.state.button} onClick={this.sendModifications}>Valider les modifications</Button>
                < Button className="buttonMenu">
                <NavLink to={`/Admin/ListEnigmes/${window.localStorage.getItem('idAdmin')}`}>
                <p className="textButton">Retour</p>
                </NavLink>
                <div className='textButtonIcon'>
                        <FaChevronLeft />
                    </div>
                </Button>
            </div>
            </Button>
        );
    }
}


