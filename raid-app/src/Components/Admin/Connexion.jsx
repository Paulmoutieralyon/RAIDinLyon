import React from 'react'
import axios from 'axios'
import { InputGroup, InputGroupAddon, Input, Button, FormGroup, Label, Container, Row, Col } from 'reactstrap'
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
            url: 'http://localhost:5000/authenticateAdmin',
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
                    window.location.href = `/Admin/SessionPage/${response.data.id}`
                } else alert("Formulaire érroné")
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className='containerConnexion'>
                <Container>
                    <Row>
                        <Col xs="0" md="2" />
                        <Col xs="12" md="8">
                            <img src={logo} />

                            <InputGroup >
                                <FormGroup>
                                    <Label for="exampleEmail">Email</Label>
                                    <Input onChange={this.modifyEmail} type="email" name="email" id="exampleEmail" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Mot de passe</Label>
                                    <Input onChange={this.modifyPassword} type="password" name="password" id="examplePassword"  />
                                </FormGroup>
                            </InputGroup>
                            <Button color="secondary" className="text-center text-md-center" size="lg" onClick={this.submitLogin}>Connexion</Button>
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    }
}