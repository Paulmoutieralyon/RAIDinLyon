import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { displayEnigmeAction, enigmeValidation } from '../../../Actions/displayEnigmeAction.js'
import { goodTitle, badTitle, actualTitle } from '../../../Actions/Utilisateur/titleManagement_action.jsx'
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
            texte: null,
            reponse: null,
            indices: null,
            info: null,
            check: null,
            succeed: null,
            numClickValidate: 0,
            img: "./Pierrephilosophale.jpeg",
            isLoaded: false,


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
        axios.get(`http://localhost:5000/api/equipe/${this.user}`)
            .then(data => {
                this.scoreg = data.data[0]
                this.setState({
                    isLoaded: true,
                })

                if (data.data[0].enigmes.length > 0) {
                    for (let i = 0; i < data.data[0].enigmes.length; i++) {
                        if (data.data[0].enigmes[i].idquestion === this.enigme) {
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
    };

    //Stockage de la proposition de réponse pour comparaison//
    isProposing = (e) => {
        this.setState({
            proposition: e.target.value
        });
    }

    //Gestion de la bonne ou mauvaise réponse//
    ReponseManagement = () => {
        axios.post(`http://localhost:5000/api/enigmes/${this.state.id}`, {
            proposition: this.state.proposition,
        })
            .then(response => {
                if (response.data.status === true) {
                    this.props.goodTitle()
                    setTimeout(() => {
                        this.props.actualTitle()
                    }, 8000);

                    this.setState({
                        isContinue: true,
                        isResTrue: true,
                        final: Vrai,
                        visibilite: "pasvisible",
                        succeed: true,
                    })
                    this.saveResp()

                } else if (this.state.indiceNumber > 3 || (this.state.numClickValidate >= 2 && this.state.isResTrue === false)) {
                    this.props.badTitle()
                    setTimeout(() => {
                        this.props.actualTitle()
                    }, 8000);

                    this.setState({
                        isResTrue: false,
                        final: Faux,
                        succeed: false,
                    })
                }
                else {
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
            score: this.state.score,
            _idQuestion: this.state.id,
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

    render() {
        /* console.log("OUIII",this.state.isLoaded)
        console.log("succeed: ", this.state.succeed,"INDICES: ",this.state.indiceNumber,"isRESTRue: ", this.state.isResTrue) */

        return (
            <div class="EnigmePageContainer">
                <Header />
                {this.state.isLoaded ?
                    <div id='blockMap' className={this.props.isSliderOpen ? 'slideOut' : 'slideIn'}>
                        {this.state.img ? <img className="Illustration" src={require(`${this.state.img}`)} alt='' /> : null}
                        <p className="Titre">{this.state.enonce}</p>
                        <p className="BodyText">{this.state.texte}</p>

                        <AvForm className="reponse" onSubmit={this.isTrue}>
                            <h3 className="TitreQuestion">{this.state.question}</h3>
                            <AvField name="enigme" type="text" placeholder="votre réponse" onChange={this.isProposing} />
                            <div className="validationContainer">
                                {(this.state.isResTrue || this.state.indiceNumber > 3 || this.state.succeed || !this.state.succeed ) ?
                                    <NavLink to={`/MapPage/${window.localStorage.getItem("id")}`}><Button color="primary" type="button" className={this.state.visibilite}>Continuer</Button></NavLink>
                                    :
                                    <Button color="primary" onClick={() => { this.ReponseManagement() }} className={this.state.visibilite}>Valider</Button>}
                                <img className="final" src={this.state.final} alt='' />
                            </div>
                            <Button type="button" onClick={this.displayIndices} className="bonton2" >Indice</Button><br></br>
                            <div className="Textindices">{this.state.indice}</div>
                        </AvForm>
                    </div>
                    :
                    null}
            </div>

        );
    }
}

const mapStateToProps = state => ({
    title: state.titleManagement.title,
    enigme: state.reducerMongoEnigmes.enigme,
    display: state.reducerMongoEnigmes.display,
    check: state.reducerMongoEnigmes.check,

    isSliderOpen: state.reducerHeader.isSliderOpen,
})

const mapDispatchToProps = dispatch => {
    return {
        goodTitle: bindActionCreators(goodTitle, dispatch),
        badTitle: bindActionCreators(badTitle, dispatch),
        actualTitle: bindActionCreators(actualTitle, dispatch),
        displayEnigmeAction: bindActionCreators(displayEnigmeAction, dispatch),
        enigmeValidation: bindActionCreators(enigmeValidation, dispatch),
        enigmesFetch: bindActionCreators(enigmesFetch, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EnigmePage);