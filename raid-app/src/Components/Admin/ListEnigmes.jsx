import React from 'react';
import './ListEnigmes.css'
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Breadcrumb, Card, Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import axios from 'axios';
import trash from './trash.png'
import "react-toggle-component/styles.css"

export default class ListSessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enigmes: [],
            actualisation: false,
            modal: false,
            idenigme: null,
            index: null
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/enigmes/')
            .then(response => {
                this.setState({
                    enigmes: response.data
                })
            })
            .catch(error => {
                throw (error);
            });
    }



    EnigmesList = () => {
        
        return this.state.enigmes.map((enigme, i) => {
            
            return (
                <Breadcrumb>
                    <ListGroup>
                        <NavLink to={`/Admin/enigmes/${enigme._id}`} onClick={this.forceUpdate} className="navlink">
                            <ListGroupItem active>
                                <ListGroupItemHeading>{enigme.titre}</ListGroupItemHeading>
                                <ListGroupItemText>
                                </ListGroupItemText>
                            </ListGroupItem>
                        </NavLink>
                        <img src={trash} onClick={() => this.willDelete(enigme._id, i)} className="trash" />
                    </ListGroup>
                </Breadcrumb>
            )
        })
    }

// Fonctions qui gèrent l'ouverture de la modale de sureté //
    willDelete = (enigmeid, index) => {
        this.setState({
            modal: !this.state.modal,
            idenigme: enigmeid,
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
                        <p>Êtes-vous sûr de vouloir supprimer définitivement cette énigme ?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.Delete(this.state.idenigme, this.state.index)}>Confirmer</Button>{' '}
                        <Button color="secondary" onClick={() => this.setState({ modal :!this.state.modal})}>Annuler</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

// Fonction de suppressions de l'énigme en base et en front //
    Delete = (enigmeid, index) => {
        axios.delete(`http://localhost:5000/api/enigmes/${enigmeid}`)
            .then(response => {
                if (response.status === 200) {
                    const tab = this.state.enigmes.slice()
                    delete tab[index]
                    this.setState({ 
                        enigmes: tab,
                        modal: !this.state.modal
                     })
                    console.log(this.state.enigmes)
                }
            })
    }


    render() {
        return (
            <div>
                <h1>Énigmes</h1>
                {this.EnigmesList()}
                {this.deleteValidation()}

                < Card body >
                    <NavLink to='/Admin/AddEgnimes' onClick={this.forceUpdate}>
                        <Button>Nouvelle énigme</Button>

                    </NavLink>
                    <NavLink to = "/Admin/SessionPage"><Button>Retour</Button></NavLink>
                </Card >

            </div >
        );
    }
}