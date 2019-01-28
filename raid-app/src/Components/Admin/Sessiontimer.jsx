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
            timerchecked: null,
            timeretat: null,
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/session')
            .then(response => {
                this.setState({
                    idsession: response.data[0]._id,
                    timerchecked: response.data[0].activetimer,
                })
                this.state.timerchecked ? this.setState({ timeretat: "activée" }) : this.setState({ timeretat: "désactivée" })
            })
            .catch(error => {
                throw (error);
            });
    }


    async modifyTimerActivation(value) {
        await this.setState({
            timerchecked: value
        })
        await this.state.timerchecked ? this.setState({ timeretat: "activée" }) : this.setState({ timeretat: "désactivée" })
        await axios.put('http://localhost:5000/api/session/timeractivation',
            {
                activetimer: this.state.timerchecked
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
                <BreadcrumbItem>Timer : {this.state.timeretat}</BreadcrumbItem>
                <Toggle
                    name="timer"
                    mode="switch"
                    checked={this.state.timerchecked}
                    onToggle={value => this.modifyTimerActivation(value)} />
            </Breadcrumb>

        );
    }
}