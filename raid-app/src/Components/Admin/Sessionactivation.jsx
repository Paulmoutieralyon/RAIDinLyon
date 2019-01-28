import React from 'react'
import axios from 'axios'
import Toggle from "react-toggle-component"
import { Button } from 'reactstrap'
import logo from './logo_tinyplanet_orange.png'
import './Connexion.css'
import './SessionPage.css'


export default class AdminComptes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: true,
            etat: "désactivée"
        }
    }

    componentDidMount() {
        this.modifyActivation()
        axios.get('http://localhost:5000/api/session')
            .then(response => {
                console.log(response.data[0])
                this.setState({
                    idsession: response.data[0]._id,
                    checked: response.data[0].isactivate,
                })
            })
            .catch(error => {
                throw (error);
            });
        this.state.checked ? this.setState({ etat: "activée" }) : this.setState({ etat: "désactivée" })
    }

    modifyActivation = () => {
        this.setState({
            checked: !this.state.checked
        })
        this.state.checked ? this.setState({ etat: "activée" }) : this.setState({ etat: "désactivée" })
        axios.put(`http://localhost:5000/api/session/activation`,
            {
                isactivate: this.state.checked
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="toggleBlock">
                <Button className="togglerButton" onClick={this.modifyActivation} >
                    <div className="togglerButtonText">Session {this.state.etat}</div>
                </Button>
            </div>
        )
    }
}