import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './EnigmePage.css';
import Info from './Info.png';
import Pierrephilosophale from './Pierrephilosophale.jpeg';
import Faux from './faux.png';
import Vrai from './vrai.png';
import Vide from './Vide.png';

export default class EnigmePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reponse: ["la pierre philosophale", "pierre philosophale"],
            proposition: "",
            final: Vide,
            indice: null,
            indiceNumber: 0,
        };
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
            this.setState({ indice: "Amis de Albus, et Francais'" })
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
                <img className="bontonInfo" src={Info} alt="" />

                <img className="Illustration" src={Pierrephilosophale} alt=""/>
                <p className="Titre">Nicolas Flamel </p>
                <p>Nicolas Flamel, éminent personnage du XIVème siècle est essentiellement réputé comme étant l’alchimiste ayant réussi dans la quête de la Pierre Philosophale. On attribuait à cette pierre certaines propriétés dont celle de pouvoir transmuter les métaux vils en métaux précieux comme l’or ou l’argent.</p>

                <AvForm className="reponse" onSubmit={this.isTrue}>
                    <h3>Quelle découverte a rendu célèbre Nicolas Flamel ?</h3>
                    <AvField name="enigme" type="text" onChange={this.isProposing} />
                    <Button color="primary">Submit</Button>
                    <img className="final" src={this.state.final} alt="" />
                    <Button onClick={this.indices} classname="bonton2" >Indice</Button>
                    {this.state.indice}
                </AvForm>

            </div>

        );
    }
}

