import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPoint, removePoint } from '../../../Actions/Utilisateur/pointManagement_action.jsx';
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

export class EnigmePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            proposition: "",
            final: Vide,
            modal: false,
            indice: null,
            indiceNumber: 0,
            visibilite: "visible",


            markernumber: null,
            //Les états qu'on l'on fetchera
            question: null,
            titre: null,
            texte: null,
            reponse: null,
            indices: null,
            info: null,
            img: "./Pierrephilosophale.jpeg",
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount = () => {
        fetch("http://localhost:5000/api/enigmes")
            .then(laPetiteReponse => {
                return laPetiteReponse.json()
            })
            .then(data => {
                this.setState({
                    question: data[0].question,
                    titre: data[0].titre,
                    texte: data[0].texte,
                    reponse: data[0].reponse,
                    indices: data[0].indices,
                    info: data[0].info,
                    img: data[0].img,
                })
            })
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
            this.props.addPoints()
            this.setState({
                final: Vrai,
                visibilite: "invisible"
            })


        } else {
            this.props.removePoints()
            this.setState({
                final: Faux
            })
        }

    }

    render() {


        return (

            <div>
                <p className="points">{this.props.points} pts</p>
                <NavLink to="/MapPage"><button className="ButtonBack"> Retour </button></NavLink>
                {/*<img className="bontonInfo" src={Info} alt="" />*/}
                <img className='Infologoegnime' onClick={this.toggle} src={info} alt='infologo'>{this.props.buttonLabel}</img>
                <Modal className='Modale' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Petites règles dans ce lieu </ModalHeader>
                    <ModalBody className='modaltexte'>{this.state.info}</ModalBody>
                </Modal>

                <img className="Illustration" src={require(`${this.state.img}`)} alt='' />
                <p className="Titre">{this.state.titre}</p>
                <p className="BodyText">{this.state.texte}</p>

                <AvForm className="reponse" onSubmit={this.isTrue}>
                    <h3 className="TitreQuestion">{this.state.question}</h3>
                    <AvField name="enigme" type="text" placeholder="votre réponse" onChange={this.isProposing} />
                    <Button color="primary" className={this.state.visibilite}>Valider</Button>
                    <img className="final" src={this.state.final} alt='' />
                    <Button onClick={this.indices} className="bonton2" >Indice</Button>
                    <div className="Textindices">{this.state.indice}</div>
                </AvForm>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    points: state.pointManagement.points
})

const mapDispatchToProps = dispatch => {
    return {
        addPoints: bindActionCreators(addPoint, dispatch),
        removePoints: bindActionCreators(removePoint, dispatch)
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(EnigmePage);
