import React from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import logo from './logo_tinyplanet_orange.png';
import './Connexion.css';
import {NavLink} from 'react-router-dom'

export default class AdminComptes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='containerConnexion'>

                <img src={logo} />

                <InputGroup >
                    <InputGroupAddon addonType="prepend">Admin :</InputGroupAddon>
                    <Input />
                    <InputGroupAddon addonType="prepend">Mot de passe :</InputGroupAddon>
                    <Input />
                </InputGroup>

                <NavLink to = "/Admin/ListSessionPage"><Button color="secondary" size="lg">Connexion</Button></NavLink>
            </div >
        );
    }
}