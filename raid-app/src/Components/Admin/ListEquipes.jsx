import React from 'react';
import './ListEquipes.css'
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, Button, Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import trash from './trash.png'
import './SessionPage.css'
import "react-toggle-component/styles.css"
import { FaScroll, FaChevronLeft } from 'react-icons/fa';

export default class ListEquipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            equipe: [],
            actualisation: false,
            modal: false,
            idequipe: null,
            index: null
        };
    }

    componentDidMount() {
        axios.get('/api/equipes/')
            .then(response => {

                this.setState({
                    equipe: response.data

                })
                console.log(response.data)
            })
            .catch(error => {
                throw (error);
            });
    }

    EquipeList = () => {
        return this.state.equipe.map((equipe, i) => {
            return (
                <Button>
                    <div className="textButton">
                        <NavLink to={`/Admin/equipe/${window.localStorage.getItem('idAdmin')}/${equipe._id}`} onClick={this.forceUpdate} className="navlink">
                            {equipe.nom}
                        </NavLink>
                    </div>
                    <div className='textButtonIcon'>
                        <img src={trash} onClick={() => this.willDelete(equipe._id, i)} className="trash" />
                    </div>
                </Button>
            )
        })

    }

    // Fonctions qui gèrent l'ouverture de la modale de sureté //
    willDelete = (equipeid, index) => {
        this.setState({
            modal: !this.state.modal,
            idequipe: equipeid,
            index: index
        })
    }

    // Modale de sureté //
    deleteValidation = () => {
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn}>
                    <ModalBody>
                        <p>Êtes-vous sûr de vouloir supprimer définitivement cette équipe ?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.Delete(this.state.idequipe, this.state.index)}>Confirmer</Button>{' '}
                        <Button color="secondary" onClick={() => this.setState({ modal: !this.state.modal })}>Annuler</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    Delete = (equipeid, index) => {
        axios.delete(`/api/equipes/${equipeid}`)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    const tab = this.state.equipe.slice()
                    delete tab[index]
                    this.setState({
                        equipe: tab,
                        modal: !this.state.modal
                    })
                    console.log(this.state.equipe)
                }
            })
    }

    addTeam = e => {
        e.preventDefault()
        window.location.href = 'AddTeam';
    }

    render() {
        return (
            <div className="containerAdmin">
                <Container>
                    <Row>
                        <Col xs="0" md="2" />
                        <Col xs="12" md="8">
                            <h1 className="titreH1"> Equipes </h1>
                            {this.EquipeList()}
                            {this.deleteValidation()}
                            <Button className="buttonMenu">
                                <NavLink to={`/Admin/AddTeam/${window.localStorage.getItem('idAdmin')}`} onClick={this.forceUpdate}>
                                    <p className="textButton"> Nouvelle Equipe </p>
                                </NavLink>
                                <div className="textButtonIcon">
                                    <FaScroll />
                                </div>
                            </Button>
                            < Button className="buttonMenu">
                                <NavLink to={`/Admin/SessionPage/${window.localStorage.getItem('idAdmin')}`}>
                                    <p className="textButton">Retour</p>
                                </NavLink>
                                <div className="textButtonIcon">
                                    <FaChevronLeft />
                                </div>
                            </ Button>
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    }
}