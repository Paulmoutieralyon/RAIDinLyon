import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { NavLink } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import './EnigmePage.css';
import info from './info.1.png';
import Pierrephilosophale from './Pierrephilosophale.jpeg';
import Faux from './faux.png';
import Vrai from './vrai.png';
import Vide from './Vide.png';
import './InfosModalEgnime.css';

export default class EnigmePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reponse: ["la pierre philosophale", "pierre philosophale"],
            proposition: "",
            final: Vide,
            modal: false,
            indice: null,
            indiceNumber: 0,
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    indices = () => {
        this.setState({ indiceNumber: this.state.indiceNumber + 1 })
        if (this.state.indiceNumber === 0) {
            this.setState({ indice: "Harry Potter" })
        }
        if (this.state.indiceNumber === 1) {
            this.setState({ indice: "Pernelle" })
        }
        if (this.state.indiceNumber === 2) {
            this.setState({ indice: "Amis de Albus" })
        }
    };

    isProposing = (e) => {
        this.setState({
            proposition: e.target.value
        });
    }

    isTrue = () => {

        if (this.state.proposition === this.state.reponse[0] || this.state.proposition === this.state.reponse[1]) {
            this.setState({
                final: Vrai
            })

        } else {
            this.setState({
                final: Faux
            })
        }

    }

    render() {

        return (

            <div>
                <NavLink to="/MapPage"><button className="ButtonBack"> Retour </button></NavLink>
                <img className='Infologo'  onClick={this.toggle}  src={info} alt='infologo'>{this.props.buttonLabel}</img>
                        <Modal className='Modale' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Petites règles dans ce lieu </ModalHeader>
                            <ModalBody className='modaltexte'>
                       Ne parlez pas trop fort ! les murs sont sensibles ^^     </ModalBody>
                        </Modal>

                <img className="Illustration" src={Pierrephilosophale} alt='' />
                <p className="Titre">Nicolas Flamel </p>
                <p className="BodyText">Nicolas Flamel, éminent personnage du XIVème siècle est essentiellement réputé comme étant l’alchimiste ayant réussi dans la quête de la Pierre Philosophale. On attribuait à cette pierre certaines propriétés dont celle de pouvoir transmuter les métaux vils en métaux précieux comme l’or ou l’argent.</p>

                <AvForm className="reponse" onSubmit={this.isTrue}>
                    <h3 className="TitreQuestion">Quelle découverte a rendu célèbre Nicolas Flamel ?</h3>
                    <AvField name="enigme" type="text" placeholder="votre réponse" onChange={this.isProposing} />
                    <Button color="primary">Valider</Button>
                    <img className="final" src={this.state.final} alt='' />
                    <Button onClick={this.indices} className="bonton2" >Indice</Button>
                    {this.state.indice}
                </AvForm>
            </div>

        );
    }
}

