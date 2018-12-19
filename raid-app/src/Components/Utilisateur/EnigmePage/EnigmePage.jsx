import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPoint, removePoint } from '../../../Actions/Utilisateur/pointManagement_action.jsx';
import { goodTitle, badTitle, actualTitle } from '../../../Actions/Utilisateur/titleManagement_action.jsx';
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
            compteurcontinue: 0,
            proposition: "",
            final: Vide,
            modal: false,
            indice: null,
            indiceNumber: 0,
            visibilite: "visible",
            continuer: null,

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
        this.data = null
    }

    componentDidMount = () => {
        /* fetch("http://localhost:5000/api/enigmes")
            .then(laPetiteReponse => {
                return laPetiteReponse.json()
            })
            .then(data => {
                this.setState({
                    question: data[0].question,
                    titre: data[0].titre,
                    texte: data[0].enonce,
                    reponse: data[0].reponse,
                    indices: data[0].indices,
                    info: data[0].info,
                    img: data[0].img,
                })
            }) */
        fetch("http://localhost:5000/api/enigmes")
            .then(laPetiteReponse => {
                return laPetiteReponse.json()
            })
            .then(data => {
                this.data = data

                this.setState({
                    question: data[2].question,
                    titre: data[2].titre,
                    texte: data[2].texte,
                    reponse: data[2].reponse,
                    indices: data[2].indices,
                    info: data[2].info,
                    img: data[2].img,
                })

                this.setState({
                    isFloat: true
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
            this.setState({ indice: this.props.enigme[this.props.display].indices[0] })
        }
        if (this.state.indiceNumber === 1) {
            this.setState({ indice: this.props.enigme[this.props.display].indices[1] })
        }
        if (this.state.indiceNumber === 2) {
            this.setState({ indice: this.props.enigme[this.props.display].indices[2] })
        }
    };

    isProposing = (e) => {
        this.setState({
            proposition: e.target.value
        });
    }

    isTrue = () => {
        if (this.state.proposition === this.props.enigme[this.props.display].reponse[0] || this.state.proposition === this.props.enigme[this.props.display].reponse[1]) {
            this.props.addPoints()
            this.props.goodTitle()

            setTimeout(() => {
                this.props.actualTitle()
            }, 8000);

            this.setState({
                final: Vrai,
                visibilite: "pasvisible"
            })

        } else {
            this.props.removePoints()
            this.props.badTitle()

            setTimeout(() => {
                this.props.actualTitle()
            }, 8000);

            this.setState({
                final: Faux
            })
        }

    }

    render() {

        return (

            <div class="EnigmePageContainer">
                <NavLink to="/MapPage"><button className="ButtonBack"> Retour </button></NavLink>
                {/*<img className="bontonInfo" src={Info} alt="" />*/}
                <img className='Infologoegnime' onClick={this.toggle} src={info} alt='infologo'>{this.props.buttonLabel}</img>
                <Modal className='Modale' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Petites règles dans ce lieu </ModalHeader>
                    <ModalBody className='modaltexte'>{this.props.enigme.info}</ModalBody>
                </Modal>
                <p className="points">{this.props.points} pts</p>
                <img className="Illustration" src={require(`${this.props.enigme[this.props.display].img}`)} alt='' />
                <p className="Titre">{this.props.enigme[this.props.display].enonce}</p>
                <p className="BodyText">{this.state.texte}</p>

                <AvForm className="reponse" onSubmit={this.isTrue}>
                    <h3 className="TitreQuestion">{this.props.enigme[this.props.display].question}</h3>
                    <AvField name="enigme" type="text" placeholder="votre réponse" onChange={this.isProposing} />
                    <div className="validationContainer">
                        <Button color="primary" className={this.state.visibilite}>Valider</Button>
                        <img className="final" src={this.state.final} alt='' />
                    </div>
                    <Button type="button" onClick={this.displayIndices} className="bonton2" >Indice</Button>
                    <div className="Textindices">{this.state.indice}</div>
                    <NavLink to="/MapPage"><button color="" className="buttonContinuer"> Continuer </button></NavLink>
                </AvForm>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    points: state.pointManagement.points,
    title: state.titleManagement.title,

    enigme: state.reducerMongoEnigmes.enigme,
    display: state.reducerMongoEnigmes.display
})

const mapDispatchToProps = dispatch => {
    return {
        addPoints: bindActionCreators(addPoint, dispatch),
        removePoints: bindActionCreators(removePoint, dispatch),
        goodTitle: bindActionCreators(goodTitle, dispatch),
        badTitle: bindActionCreators(badTitle, dispatch),
        actualTitle: bindActionCreators(actualTitle, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EnigmePage);
