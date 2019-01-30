import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import {
    Container,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Button,
    Row,
    Col
} from "reactstrap"
import './MapPage/MapPage.css'
import './Header.css'
import { FaBars } from 'react-icons/fa'
import { slideHeader } from '../../Actions/Utilisateur/headerActions'

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeractivation: null,
            nameMap: "tu es proche",
            loaded: true,
            countAnswer: 0,
            isOpen: false,
            isOpenT: false,
            deadline: null, // Choix : date et heure de fin
            hourEnd: '0',
            minEnd: '30', // Choix : temps de fin (ex : fin 30min avant 13h ) 
            secEnd: '0',
            hours: 0,
            minutes: 0,
            seconds: 0,
            timeoff: false,
            modal: false,
            modalTimer: false,
            modalMarker: false,
            testValue: 13,
            score: null,
            interval: function () {

            }

        };
        //this.user = this.props.match.params.id
        this.tab = []
        setInterval(() => this.tick(), 1000)

    }

    // coundown timer
    componentWillMount() {
        this.getTimeUntil(this.state.deadline);
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/equipe/${window.localStorage.getItem('id')}`)
            .then(data => {
                this.setState({
                    score: data.data[0].score
                })
            })
            .catch(error => {
                throw (error);
            })
        axios.get(`http://localhost:5000/api/session`)
            .then(response => {
                this.setState({
                    deadline: response.data[0].deadline,
                    timeractivation: response.data[0].activetimer
                })
            });
    }

    toggleTimer = () => {
        this.setState({
            modalTimer: !this.state.modalTimer
        });
    }

    allToggle = (event) => {

        const { dataCallback } = this.props
        this.toggleTimer()
        dataCallback(!this.state.modalMarker) // callback pour appler la function modalmarker
    }

    leading0(num) {
        return num < 0 ? '0' + num : num;
    }

    getTimeUntil(deadL) {
        const time = Date.parse(deadL) - Date.parse(new Date());
        if (time < 0) {
            this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
            const seconds = Math.floor((time / 1000) % 60);
            const minutes = Math.floor((time / 1000 / 60) % 60);
            const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
            this.setState({ hours, minutes, seconds });
        }
    }

    tick = () => {
        this.getTimeUntil(this.state.deadline);
        const counterEnd = this.state.deadline + '  ' + this.state.hourEnd + ':' + this.state.minEnd + ':' + this.state.secEnd;
        let counterCheckEnd = this.state.deadline + '  ' + this.state.hours + ':' + this.state.minutes + ':' + this.state.seconds;
        if (counterCheckEnd === counterEnd) {
            this.toggleTimer()
        }

    }

    render() {
        const { post } = this.props
        return (
            <div className='headerContainer'>
                <Navbar light expand="md">
                    <NavbarBrand><Link to={`/MapPage/${window.localStorage.getItem("id")}`}> Raid In Lyon </Link></NavbarBrand>

                    {this.state.timeractivation ?
                        <div className="timerHeader">
                            <Container className="d-none d-md-block">{this.props.title}</Container>
                            <div className="count_title" >Fin:</div>
                                <Row>
                                    <Col> {this.leading0(this.state.hours)}h</Col>
                                    <Col> {this.leading0(this.state.minutes)}mn</Col>
                                    <Col>{this.leading0(this.state.seconds)}s</Col>
                                </Row>
                        </div> : null}
                    <Modal isOpen={this.state.modalTimer} toggle={this.toggleTimer}>
                        <ModalHeader toggle={this.toggleTimer}>Raid Terminé !</ModalHeader>
                        <ModalBody>
                            Retrouvez-vous à l'adresse indiquée sur la map !  
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.allToggle}>En route !</Button>{' '}
                        </ModalFooter>
                    </Modal>
                        <NavbarToggler onClick={this.props.slideHeader}>
                            <FaBars style={{ color: '#c6c6c6' }} />
                        </NavbarToggler>
                     
                </Navbar>
                <ul className="menuList">
                    <li id='pts'>{this.state.score} pts</li>
                    <Link style={{ textDecoration: 'none' }} to={`/`}><li>Accueil</li></Link>
                    <a style={{ textDecoration: 'none' }} href={`http://raidinlyon.fr/lassociation-raidinlyon/`}><li>Qui sommes-nous</li></a>
                    <a style={{ textDecoration: 'none' }} href={`http://raidinlyon.fr/`}><li>Mentions légales / CGU</li></a>
                    <a style={{ textDecoration: 'none' }} href={`http://raidinlyon.fr/`}><li>Nos partenaires</li></a>
                    <a style={{ textDecoration: 'none' }} href={`http://raidinlyon.fr/contact/`}><li>Contactez-nous</li></a>
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        slideHeader: bindActionCreators(slideHeader, dispatch),
    }
}

const mapStateToProps = state => ({
    isSliderOpen: state.reducerHeader.isSliderOpen,
    points: state.pointManagement.points,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)