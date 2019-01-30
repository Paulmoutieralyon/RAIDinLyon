import React from 'react'
import axios from 'axios'
import logo from './RaidLyonLogo.png'
import './HomePage.css'
import './InfosModalHome.css'
import { Button, Modal, ModalHeader, ModalBody, Container, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';

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
            url: 'http://localhost:5000/authenticateUser',
            data: {
                email: this.state.email,
                password: this.state.password,
            }
        })
            .then(function (response) {
                console.log(response)
                if (response.data.success === true) {
                    window.localStorage.setItem("token", response.data.token)
                    window.localStorage.setItem("id", response.data.id)
                    window.location.href = `MapPage/${response.data.id}`
                } else alert("Formulaire érroné")
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }

    render() {
        return (
            <div className="bodyHome">
            <img className="LogoImg" src={logo} alt='homelogo' />
                <div className='allinfo'>
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
                                        placeholder="monemail@email.com"
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
                            <Container>
                            <Row>
                                <Col>
                                    <Button className="btn-start" size="lg" onClick={this.submitLogin}>Lancer la partie</Button>
                                </Col>
                            </Row>
                            </Container>
                            
                        </Form>
                    </Container>
                </div>
            </div>
        );
    }
}

