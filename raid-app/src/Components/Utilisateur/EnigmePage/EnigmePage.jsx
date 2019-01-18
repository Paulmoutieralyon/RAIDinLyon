
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
            numClickValidate: 0,
            //Les états qu'on l'on fetchera
            question: null,
            titre: null,
            texte: null,
            reponse: null,
            indices: null,
            info: null,
            img: "./Pierrephilosophale.jpeg",
            //equipes
            check: false,
            succeed: false,

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
                check: true
            })
        }
    };


    //Stockage de la proposition de réponse pour comparaison//
    isProposing = (e) => {
        this.setState({
            proposition: e.target.value
        });
    }

    //Gestion de la bonne ou mauvaise réponse//
    async ReponseManagement() {
        /* this.setState({
            numClickValidate: this.state.numClickValidate + 1
        }) */
        await axios.post(`http://localhost:5000/api/enigmes/${this.state.id}`, {
            proposition: this.state.proposition,
        })
            .then(response => {
                if (response.data.status === true) {
                    this.setState({
                        isContinue: true,
                        isResTrue: true,
                        final: Vrai,
                        visibilite: "pasvisible",
                        ///////////
                        succeed: true,
                        check: true,
                    })
                }
                else if (this.state.indiceNumber > 3 || (this.state.numClickValidate >= 2 && this.state.isResTrue === false)) {
                    this.setState({
                        isResTrue: false,
                        final: Faux,
                        succeed: false,
                        check: true,
                    })
                }

                
                else {
                    this.setState({
                        isResTrue: false,
                       // final: Faux,
                    })
                }
                this.setState({
                    check: true,
                    numClickValidate: this.state.numClickValidate + 1
                })

            })
            .catch(function (error) {
                console.log(error);
            });
        //await this.saveResp()
    }

    //fonction pour bouton continuer
    responseContinue


    //Enregistrement du score et de l'ID en BDD//
    saveResp = () => {

        axios.put(`http://localhost:5000/api/equipes/${this.user}`, {
            score: this.state.score,
            idquestion: this.state.id,
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
        console.log("nb indices: ", this.state.indiceNumber, "& succeed: ", this.state.succeed, "& numValid: ", this.state.numClickValidate)
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
                    <AvField name="enigme" type="text" placeholder="votre réponse" onChange={this.isProposing} required />
                    <div className="validationContainer">
                        {(this.state.isResTrue) ?
                            <Button color="primary" type="button" className={this.state.visibilite}>Valider</Button>
                            :
                            <Button color="primary" onClick={() => { this.ReponseManagement() }} className={this.state.visibilite}>Valider</Button>}
                        <img className="final" src={this.state.final} alt='' />
                    </div>

                    <Button type="button" onClick={this.displayIndices} className="bonton2" >Indices</Button><br></br>
                    <div className="Textindices">{this.state.indice}</div>
                    {(this.state.isContinue === true || this.state.indiceNumber > 3) ?
                        <NavLink to={`/MapPage/${window.localStorage.getItem("id")}`}><Button onClick={() => { this.saveResp() }} color="info" className="buttonContinuer">Continuer</Button></NavLink>
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
