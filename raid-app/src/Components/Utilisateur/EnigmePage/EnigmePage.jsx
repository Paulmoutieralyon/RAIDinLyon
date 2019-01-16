
import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { displayEnigmeAction, enigmeValidation } from '../../../Actions/displayEnigmeAction.js'
//import { goodTitle, badTitle, actualTitle } from '../../../Actions/Utilisateur/titleManagement_action.jsx'
import { enigmesFetch } from '../../../Actions/Utilisateur/enigmesFetchAction'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import { NavLink } from 'react-router-dom'
import { FormFeedback, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './EnigmePage.css'
import info from './info.1.png'
import Faux from './faux.png'
import Vrai from './vrai.png'
import Vide from './Vide.png'
import './InfosModalEgnime.css'

export class EnigmePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compteurcontinue: 0,
            proposition: "",
            isResTrue: false,
            final: Vide,
            modal: false,
            modalWinner: false,
            modalLooser: false,
            indice: null,
            indiceNumber: 0,
            score: 5,
            visibilite: "visible",
            continuer: null,
            isContinue: false,
            markernumber: null,
            //Les états qu'on l'on fetchera
            question: null,
            titre: null,
            texte: null,
            reponse: null,
            indices: null,
            info: null,
            img: "./Pierrephilosophale.jpeg",
            //equipes
            check: null,
            succeed: null,

        };
        this.data = null
        this.enigme = this.props.match.params._id
        this.user = this.props.match.params.id
        /* this.check = null
        this.succeed = null */
    }

    //Fetch et stockage des données de l'énigme en state //
    componentDidMount = () => {
        axios.get(`http://localhost:5000/api/enigmes/${this.enigme}`)
            .then(data => {
                this.data = data.data[0]
                this.setState({
                    id: this.data._id,
                    check: this.data.check,
                    question: this.data.question,
                    titre: this.data.titre,
                    texte: this.data.texte,
                    reponse: this.data.reponse,
                    enonce: this.data.enonce,
                    indices: this.data.indices,
                    info: this.data.info,
                    img: this.data.img,
                    isFloat: true
                })
            })
            .catch(error => {
                throw (error);
            })
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    toggleWinner = () => {
        this.setState({
            modalWinner: !this.state.modalWinner
        });
    }
    toggleLooser = () => {
        this.setState({
            modalLooser: !this.state.modalLooser
        });
    }



    //Gestion des clics sur les indices //
    displayIndices = () => {
        this.setState({ indiceNumber: this.state.indiceNumber + 1 })
        if (this.state.indiceNumber === 0) {
            this.setState({
                indice: this.state.indices[0],
                score: 4
            })
        }
        if (this.state.indiceNumber === 1) {
            this.setState({
                indice: this.state.indices[1],
                score: 3
            })
        }
        if (this.state.indiceNumber === 2) {
            this.setState({
                indice: this.state.indices[2],
                score: 1
            })
        }
        if (this.state.indiceNumber === 3) {
            this.setState({
                modalLooser: !this.state.modalLooser
            })
            console.log("momo ldino")
        }
    };

    //Stockage de la proposition de réponse pour comparaison//
    isProposing = (e) => {
        this.setState({
            proposition: e.target.value
        });
        console.log("HEY ",this.state.proposition)
    }

    //Gestion de la bonne ou mauvaise réponse//
    ReponseManagement = () => {
        axios.post(`http://localhost:5000/api/enigmes/${this.state.id}`, {
            proposition: this.state.proposition,
        })
            .then(response => {
                if (response.data.status === true) {
                    
                    //this.props.goodTitle()
                    /* setTimeout(() => {
                        this.props.actualTitle()
                    }, 8000); */

                    this.setState({
                        isContinue: true,
                        isResTrue: true,
                        final: Vrai,
                        visibilite: "pasvisible",
                        modalWinner: !this.state.modalWinner,
                        ///////////
                        succeed: true,
                        check: true,
                    })
                    //on change l'état de l'énigme
                    /* this.succeed = true
                    this.check = true
                    console.log("SuXES ?: ", this.succeed) */


                } else {
                    /* this.props.badTitle()
                    setTimeout(() => {
                        this.props.actualTitle()
                    }, 8000); */

                    this.setState({
                        isResTrue: false,
                        final: Faux,
                        succeed: false,
                        check: true
                    })
                    //on change l'état de l'énigme
                    //this.succeed = false
                    //this.check = true
                }
                console.log(response);
                
            })
            .catch(function (error) {
                console.log(error);
            });
        this.saveResp()
    }


    //Enregistrement du score et de l'ID en BDD//
    saveResp = () => {
        
        axios.put(`http://localhost:5000/api/equipes/${this.user}`, {
            score: this.state.score,
            _idQuestion: this.enigme,
            check: this.state.check,
            succeed: this.state.succeed,
            gain: this.state.score
        })
        
            .then(function (response) {
                console.log("L'envoi a fonctionné", response);
            })
            .catch(function (error) {
                console.log("L'envoi n'a PAS fonctionné", error);
            });
    }

    /*  
    
    
    handleclick = (e) =>{
          this.setState({compteurcontinue: this.state.compteurcontinue +1})
          if(this.state.compteurcontinue === 2) console.log("un mot")
      }*/
    render() {
        //this.props.enigme[0] ? console.log([this.props.enigme[0].coordonnee[0], this.props.enigme[0].coordonnee[1]]) : console.log('wait')
        //console.log(this.props.check)
        return (

            <div class="EnigmePageContainer">
                <NavLink to={`/MapPage/${window.localStorage.getItem("id")}`}><button className="ButtonBack"> Retour </button></NavLink>
                {/*<img className="bontonInfo" src={Info} alt="" />*/}
                <img className='Infologoegnime' onClick={this.toggle} src={info} alt='infologo'>{this.props.buttonLabel}</img>
                <Modal className='Modale' isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Petites règles dans ce lieu </ModalHeader>
                    <ModalBody className='modaltexte'>{this.state.info}</ModalBody>
                </Modal>
                <p className="points">{this.props.points} pts</p>
                <img className="Illustration" src={require(`${this.state.img}`)} alt='' />
                <p className="Titre">{this.state.enonce}</p>
                <p className="BodyText">{this.state.texte}</p>

                <AvForm className="reponse" onSubmit={this.isTrue}>
                    <h3 className="TitreQuestion">{this.state.question}</h3>
                    <AvField name="enigme" type="text" placeholder="votre réponse" onChange={this.isProposing} />
                    <div className="validationContainer">
                        {(this.state.isResTrue) ?
                            <Button color="primary" type="button" className={this.state.visibilite}>Valider</Button>
                            :
                            <Button color="primary" onClick={() => { this.ReponseManagement() }} className={this.state.visibilite}>Valider</Button>}
                        <img className="final" src={this.state.final} alt='' />
                    </div>

                    <Button type="button" onClick={this.displayIndices} className="bonton2" >Indice</Button><br></br>
                    <div className="Textindices">{this.state.indice}</div>
                    {/*  {(this.state.isContinue === true || this.state.indiceNumber > 3) ?
                        <NavLink to={`/MapPage/${window.localStorage.getItem("id")}`}><button className="buttonContinuer">Continuer</button></NavLink>
                        :
                        null} */}
                    {(this.state.isContinue) ?
                        <Modal className='Modale' isOpen={this.state.modalWinner} toggle={this.toggleWinner}>
                            <ModalHeader toggle={this.toggleWinner}>Bravo ! </ModalHeader>
                            <ModalBody className='modaltexte'>Vous venez de répondre juste, rendez-vous à la prochaine énigme.</ModalBody>
                            <NavLink to={`/MapPage/${window.localStorage.getItem("id")}`}><Button color="success" className="buttonContinuer">Retourner sur la carte</Button></NavLink>
                            <ModalFooter></ModalFooter>
                        </Modal>
                        :
                        (this.state.indiceNumber > 3) ?
                            <Modal className='Modale' isOpen={this.state.modalLooser} toggle={this.toggleLooser}>
                                <ModalHeader toggle={this.toggleLooser}>Bien tenté... </ModalHeader>
                                <ModalBody className='modaltexte'>Malheureusement vous avez puisé tout le stock d'indice pour cette énigme, vous n'avez plus qu'à vous rendre à une nouvelle énigme pour retenter
                                votre chance. Cela va impacter votre score.
                                votre score</ModalBody>
                                <NavLink to={`/MapPage/${window.localStorage.getItem("id")}`}><Button color="danger" className="buttonContinuer">Retourner sur la carte</Button></NavLink>
                                <ModalFooter></ModalFooter>
                            </Modal>
                            :
                            null}

                </AvForm>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    //title: state.titleManagement.title,
    enigme: state.reducerMongoEnigmes.enigme,
    display: state.reducerMongoEnigmes.display,
    check: state.reducerMongoEnigmes.check
})

const mapDispatchToProps = dispatch => {
    return {
        /* goodTitle: bindActionCreators(goodTitle, dispatch),
        badTitle: bindActionCreators(badTitle, dispatch),
        actualTitle: bindActionCreators(actualTitle, dispatch), */
        displayEnigmeAction: bindActionCreators(displayEnigmeAction, dispatch),
        enigmeValidation: bindActionCreators(enigmeValidation, dispatch),
        enigmesFetch: bindActionCreators(enigmesFetch, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EnigmePage);
