import React from 'react'
import axios from 'axios'
import Toggle from "react-toggle-component"
import { InputGroup, InputGroupAddon, Input, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import logo from './logo_tinyplanet_orange.png'
import './Connexion.css'


export default class AdminComptes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: null,
            etat: null,
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/session')
            .then(response => {
                console.log(response.data[0])
                this.setState({
                    idsession: response.data[0]._id,
                    checked: response.data[0].isactivate,
                })
                this.state.checked ? this.setState({ etat: "activée" }) : this.setState({ etat: "désactivée" })
            })
            .catch(error => {
                throw (error);
            });
        
    }

    async modifyActivation(value) {
        await this.setState({
            checked: value
        })
        await this.state.checked ? this.setState({ etat: "activée" }) : this.setState({ etat: "désactivée" })
        await axios.put(`http://localhost:5000/api/session/activation`,
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

            <Breadcrumb>
                <BreadcrumbItem >Session {this.state.etat}</BreadcrumbItem>
                <Toggle
                    name="activation"
                    mode="switch"
                    checked={this.state.checked}
                    onToggle={value => this.modifyActivation(value)} />
            </Breadcrumb>

        );
    }
}