import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
import { FaCompass } from 'react-icons/fa'
import { slideHeader } from '../../Actions/Utilisateur/headerActions'

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameMap: "tu es proche",
            loaded: true,
            countAnswer: 0,
            isOpen: false,
            isOpenT: false,
            deadline: 'January, 15, 2019, 18:00:00', // Choix : date et heure de fin
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
            interval: function () {

            }
        };

        this.tab = []
        setInterval(() => this.tick(), 1000)

    }

    // coundown timer
    componentWillMount() {
        this.getTimeUntil(this.state.deadline);
    }

    componentDidMount() {
        //setInterval(() => this.getTimeUntil(Date.parse(this.state.deadline)), 1000);
    }

    toggleTimer = () => {
        this.setState({
            modalTimer: !this.state.modalTimer
        });
    }

    allToggle = () => {
        this.setState({
            modalMarker: !this.state.modalMarker
        })
        this.toggleTimer()
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
        //console.log(this.state.hours)
        return (
            <div>
                <Navbar light expand="md">
                    <NavbarBrand href="../../"> Raid In Lyon </NavbarBrand><div className="count_title" >Fin :</div>
                    <Container className="d-none d-md-block">{this.props.title}</Container>
                    <Row>
                        <Col> {this.leading0(this.state.hours)}H</Col>
                        <Col> {this.leading0(this.state.minutes)}M</Col>
                        <Col>{this.leading0(this.state.seconds)}S</Col>
                    </Row>
                    <Modal isOpen={this.state.modalTimer} toggle={this.toggleTimer}>
                        <ModalHeader toggle={this.toggleTimer}>Session Terminer</ModalHeader>
                        <ModalBody>
                            Bravo à Vous, les épreuves sont terminer dirigez-vous vers le point final pour le classement. Soyez content de vous !
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.allToggle}>Allez !</Button>{' '}
                        </ModalFooter>
                    </Modal>
                    <NavbarToggler onClick={this.props.slideHeader}>
                        <FaCompass style={{ color: '#c6c6c6' }} />
                    </NavbarToggler>
                </Navbar>
                <ul className="menuList">
                    <li id='pts'>{this.props.points} pts</li>
                    <li>Accueil</li>
                    <li>Qui sommes-nous</li>
                    <li>Mentions légales / CGU</li>
                    <li>Nos partenaires</li>
                    <li>Contactez-nous</li>
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
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)