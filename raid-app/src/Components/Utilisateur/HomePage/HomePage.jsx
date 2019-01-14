import React from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import logo from './RaidLyonLogo.png'
import info from './info.png'
import './HomePage.css'
import './InfosModalHome.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Form, FormGroup, Label, Input, Col } from 'reactstrap';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            token: null,
            email: null,
            password: null
        };
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
            url: 'http://localhost:5000/authenticate',
            data: {
                email: this.state.email,
                password: this.state.password,
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.data.success === true) {
                    window.localStorage.setItem("token", response.data.token)
                    window.localStorage.setItem("id", response.data.id)
                    window.location.href = `MapPage/${response.data.id}`
                } else alert("Formulaire érroné")
            })
            .catch(function (error) {
                console.log(error);
            });
        //this.props.history.push('/MapPage')
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }

    render() {
        return (
            <div className="bodyHome">
                <div className='allinfo'>
                    <img className='Infologo' onClick={this.toggle} src={info} alt='infologo'>{this.props.buttonLabel}</img>
                    <Modal className='Modale' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Règle du jeu de piste</ModalHeader>
                        <ModalBody className='modaltexte'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </ModalBody>
                    </Modal>
                    <Container className="App">
                        <Form className="form">
                            <Col>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="exampleEmail"
                                        placeholder="myemail@email.com"
                                        onChange={this.modifyEmail}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="examplePassword">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="examplePassword"
                                        placeholder="********"
                                        onChange={this.modifyPassword}
                                    />
                                </FormGroup>
                            </Col>
                            <Button onClick={this.submitLogin}>Lancer la partie</Button>
                        </Form>
                    </Container>

                    <img className="LogoImg" src={logo} alt='homelogo' />
                    {/*                         <h1 className="TitreSession"> BIENVENUE <br /> A <br />RaidInLyon</h1> */}
                    <NavLink to="../../MapPage"><button className="Button1">Lancer la Partie</button></NavLink>
                </div>
            </div>

        );
    }
}

