import React from 'react'
import axios from 'axios'
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap'
import logo from './logo_tinyplanet_orange.png'
import './Connexion.css'
import { NavLink } from 'react-router-dom'

export default class AdminComptes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null
        }
    }

    componentDidMount() {
        localStorage.clear()
    }

    modifyEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    modifyPassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    submitLogin = () => {
        axios({
            method: 'post',
            url: '/authenticateAdmin',
            data: {
                email: this.state.email,
                password: this.state.password,
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.data.success === true) {
                    window.localStorage.setItem("tokenAdmin", response.data.token)
                    window.localStorage.setItem("idAdmin", response.data.id)
                    window.location.href =`/Admin/SessionPage/${response.data.id}`
                } else alert("Formulaire érroné")
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className='containerConnexion'>

                <img src={logo} />

                <InputGroup >
                    <InputGroupAddon addonType="prepend" >Adresse email :</InputGroupAddon>
                    <Input onChange={this.modifyEmail} />
                    <InputGroupAddon addonType="prepend" >Mot de passe :</InputGroupAddon>
                    <Input onChange={this.modifyPassword} />
                </InputGroup>

                <Button color="secondary" size="lg" onClick={this.submitLogin}>Connexion</Button>
            </div >
        );
    }
}