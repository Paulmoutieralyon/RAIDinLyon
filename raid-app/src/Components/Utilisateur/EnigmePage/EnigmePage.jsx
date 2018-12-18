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
            proposition: "",
            final: Vide,
            modal: false,
            indice: null,
            indiceNumber: 0,
            visibilite: "visible",
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    displayIndices = () => {
        this.setState({ indiceNumber: this.state.indiceNumber + 1 })


        if (this.state.indiceNumber === 0) {
            this.setState({ indice: this.props.enigme[0].indices[0] })
        }
        if (this.state.indiceNumber === 1) {
            this.setState({ indice: this.props.enigme[0].indices[1] })
        }
        if (this.state.indiceNumber === 2) {
            this.setState({ indice: this.props.enigme[0].indices[2] })
        }
    };


    isProposing = (e) => {
        this.setState({
            proposition: e.target.value
        });
    }

    isTrue = () => {
        if (this.state.proposition === this.props.enigme[0].reponse[0] || this.state.proposition === this.props.enigme[0].reponse[1]) {
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
        this.props.enigme[0] ? console.log([this.props.enigme[0].coordonnee[0], this.props.enigme[0].coordonnee[1]]) : console.log('wait')
        return (
            <div className="EnigmePageContainer">
                <NavLink to="/MapPage"><button className="ButtonBack"> Retour </button></NavLink>
                {/*<img className="bontonInfo" src={Info} alt="" />*/}
                <img className='Infologoegnime' onClick={this.toggle} src={info} alt='infologo'>{this.props.buttonLabel}</img>
                <Modal className='Modale' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Petites règles dans ce lieu </ModalHeader>
                    <ModalBody className='modaltexte'>{this.state.info}</ModalBody>
                </Modal>
                <p className="points">{this.props.points} pts</p>
                <img className="Illustration" src={require(`${this.props.enigme[0].img}`)} alt='' />
                <p className="Titre">{this.props.enigme[0].enonce}</p>
                <p className="BodyText">{this.state.texte}</p>
                <AvForm className="reponse" onSubmit={this.isTrue}>
                    <h3 className="TitreQuestion">{this.props.enigme[0].question}</h3>
                    <AvField name="enigme" type="text" placeholder="votre réponse" onChange={this.isProposing} />
                    <div className="validationContainer">
                        <Button color="primary" className={this.state.visibilite}>Valider</Button>
                        <img className="final" src={this.state.final} alt='' />
                    </div>
                    <Button type="button"  onClick={this.displayIndices} className="bonton2" >Indice</Button>
                    <div className="Textindices">{this.state.indice}</div>
                </AvForm>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    points: state.pointManagement.points,
    title: state.titleManagement.title,

    enigme: state.reducerMongoEnigmes.enigme,
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
