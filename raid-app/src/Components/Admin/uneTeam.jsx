import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
const axios = require('axios');

export default class uneTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equipe: null,
        }
        this.page = this.props.match.params._id
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/equipe/${this.page}`)
            .then(response => {
                this.setState({
                    equipe: response.data
                })
            })
    }

    render() {
        return (
            <div>

                {this.state.equipe ?
                    <div>
                        <h4> Score : {this.state.equipe[0].score}</h4>
                        <h1> Nom : {this.state.equipe[0].nom}</h1>
                        <h4> Email :  {this.state.equipe[0].email}</h4>
                        <h4> Token :  {this.state.equipe[0].token}</h4>
                        <h4> Participants :  {this.state.equipe[0].participants.toString()}</h4>
                        <h4> Telephone :  {this.state.equipe[0].telephone} </h4>
                        <h4> H de Fin : {this.state.equipe[0].h_fin}</h4>
                    </div>
                    : null}

                <NavLink to='/Admin/ListTeam'>
                    <Button>Retour</Button>
                </NavLink>
            </div>
        );
    }
}