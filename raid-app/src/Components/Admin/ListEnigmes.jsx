import React from 'react';
import './ListEnigmes.css'
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Breadcrumb, Card, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import axios from 'axios';
import trash from './trash.jpg'

import "react-toggle-component/styles.css"

export default class ListSessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enigmes: [],
            actualisation: false
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/enigmes/')
            .then(response => {
                this.setState({
                    enigmes: response.data
                })
            })
            .catch(error => {
                throw (error);
            });
    }

    EnigmesList = () => {
        return this.state.enigmes.map((enigme, i) => {
            return (
                <BrowserRouter>
                    <Breadcrumb>
                        <ListGroup>
                            <NavLink to={`/enigmes/${enigme.titre}`} onClick={this.forceUpdate} className="navlink">
                                <ListGroupItem active>
                                    <ListGroupItemHeading>{enigme.titre}</ListGroupItemHeading>
                                    <ListGroupItemText>
                                    </ListGroupItemText>
                                </ListGroupItem>
                            </NavLink>
                            <img src={trash} onClick={() => this.Delete(enigme._id, i)} className="trash" />
                        </ListGroup>
                    </Breadcrumb>
                </BrowserRouter >
            )
        })
    }

    Delete = (enigmeid, index) => {
        axios.delete(`http://localhost:5000/api/enigmes/${enigmeid}`)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    const tab = this.state.enigmes.slice()
                    delete tab[index]
                    this.setState({ enigmes: tab })
                    console.log(this.state.enigmes)
                }
            })
    }

    render() {
        return (
            <div>
                <h1>Énigmes</h1>

                {this.EnigmesList()}
                < Card body >
                    <NavLink to='/Admin/AddEnigmes' onClick={this.forceUpdate}>
                        <Button>Nouvelle énigme</Button>
                    </NavLink>
                </Card >

            </div >
        );
    }
}