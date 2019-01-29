import React from 'react';
import { Button, Card, Input, Label, FormGroup, FormText } from 'reactstrap';
import axios from 'axios'
import { NavLink, BrowserRouter } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
import ReactDOM from "react-dom";
import './AddEnigme.css';

function validateform(enonce, lat, long, file) {
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
    if (file.length === 0) {
        errors.push(" Fichiers doit être remplis ");
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
            errors: [],
            info: null,
            image: null,
            selectedFile: null,
            agagner: null
        };
        this.addResp = [];
        this.Clue1 = null;
        this.Clue2 = null;
        this.Clue3 = null;
        this.fileInput = React.createRef();
        this.idAdmin = this.props.match.params._id
    }
    /*Chargement de l'image*/

    submitFile = (event) => {
        event.preventDefault();
        console.log(this.fileInput)
        let data = new FormData();
        data.append('image', this.fileInput.current.files[0]);
        const config = {
            onUploadProgress: function (progressEvent) {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(percentCompleted)
            }
        };
        console.log('up', data)


        axios.post('/api/image', data, config)
            .then(result => {
                console.log(result)
            })
        this.submit();
    }

    /* Ajout d'une image */
    modifyImage = (e) => {
        this.setState({
            image: e.target.value
        })
    }

    addImg = (e) => {
        this.setState({
            responses: e.target.value
        })
        console.log(this.state.image)
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
    Reponses
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
            agagner: e.target.value
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
        newLat[0] = parseFloat(e.target.value)
        this.setState({ coordonnees: newLat })
    }
    modifyLong = (e) => {
        const newLong = this.state.coordonnees.slice()
        newLong[1] = parseFloat(e.target.value)
        this.setState({ coordonnees: newLong })
    }
    modifyInfo = (e) => {
        this.setState({
            info: e.target.value
        })
    }

    /* Soumissions de l'énigme - Stockage de celle ci en base de donnée */
    submit = (e) => {
        e.preventDefault()
        console.log(this.fileInput)
        const data = new FormData();
        console.log(this.state.coordonnees)
        // Object.entries({
        //     titre: this.state.titre,
        //     question: this.state.question,
        //     enonce: this.state.enonce,
        //     indices: this.state.indices,
        //     info: this.state.info,
        //     img: this.state.image,
        //     reponse: this.state.responses,
        // }).map(entry => {
        //     data.append(entry[0], entry[1]);
        // })
        // data.append('indices', JSON.stringify(this.state.indices))
        // data.append('coordonnee', JSON.stringify(this.state.coordonnees))
        data.append('image', this.fileInput.current.files[0])
        data.append('body', JSON.stringify({
            titre: this.state.titre,
            question: this.state.question,
            enonce: this.state.enonce,
            indices: this.state.indices,
            info: this.state.info,
            img: this.state.image,
            reponse: this.state.responses,
            coordonnee: this.state.coordonnees,
            agagner: this.state.agagner
        }))


        const enonce = ReactDOM.findDOMNode(this._enonceInput).value;
        const lat = ReactDOM.findDOMNode(this._latInput).value;
        const long = ReactDOM.findDOMNode(this._longInput).value;
        const file = this.fileInput.current.files;

        const errors = validateform(enonce, lat, long, file);
        if (errors.length > 0) {
            this.setState({ errors });
            return
        }
        axios({
            method: 'post',
            url: '/api/enigmes',
            data
        })
            .then(function (response) {
                console.log(response)
                if (response.status === 200) {

                    window.location.href = `/Admin/ListEnigmes/${window.localStorage.getItem('idAdmin')}`

                }
            }
            )
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { errors } = this.state;
        //console.log(this.state.indices)
        const token = localStorage.getItem('token');
        return (
            <div>

                <h3>Création d'une énigme </h3>

                Hello {token}<br />
                <form>
                    <FormGroup>{errors.map(error => (<p key={error}> Error: {error}</p>))}
                        <Label for="exampleFile">File</Label>
                        <input type="file" name="file" id="exampleFile" 
                        // ref={fileInput => (this._fileInput = fileInput)}
                        ref={this.fileInput} />
                        <small className="obligatoire"> (*obligatoire)</small>
                        <FormText color="muted">
                            This is some placeholder block-level help text for the above input.
                            It's a bit lighter and easily wraps to a new line.
                    </FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Titre énigme</Label>
                        <Input type="titre" name="titre" id="titreennigme" onChange={this.modifyTitle} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleText">Énoncé</Label>
                        <small className="obligatoire"> (*obligatoire)</small>
                        <Input type="textarea" name="text" id="exampleText"
                            ref={enonceInput => (this._enonceInput = enonceInput)}
                            onChange={this.modifyAnnouncement} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleText">Question</Label>
                        
                        <Input type="textarea" name="text" id="exampleText" onChange={this.modifyQuestion} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleText">Réponse</Label>
                        <Input type="textarea" name="text" id="exampleText" onChange={this.addResponse} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleText">Points à gagner pour cette énigme</Label>
                        <Input type="text" name="text" id="exampleText" onChange={this.addPoints} />
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
                        <Input type="titre" name="titre" id="titreennigme"
                            ref={latInput => (this._latInput = latInput)}
                            onChange={this.modifyLat} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Longitude</Label>
                        <small className="obligatoire"> (*obligatoire)</small>
                        <Input type="titre" name="titre"
                            ref={longInput => (this._longInput = longInput)}
                            id="titreennigme" onChange={this.modifyLong} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Règles du lieu</Label>
                        <Input type="titre" name="titre" id="titreennigme" onChange={this.modifyInfo} />
                    </FormGroup>
                </form>

                <Card body>
                    <NavLink to={`/Admin/ListEnigmes/${window.localStorage.getItem('idAdmin')}`}>
                        <Button onClick={this.submit}>Enregistrer les modifications</Button>
                    </NavLink>
                </Card>
                <NavLink to={`/Admin/ListEnigmes/${window.localStorage.getItem('idAdmin')}`}><Button>Retour</Button></NavLink>
            </div>
        );
    }
}

