import React from 'react'
import axios from 'axios'
import Toggle from "react-toggle-component"
import { InputGroup, InputGroupAddon, Input, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import logo from './logo_tinyplanet_orange.png'
import './Connexion.css'
import './SessionPage.css'
import { FaStopwatch } from 'react-icons/fa'


export default class AdminComptes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timerchecked: true,
            timeretat: "desactivée",
        }
    }

    componentDidMount() {
        //this.modifyTimerActivation()
        axios.get('/api/session')
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
        this.state.timerchecked ? this.setState({ timeretat: "activée" }) : this.setState({ timeretat: "désactivée" })
    }


    modifyTimerActivation = () => {
        this.setState({
            timerchecked: !this.state.timerchecked
        })
        this.state.timerchecked ? this.setState({ timeretat: "activée" }) : this.setState({ timeretat: "désactivée" })
        axios.put('/api/session/timeractivation',
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
            <div className="toggleBlock">
                <Button className={this.state.timeretat === "activée"?"toggleActived":"toggleDeactivated"} onClick={this.modifyTimerActivation}>
                    <div className='textButtonIcon'>
                        <FaStopwatch />
                    </div>
                    <div className="togglerButtonText">{this.state.timeretat}</div>
                </Button>
            </div>
        )
    }
}