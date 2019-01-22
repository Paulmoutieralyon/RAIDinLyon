import React from 'react';
import { Button, Card, Input, Label, FormGroup, FormText } from 'reactstrap';
import axios from 'axios'
import { NavLink } from 'react-router-dom';

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
            selectedFile: null,
        };
        this.addResp = [];
        this.Clue1 = null;
        this.Clue2 = null;
        this.Clue3 = null;
        this.fileInput = React.createRef();
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
        axios.post('http://localhost:5000/api/image', data, config)
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
    /* Soumissions de l'énigme - Stockage de celle ci en base de donnée */
    submit = (e) => {
        e.preventDefault()
        console.log(this.fileInput)
        const data = new FormData();
        Object.entries({
                titre: this.state.titre,
                question: this.state.question,
                enonce: this.state.enonce,
                indices: this.state.indices,
                info: this.state.info,
                coordonnee: this.state.coordonnees,
                img: this.state.image,
                reponse: this.state.responses,
            }).map(entry => data.append(entry[0], entry[1]));

        // data.append()
        data.append('image', this.fileInput.current.files[0]);

       
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/enigmes',
            data
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        window.location.href = 'ListEnigmes';

    }

    /*onChange = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (e) => {
            const url = "http://localhost:5000/api/enigme";
            const formData = {file: e.target.value}
            return post (url, formData)
                .then(response => console.warn("result", response))
        }
    }*/

    // fileSelectedHandler = event => {
    //     this.setState({
    //         selectedFile: event.target.files[0]
    //     })
    // }

    // fileUploadHandler = () => {
    //     console.log("bijour")
    //     const fd = new FormData();
    //     fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    //     axios.post('http://localhost:5000/api/image', fd)
    //         .then(res => {
    //             console.log(res,'oui');
    //         })
    // }

    

    render() {
        //console.log(this.state.indices)
        const token = localStorage.getItem('token');
        return (
            <div>

                <h3>Création d'une énigme </h3>

                Hello {token}<br />


                {/*<FormGroup>
                    <Label for="exampleFile">Image</Label>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText color="muted">
                        Importer une image pour cette session
                </FormText>
                </FormGroup>*/}
                {/*<FormGroup>
                    <Label for="exampleEmail">URL d'une image d'illustration</Label>
                    <Input type="titre" name="titre" id="titreennigme" onChange={this.modifyImage} />
                </FormGroup>*/}
                <form>
                    <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <input type="file" name="file" id="exampleFile" ref={this.fileInput} />
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
                        <Input type="textarea" name="text" id="exampleText" onChange={this.modifyAnnouncement} />
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
                </form>

                <Card body>
                    <Button onClick={this.submit}>Enregistrer les modifications</Button>

                </Card>
                <NavLink to="/Admin/ListEnigmes"><Button>Retour</Button></NavLink>
            </div>
        );
    }
}

