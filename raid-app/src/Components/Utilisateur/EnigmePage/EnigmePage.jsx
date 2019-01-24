import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { displayEnigmeAction, enigmeValidation } from '../../../Actions/displayEnigmeAction.js'
import { enigmesFetch } from '../../../Actions/Utilisateur/enigmesFetchAction'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import { NavLink } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import './EnigmePage.css'
import info from './info.1.png'
import Faux from './faux.png'
import Vrai from './vrai.png'
import Vide from './Vide.png'
import './InfosModalEgnime.css'
import Header from '../Header'
import '../MapPage/MapPage.css'

export class EnigmePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compteurcontinue: 0,
            proposition: "",
            isResTrue: false,
            final: Vide,
            modal: false,
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
            enonce: null,
            reponse: null,
            indices: null,
            info: null,
            check: null,
            succeed: null,
            numClickValidate: 0,
            img: "./Pierrephilosophale.jpeg",
            isLoaded: false,
            agagner: null,
            //Affichage du score 
            scoregeneral: null
        };
        this.data = null
        this.scoreg = null
        this.enigme = this.props.match.params._id
        this.user = this.props.match.params.id
    }

    //Fetch et stockage des données de l'énigme en state + stockage du score du joueur //
    componentDidMount = () => {
        axios.get(`http://localhost:5000/api/enigmes/${this.enigme}`)
            .then(data => {
                this.data = data.data[0]
                this.setState({
                    id: this.data._id,
                    check: this.data.check,
                    question: this.data.question,
                    titre: this.data.titre,
                    reponse: this.data.reponse,
                    enonce: this.data.enonce,
                    indices: this.data.indices,
                    info: this.data.info,
                    img: this.data.img,
                    isFloat: true,
                    agagner: this.data.agagner
                })
            })
            .catch(error => {
                throw (error);
            })
        axios.get(`http://localhost:5000/api/equipe/${this.user}`)
            .then(data => {
                this.scoreg = data.data[0]
                this.setState({
                    isLoaded: true,
                })

                if (data.data[0].enigmes.length > 0) {
                    console.log("UNO")
                    for (let i = 0; i < data.data[0].enigmes.length; i++) {
                        console.log("DOS", "idQuestion: ", data.data[0].enigmes[i]._idQuestion)
                        console.log("this.enigme", this.enigme)
                        if (data.data[0].enigmes[i]._idQuestion === this.enigme) {
                            console.log("TRES")
                            this.setState({
                                scoregeneral: this.scoreg.score,
                                succeed: data.data[0].enigmes[i].succeed,
                                check: data.data[0].enigmes[i].check,
                            })
                        }
                    }
                }
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
        //this.setState({ indiceNumber: this.state.indiceNumber + 1 })
        if (this.state.indiceNumber === 0) {
            if (this.state.indices[0]) {
                this.setState({
                    indiceNumber: this.state.indiceNumber + 1,
                    indice: this.state.indices[0],
                    agagner: Math.ceil(this.state.agagner / 1.3)
                })
            }
            console.log("indice 1:", this.state.indices[0])
            console.log(this.state.agagner)
        }

        if (this.state.indiceNumber === 1) {
            if (this.state.indices[1]) {
                this.setState({
                    indiceNumber: this.state.indiceNumber + 1,
                    indice: this.state.indices[1],
                    agagner: Math.ceil(this.state.agagner / 2)
                })
            }
            console.log("indice 2:", this.state.indices[1])
            console.log(this.state.indices)
            console.log(this.state.agagner)
        }

        if (this.state.indiceNumber === 2) {
            if (this.state.indices[2]) {
                this.setState({
                    indiceNumber: this.state.indiceNumber + 1,
                    indice: this.state.indices[2],
                    agagner: Math.ceil(this.state.agagner / 3)
                })
            }
            console.log("indice 3:", this.state.indices[2])
            console.log(this.state.agagner)
        }

        if (this.state.indiceNumber >= 3) {
            this.ReponseManagement()
        }
    };

    //Stockage de la proposition de réponse pour comparaison//
    isProposing = (e) => {
        this.setState({
            proposition: e.target.value
        });
    }

    //Gestion de la bonne ou mauvaise réponse//
    ReponseManagement() {
        axios.post(`http://localhost:5000/api/enigmes/${this.state.id}`, {
            proposition: this.state.proposition,
        })
            .then(response => {
                console.log(response.data.status)
                console.log("INDICENUMBER", this.state.indiceNumber)
                if (response.data.status === true) {
                    this.setState({
                        isContinue: true,
                        isResTrue: true,
                        final: Vrai,
                        visibilite: "pasvisible",
                        succeed: true,
                    })
                    this.saveResp()

                }
                else if (this.state.numClickValidate >= 2 && !response.data.status) {
                    this.setState({
                        agagner: 0,
                        isResTrue: false,
                        final: Faux,
                        succeed: false,
                    })
                    this.saveResp()

                } else if (this.state.indiceNumber >= 2 || (this.state.numClickValidate >= 3 && this.state.isResTrue === false)) {
                    this.setState({
                        isResTrue: false,
                        final: Faux,
                        succeed: false,
                    })
                    this.saveResp()

                } else {
                    this.setState({
                        isResTrue: false,
                        // final: Faux,
                    })

                }
                console.log(response);
                this.setState({
                    check: true,
                    numClickValidate: this.state.numClickValidate + 1
                })

            })
            .catch(function (error) {
                console.log(error);
            });

    }


    //Enregistrement du score et de l'ID en BDD//
    saveResp = () => {
        axios.put(`http://localhost:5000/api/equipes/${this.user}`, {
            score: this.state.agagner,
            _idQuestion: this.state.id,
            check: this.state.check,
            succeed: this.state.succeed,
            gain: this.state.agagner
        })
            .then(function (response) {
                console.log("L'envoi a fonctionné", response);
            })
            .catch(function (error) {
                console.log("L'envoi n'a PAS fonctionné", error);
            });
    }

    render() {
        console.log("gain:", this.state.agagner)
        //console.log("score:", this.state.score) 
        //console.log(this.state.agagner + this.state.score)
        //console.log('indices', this.state.indiceNumber)
        //console.log('succeed', this.state.succeed)
        //this.props.enigme[0] ? console.log([this.props.enigme[0].coordonnee[0], this.props.enigme[0].coordonnee[1]]) : console.log('wait')
        //console.log(this.props.check)
        return (
            <div class="EnigmePageContainer">
                <Header scoreuser={this.state.scoregeneral} />
                {this.state.isLoaded ?
                    <div id='blockMap' className={this.props.isSliderOpen ? 'slideOut' : 'slideIn'}>
                        {this.state.img ? <img className="Illustration" src={require(`${this.state.img}`)} alt='' /> : null}
                        <h3 className="Titre">{this.state.titre}</h3>
                        <p >{this.state.enonce}</p>

                        <AvForm className="reponse" onSubmit={this.isTrue}>
                            <h3 className="TitreQuestion">{this.state.question}</h3>
                            <AvField name="enigme" type="text" placeholder="votre réponse" onChange={this.isProposing} />
                            <div className="validationContainer">
                                {(this.state.isResTrue || this.state.indiceNumber > 3 || this.state.succeed || this.state.succeed === false) ?
                                    <NavLink to={`/MapPage/${window.localStorage.getItem("id")}`}><Button color="primary" type="button" className={this.state.visibilite}>Continuer</Button></NavLink>
                                    :
                                    <Button color="primary" onClick={() => { this.ReponseManagement() }} className={this.state.visibilite}>Valider</Button>}
                                <img className="final" src={this.state.final} alt='' />
                            </div>
                            <Button type="button" onClick={this.displayIndices} className="bonton2" >Indice</Button><br></br>
                            <div className="Textindices">{this.state.indice}</div>
                        </AvForm>
                        <br />
                        {this.state.indiceNumber === 2 ?
                            <div className="TitreQuestion"><i>
                                Attention il ne vous reste plus qu'un indice !!
                                </i></div>
                            :
                            null}
                        <br />
                        {this.state.numClickValidate === 2 && !this.state.isResTrue ?
                            <div className="TitreQuestion"><i>
                                Attention il ne vous reste plus qu'une tentative !!
                                </i></div>
                            :
                            null}
                    </div>
                    :
                    null}
            </div>

        );
    }
}

const mapStateToProps = state => ({
    enigme: state.reducerMongoEnigmes.enigme,
    display: state.reducerMongoEnigmes.display,
    check: state.reducerMongoEnigmes.check,

    isSliderOpen: state.reducerHeader.isSliderOpen,
})

const mapDispatchToProps = dispatch => {
    return {
        displayEnigmeAction: bindActionCreators(displayEnigmeAction, dispatch),
        enigmeValidation: bindActionCreators(enigmeValidation, dispatch),
        enigmesFetch: bindActionCreators(enigmesFetch, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EnigmePage);