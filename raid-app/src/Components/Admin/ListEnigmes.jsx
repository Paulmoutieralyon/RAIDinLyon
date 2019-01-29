import React from 'react';
import './ListEnigmes.css'
import { NavLink } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import trash from './trash.png'
import "react-toggle-component/styles.css"
import './SessionPage.css'
import { FaScroll, FaChevronLeft } from 'react-icons/fa'

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
        axios.get('/api/enigmes/')
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
                <Button>
                    <div className='textButton'>
                        <NavLink to={`/Admin/enigmes/${window.localStorage.getItem('idAdmin')}/${enigme._id}`} onClick={this.forceUpdate} className="navlink">
                            {enigme.titre}
                        </NavLink>
                    </div>
                    <div className='textButtonIcon'>
                        <img src={trash} onClick={() => this.willDelete(enigme._id, i)} className="trash" />
                    </div>
                </Button>
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
                        <Button color="secondary" onClick={() => this.setState({ modal: !this.state.modal })}>Annuler</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    // Fonction de suppressions de l'énigme en base et en front //
    Delete = (enigmeid, index) => {
        axios.delete(`/api/enigmes/${enigmeid}`)
            .then(response => {
                if (response.status === 200) {
                    const tab = this.state.enigmes.slice()
                    delete tab[index]
                    this.setState({
                        enigmes: tab,
                        modal: !this.state.modal
                    })
                }
            })
    }


    render() {
        return (
            <div className="containerAdmin">
                <h1>Énigmes</h1>
                {this.EnigmesList()}
                {this.deleteValidation()}
                < Button className="buttonMenu">
                    <NavLink to={`/Admin/AddEgnimes/${window.localStorage.getItem('idAdmin')}`} onClick={this.forceUpdate}>
                        <p className="textButton">Nouvelle énigme</p>
                    </NavLink>
                    <div className='textButtonIcon'>
                        <FaScroll />
                    </div>
                </Button >
                < Button className="buttonMenu">
                    <NavLink to={`/Admin/SessionPage/${window.localStorage.getItem('idAdmin')}`}>
                        <p className="textButton">Retour</p>
                    </NavLink>
                    <div className='textButtonIcon'>
                        <FaChevronLeft />
                    </div>
                </Button>
            </div >
        );
    }
}