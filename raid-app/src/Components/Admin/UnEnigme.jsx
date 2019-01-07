import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
const axios = require('axios');


export default class UnEnigme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enigmes: null,
        }
        this.page = this.props.match.params.id
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/enigmes/${this.page}`)
            .then(response => {
                this.setState({
                    enigmes: response.data
                })
            })
    }


    render() {

        return (
            <div>
                {this.state.enigmes ?
                    <div>
                        <h1>Titre : {this.state.enigmes[0].titre}</h1>
                        <h3>Image utilisée : {this.state.enigmes[0].img}</h3>
                        <h3> Énoncé : {this.state.enigmes[0].enonce}</h3>
                        <h3> Question : {this.state.enigmes[0].question}</h3>
                        <h3> Indices : {this.state.enigmes[0].indices}</h3>
                        <h3> Réponse : {this.state.enigmes[0].reponse}</h3>
                        <h3>Informations géographiques :</h3>
                        <h3> Coordonnées : Lattitude - {this.state.enigmes[0].coordonnee[0]} ; Longitude - {this.state.enigmes[0].coordonnee[1]} </h3>
                        <h3> Précautions sur le lieu : {this.state.enigmes[0].info}</h3>
                    </div>
                    : null}
                <NavLink to='/Admin/ListEnigmes'>
                    <Button>Retour</Button>
                </NavLink>
            </div>


        );
    }
}

