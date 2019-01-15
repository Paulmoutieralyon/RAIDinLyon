import { Button } from 'reactstrap';
import React from 'react';
import './SessionPage.css';
import {NavLink} from 'react-router-dom';
import axios from 'axios'


export default class SessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: null,
            enonce: null,
            url_image: null,
            couleurs: '',
            enigmes:[],
            equipes:[],
        };
    }
    submit = () => {
        axios({
            method: 'get',
            url: 'http://localhost:5000/api/session',
            data: {
                nom: this.state.nom,
                enonce: this.state.enonce,
                url_image: this.state.image,
                couleurs: this.state.couleurs,
                enigmes: this.state.enigmes,
                equipes: this.state.equipes

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
            <div className='containerSessionPage'>
                <h1>Mes Sessions</h1>
                <Button>Session 1</Button>
                <Button>Session 2</Button>
                <NavLink to= "/Admin/Addsession"><Button >Ajouter une session</Button></NavLink>
                <NavLink to = "/Admin/ListSessionPage"><Button>Retour</Button></NavLink>
            </div>
        );
    }
}