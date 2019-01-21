import React from 'react';
import './ListEnigmes.css'
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Breadcrumb, Card, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import axios from 'axios';
import trash from './trash.jpg'
import "react-toggle-component/styles.css"

export default class ListAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: [],
        };
    }


    componentDidMount() {
        axios.get('/api/administrateurs/')
            .then(response => {
                this.setState({
                    admin: response.data
                })
            })
            .catch(error => {
                throw (error);
            });
    }

    AdminList = () => {
        return this.state.admin.map((administrateur, i) => {
            return (
                <BrowserRouter>
                    <Breadcrumb>
                        <ListGroup>
                            <NavLink to={`/administrateurs/${administrateur.email}`} onClick={this.forceUpdate} className="navlink">
                                <ListGroupItem active>
                                    <ListGroupItemHeading>{administrateur.email}</ListGroupItemHeading>
                                    <ListGroupItemText>
                                    </ListGroupItemText>
                                </ListGroupItem>
                            </NavLink>
                            <img src={trash} onClick={() => this.Delete(administrateur._id, i)} className="trash" />
                        </ListGroup>
                    </Breadcrumb>
                </BrowserRouter >
            )
        })
    }

    Delete = (administrateurid, index) => {
        axios.delete(`/api/administrateurs/${administrateurid}`)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    const tab = this.state.admin.slice()
                    delete tab[index]
                    this.setState({ admin: tab })
                    console.log(this.state.admin)
                }
            })
    }

    render() {
        return (
            <div>
                <h1>Administrateurs</h1>

                {this.AdminList()}
                < Card body >
                    <NavLink to='AdminComptes' onClick={this.forceUpdate}>
                        <Button>Nouvelle administrateur</Button>
                    </NavLink>
                </Card >

            </div >
        );
    }
}