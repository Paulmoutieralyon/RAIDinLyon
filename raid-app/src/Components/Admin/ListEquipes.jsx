import React from 'react';
import './ListEquipes.css'
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Breadcrumb, Card, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import axios from 'axios';
import trash from './trash.jpg'

import "react-toggle-component/styles.css"

export default class ListEquipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            equipe: [],
            actualisation: false
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/equipes/')
            .then(response => {
                
                this.setState({
                    equipe: response.data
                    
                })
            })
            .catch(error => {
                throw (error);
            });
    }

    EquipeList = () => {
        return this.state.equipe.map((equipe, i) => {
            return (
                <BrowserRouter>
                    <Breadcrumb>
                        <ListGroup>
                            <NavLink to={`/equipe/${equipe._id}`} onClick={this.forceUpdate} className="navlink">
                                <ListGroupItem active>
                                    <ListGroupItemHeading>{equipe.nom}</ListGroupItemHeading>
                                    <ListGroupItemText>
                                    </ListGroupItemText>
                                </ListGroupItem>
                            </NavLink>
                            <img src={trash} onClick={() => this.Delete(equipe._id, i)} className="trash" />
                        </ListGroup>
                    </Breadcrumb>
                </BrowserRouter>
            )
        })

    }

    Delete = (equipeid, index) => {
        axios.delete(`http://localhost:5000/api/equipe/${equipeid}`)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    const tab = this.state.equipe.slice()
                    delete tab[index]
                    this.setState({ equipe: tab })
                    console.log(this.state.equipe)
                }
            })
    }

    addTeam = e => {
        e.preventDefault()
        window.location.href = 'AddTeam';
    }

    render() {
        return (
            <div>
                <h1 className="titre"> Liste des Equipes </h1>
                    {this.EquipeList()}
                        <Card body>
                            <NavLink to='AddEquipes' onClick={this.forceUpdate}>
                            <Button onClick={this.addTeam}> Nouvelle Equipe </Button>
                            <NavLink to = "/Admin/Addsession"><Button>Retour</Button></NavLink>
                            </NavLink>
                        </Card>
            </div>
        );
    }
}