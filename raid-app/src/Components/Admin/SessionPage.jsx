
import { Breadcrumb, BreadcrumbItem, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Toggle from "react-toggle-component";
import Editable from 'react-x-editable';
import React from 'react';
import './SessionPage.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios'


export default class SessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idsession: null,
            nom: null,
            deadline: null,
            etat: null,
            checked: null
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/session')
            .then(response => {
                console.log(response.data[0])
                this.setState({
                    idsession: response.data[0]._id,
                    nom: response.data[0].nom,
                    deadline: response.data[0].deadline,
                    checked: response.data[0].isactivate
                })
            })
            .catch(error => {
                throw (error);
            });
        this.state.checked ? this.setState({ etat: "activée" }) : this.setState({ etat: "désactivée" })
    }

    async modifyTitle(value) {
        await this.setState({
            nom: value
        })
        await axios.put(`http://localhost:5000/api/session`,
            {
                _id: this.state.idsession,
                nom: this.state.nom
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async modifyActivation(value) {
        await this.setState({
            checked: value
        })
        await this.state.checked ? this.setState({ etat: "activée" }) : this.setState({ etat: "désactivée" })
        await axios.put(`http://localhost:5000/api/session/activation`,
            {
                _id:this.state.idsession,
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
        console.log(this.state.checked)
        return (
            <div className='containerSessionPage'>
                <Editable
                    name="username"
                    dataType="text"
                    value={this.state.nom}
                    validate={(value) => {
                        if (!value) {
                            return 'Required';
                        }
                        else {
                            this.modifyTitle(value)
                        }
                    }
                    }
                />
                <NavLink to="/Admin/ListEnigmes" ><Button>List Enigmes</Button></NavLink>
                <NavLink to="/Admin/ListTeam" ><Button>List Equipes</Button></NavLink>
                <NavLink to="/Admin/Classement" ><Button>Classement</Button></NavLink>
                <NavLink to="/Admin/"><Button>Retour</Button></NavLink>

                <Breadcrumb>
                    <BreadcrumbItem active>Session {this.state.etat}</BreadcrumbItem>
                    <Toggle
                        mode="select"
                        checked={this.state.checked}
                        onToggle={value => this.modifyActivation(value)} />
                </Breadcrumb>
            </div>
        );
    }
}