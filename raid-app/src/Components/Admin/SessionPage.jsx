
import { Button, Container, Row, Col } from 'reactstrap'
import Editable from 'react-x-editable'
import React from 'react'
import './SessionPage.css'
import DatePicker from 'react-datepicker'
import { NavLink } from 'react-router-dom'
import Moment from 'react-moment'
import Sessionactivation from './Sessionactivation'
import Sessiontimer from './Sessiontimer'
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css"
import { FaUsers, FaScroll, FaTrophy, FaChevronLeft, FaStopwatch } from 'react-icons/fa'

const moment = require('moment')

export default class SessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idsession: null,
            nom: null,
            deadline: null,
            etat: null,
            etattimer: null,
            pointrencontre: ["Vide", "Vide"],
            startDate: new Date(),
            displayDate: true,
        };
    }

    handleChange = (date) => {
        this.setState({
            startDate: date
        });
        console.log(this.state.startDate)
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/session')
            .then(response => {
                this.setState({
                    idsession: response.data[0]._id,
                    nom: response.data[0].nom,
                    deadline: response.data[0].deadline,
                    pointrencontre: response.data[0].pointrencontre
                })
            })
            .catch(error => {
                throw (error);
            });
    }

    async modifyTitle(value) {
        await this.setState({
            nom: value
        })
        await axios.put(`http://localhost:5000/api/session/modifytitle`,
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


    modify = (e) => {
        this.setState({
            displayDate: !this.state.displayDate
        })
    }

    async modifyLattitude(value) {
        const newLat = this.state.pointrencontre.slice()
        newLat[0] = value
        await this.setState({
            pointrencontre: newLat
        })
        console.log(this.state.pointrencontre)
        await axios.put(`http://localhost:5000/api/session/meetingpoint`,
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
        await axios.put(`http://localhost:5000/api/session/meetingpoint`,
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
        axios.put(`http://localhost:5000/api/session/modifydeadline`,
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
            displayDate: !this.state.displayDate
        })
    }

    render() {
        return (
            <div className='containerSessionPage'>
                <Container>
                    {/*                     <Editable
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
                    /> */}
                    <Row>
                        <Col>
                            <NavLink to={`/Admin/ListEnigmes/${window.localStorage.getItem('idAdmin')}`} >
                                <Button>
                                    <div className='textButton'>Enigmes</div>
                                    <div className='textButtonIcon'><FaScroll /></div>
                                </Button>
                            </NavLink>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <NavLink to={`/Admin/ListTeam/${window.localStorage.getItem('idAdmin')}`} >
                                <Button>
                                    <div className='textButton'>Equipes</div>
                                    <div className='textButtonIcon'><FaUsers /></div>
                                </Button>
                            </NavLink>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <NavLink to={`/Admin/Classement/${window.localStorage.getItem('idAdmin')}`} >
                                <Button>
                                    <div className='textButton'>Classement</div>
                                    <div className='textButtonIcon'><FaTrophy /></div>
                                </Button>
                            </NavLink>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                {this.state.displayDate ?
                                    <div className="dateContainer">
                                        <DatePicker
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            dateFormat="MM, yyyy, dd h:mm aa"
                                            timeCaption="time"
                                        />
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            <Button onClick={this.modify} className="buttonBig" /* className={this.state.displayDate ? "buttonDateContainer" : "buttonDate"} */>
                                <div className='textButton'>
                                    {this.state.displayDate ?
                                        null
                                        :
                                        <p>
                                            <Moment date={this.state.startDate} format="MMMM, DD, YYYY, H:mm:ss" />
                                        </p>
                                    }
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className="buttonBig">
                                <Container>
                                    <Row>
                                        <Col>
                                            <p>Lieu de rendez-vous en fin de partie :</p>
                                        </Col>
                                        <Col>
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
                                        </Col>
                                    </Row>
                                </Container>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <Sessionactivation />
                        </Col>
                        <Col xs="6">
                            <Sessiontimer />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <NavLink to={`/Admin`}>
                                <Button className="buttonMenu">
                                    <div className='textButton'>Retour</div>
                                    <div className='textButtonIcon'><FaChevronLeft /></div>
                                </Button>
                            </NavLink>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}