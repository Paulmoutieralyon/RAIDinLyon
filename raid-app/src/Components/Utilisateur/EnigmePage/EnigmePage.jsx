
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
            //Stockage reponse utilisateur
            repondues: []
        };
        this.data = null
        this.page = this.props.match.params._id
    }

    //Fetch et stockage des données de l'énigme en state //
    componentDidMount = () => {
        axios.get(`http://localhost:5000/api/enigmes/${this.page}`)
            .then(data => {
                this.data = data.data[0]
                console.log(data.data[0])
                this.setState({
                    id: this.data._id,
                    check:this.data.check,
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
            this.setState({ indice: this.state.indices[0] })
        }
        if (this.state.indiceNumber === 1) {
            this.setState({ indice: this.state.indices[1] })
        }
        if (this.state.indiceNumber === 2) {
            this.setState({ indice: this.state.indices[2] })
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

                    const repondues = this.state.repondues.slice()
                    repondues[0] = this.state.id //Stockage de l'ID de la réponse dans un tableau

                    this.setState({
                        repondues: repondues,
                        isContinue: true,
                        isResTrue: true,
                        final: Vrai,
                        visibilite: "pasvisible"
                    })

                } else {
                    this.props.badTitle()
                    setTimeout(() => {
                        this.props.actualTitle()
                    }, 8000);

                    const repondues = this.state.repondues.slice()
                    repondues[0] = this.state.id //Stockage de l'ID de la réponse dans un tableau

                    this.setState({
                        repondues: repondues,
                        isResTrue: false,
                        final: Faux
                    })
                }
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });


    }


    //Enregistrement de l'ID de l'enigme repondue dans le BDD - Ca ne fonctionne pas//
    saveResp = () => {
        console.log(this.state.repondues[0])
        axios.put(`http://localhost:5000/api/equipes/5c34c834c9f9f928fd7b1ada`, {
            repondues: this.state.repondues[0]
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
                        {(this.state.isResTrue) ? <Button color="primary" type="button" className={this.state.visibilite}>Valider</Button>
                            : <Button color="primary" onClick={() => { this.ReponseManagement() }} className={this.state.visibilite}>Valider</Button>}
                        <img className="final" src={this.state.final} alt='' />
                    </div>
                    <Button type="button" onClick={this.displayIndices} className="bonton2" >Indice</Button><br></br>
                    <div className="Textindices">{this.state.indice}</div>
                    {(this.state.isContinue === true || this.state.indiceNumber > 3) ?
                        <NavLink to={`/MapPage/${window.localStorage.getItem("id")}`}><button className="buttonContinuer" onClick={this.saveResp}>Continuer</button></NavLink>
                        :
                        null}
                </AvForm>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    title: state.titleManagement.title,
    enigme: state.reducerMongoEnigmes.enigme,
    display: state.reducerMongoEnigmes.display,
    check: state.reducerMongoEnigmes.check
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
