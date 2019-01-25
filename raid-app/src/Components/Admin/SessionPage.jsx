
import { Breadcrumb, BreadcrumbItem, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Toggle from "react-toggle-component";
import Editable from 'react-x-editable';
import React from 'react';
import './SessionPage.css';
import DatePicker from 'react-datepicker'
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
const moment = require('moment');

export default class SessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idsession: null,
            nom: null,
            deadline: null,
            etat: null,
            checked: null,
            pointrencontre: ["Vide", "Vide"],
            startDate: new Date(),
            visible: "visible",
            invisible: "invisible"
        };
    }

    handleChange = (date) => {
        this.setState({
            startDate: date
        });
        console.log(this.state.startDate)
    }

    componentDidMount() {
        axios.get('/api/session')
            .then(response => {
                console.log(response.data[0])
                this.setState({
                    idsession: response.data[0]._id,
                    nom: response.data[0].nom,
                    deadline: response.data[0].deadline,
                    checked: response.data[0].isactivate,
                    pointrencontre: response.data[0].pointrencontre
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
        await axios.put(`/api/session/modifytitle`,
            {
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
        await axios.put(`/api/session/activation`,
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

    modify = (e) => {
        this.setState({
            visible: "invisible",
            invisible: "visible"
        })
    }

    async modifyLattitude(value) {
        const newLat = this.state.pointrencontre.slice()
        newLat[0] = value
        await this.setState({
            pointrencontre: newLat
        })
        console.log(this.state.pointrencontre)
        await axios.put(`/api/session/meetingpoint`,
            {
                pointrencontre: this.state.pointrencontre
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async modifyLongitude(value) {
        const newLat = this.state.pointrencontre.slice()
        newLat[1] = value
        await this.setState({
            pointrencontre: newLat
        })
        console.log(this.state.pointrencontre)
        await axios.put(`/api/session/meetingpoint`,
            {
                pointrencontre: this.state.pointrencontre
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    submit = () => {
        let momentDate = moment(this.state.startDate).format("MMMM, DD, YYYY, H:mm:ss")
        axios.put(`/api/session/modifydeadline`,
            {
                deadline: momentDate
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({
            visible: "visible",
            invisible: "invisible"
        })

    }

    render() {
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
                <NavLink to={`/Admin/ListEnigmes/${window.localStorage.getItem('idAdmin')}`} ><Button>List Enigmes</Button></NavLink>
                <NavLink to={`/Admin/ListTeam/${window.localStorage.getItem('idAdmin')}`} ><Button>List Equipes</Button></NavLink>
                <NavLink to={`/Admin/Classement/${window.localStorage.getItem('idAdmin')}`} ><Button>Classement</Button></NavLink>
                <NavLink to={`/Admin`}><Button>Retour</Button></NavLink>

                <Breadcrumb>
                    <BreadcrumbItem active>Session {this.state.etat}</BreadcrumbItem>
                    <Toggle
                        mode="select"
                        checked={this.state.checked}
                        onToggle={value => this.modifyActivation(value)} />
                </Breadcrumb>
                <p>Fin de la partie le :</p> <p className={this.state.visible}><Moment date={this.state.startDate} format="MMMM, DD, YYYY, H:mm:ss" /></p>
                <Button className={this.state.visible} onClick={this.modify}>Modifier la date</Button>
                <Button className={this.state.invisible} onClick={this.submit}>Enregistrer les modification</Button>
                <DatePicker
                    className={this.state.invisible}
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MM, yyyy, dd h:mm aa"
                    timeCaption="time"
                />
                <p>Lieu de rendez-vous en fin de partie :</p>
                <p>Lattitude:</p>
                <Editable
                    name="username"
                    dataType="text"
                    value={this.state.pointrencontre[0]}
                    validate={(value) => {
                        if (!value) {
                            return 'Required';
                        }
                        else {
                            this.modifyLattitude(value)
                        }
                    }
                    }
                />
                <p>Longitude:</p>
                <Editable
                    name="username"
                    dataType="text"
                    value={this.state.pointrencontre[1]}
                    validate={(value) => {
                        if (!value) {
                            return 'Required';
                        }
                        else {
                            this.modifyLongitude(value)
                        }
                    }
                    }
                />
            </div>
        );
    }
}