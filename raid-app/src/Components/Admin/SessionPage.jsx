
import { Breadcrumb, BreadcrumbItem, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Toggle from "react-toggle-component";
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
                <h1>Sur les traces de Nicolas Flamel</h1>
              
                <NavLink to = "/Admin/ListEnigmes" ><Button>List Enigmes</Button></NavLink>
                <NavLink to = "/Admin/ListTeam" ><Button>List Equipes</Button></NavLink>
                <NavLink to = "/Admin/Classement" ><Button>Classement</Button></NavLink>
                <NavLink to = "/Admin/"><Button>Retour</Button></NavLink>

                <Breadcrumb>
                    <BreadcrumbItem active>Actif</BreadcrumbItem>
                    <Toggle />
                </Breadcrumb>
            </div>
        );
    }
}