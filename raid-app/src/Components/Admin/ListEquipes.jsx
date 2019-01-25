import React from 'react';
import './ListEquipes.css'
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, Breadcrumb, Card, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import axios from 'axios';
import trash from './trash.png'

import "react-toggle-component/styles.css"

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
                <BrowserRouter>
                    <Breadcrumb>
                        <ListGroup>
                            <NavLink to={`/Admin/equipe/${window.localStorage.getItem('idAdmin')}/${equipe._id}`} onClick={this.forceUpdate} className="navlink">
                                <ListGroupItem active>
                                    <ListGroupItemHeading>{equipe.nom}</ListGroupItemHeading>
                                    <ListGroupItemText>
                                    </ListGroupItemText>
                                </ListGroupItem>
                            </NavLink>
                            <img src={trash} onClick={() => this.willDelete(equipe._id, i)} className="trash" />
                        </ListGroup>
                    </Breadcrumb>
                </BrowserRouter>
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
            <div>
                <h1 className="titre"> Liste des Equipes </h1>
                {this.EquipeList()}
                {this.deleteValidation()}
                <Card body>
                    <NavLink to={`/Admin/AddTeam/${window.localStorage.getItem('idAdmin')}`} onClick={this.forceUpdate}>
                        <Button> Nouvelle Equipe </Button>
                    </NavLink>
                    <NavLink to={`/Admin/SessionPage/${window.localStorage.getItem('idAdmin')}`}>
                        <Button>Retour</Button>
                    </NavLink>
                </Card>
            </div>
        );
    }
}