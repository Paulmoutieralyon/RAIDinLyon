import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import { goodTitle, badTitle, actualTitle } from '../../../Actions/Utilisateur/titleManagement_action.jsx'
import './MapPage.css'
import L from 'leaflet'
import { getPosition } from '../../../Actions/Utilisateur/MapPageActions'
import { enigmesFetch } from '../../../Actions/Utilisateur/enigmesFetchAction'
import { displayEnigmeAction } from '../../../Actions/displayEnigmeAction.js'
import {
    Container,
    Collapse,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Button,
    Row,
    Col,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { FaCompass } from 'react-icons/fa';

class MapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameMap: "tu es proche",
            loaded: true,
            countAnswer: 0,
            isOpen: false,
            deadline: '10/01/2019',
            hours: 0,
            minutes: 0,
            seconds: 0,
            timeoff: false,
            modal: false,
            interval: function() {

            }
        };
        this.toggle = this.toggle.bind(this);
        this.tick = this.tick.bind(this);
        this.tab = []
        setInterval(() => this.tick(), 1000)

    }
    toggle = id => {
        this.setState({
            modal: id
        });
    };
    
       // coundown timer
       componentWillMount() {
        this.getTimeUntil(this.state.deadline);
    }
    leading0(num) {
        return num < 0 ? '0' + num : num;
        
    }

    componentDidMount() {
        setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
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

    tick() {
        this.getTimeUntil(this.state.deadline);
        
        const counterEnd = this.state.deadline + '  ' + '13' + ':' + '12' + ':' + '0';
        let counterCheckEnd = this.state.deadline + '  ' + this.state.hours + ':' + this.state.minutes + ':' + this.state.seconds;
       
        console.log(counterCheckEnd + ' Compare à : ' + counterEnd);
        if( counterCheckEnd === counterEnd ){
            console.warn('end game');
                this.setState({
                  modal: !this.state.modal
                });
              
        }
    }


    async componentDidMount() {
        await this.props.getPosition()
        await this.props.enigmesFetch()
        // this.setState({ loaded: true })
        this.areAllAnswersTrue()
    }

    areAllAnswersTrue = () => {
        for (let i = 0; i < this.props.enigme.length; i++) {
            if (this.props.enigme[i].check === true) {
                this.setState({ countAnswer: this.state.countAnswer + 1 })
            }
        }
    }

    getDistance(distance1, currentPosition) {
        let lon1 = this.toRadian(distance1[0]),
            lat1 = this.toRadian(distance1[1]),
            lon2 = this.toRadian(currentPosition[0]),
            lat2 = this.toRadian(currentPosition[1]);
        let deltaLat = lat2 - lat1;
        let deltaLon = lon2 - lon1;
        let a =
            Math.pow(Math.sin(deltaLat / 2), 2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
        let c = 2 * Math.asin(Math.sqrt(a));
        let EARTH_RADIUS = 6371;
        return c * EARTH_RADIUS * 1000;
    }

    toRadian(degrees) {
        return (degrees * Math.PI) / 180;
    }

    toggleHead = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        console.log("render",this.props.enigme)
        return (
            <div className="mapPageContainer">
                <Navbar light expand="md">
                    <NavbarBrand href="../../"> Raid In Lyon </NavbarBrand><div className="count_title" >Fin :</div>
                    <Container className="d-none d-md-block">{this.props.title}</Container>
                    <Row>
                        <Col> {this.leading0(this.state.hours)}H</Col>
                        <Col> {this.leading0(this.state.minutes)}M</Col>
                        <Col>{this.leading0(this.state.seconds)}S</Col>
                    </Row>
                    
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>La session est terminer</ModalHeader>
                    <ModalBody>Bravo à vous la session est terminer veillez rejoindre le dernier points sur la map pour les résultats. Soyez fier de vous !</ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Allez</Button>
                    
                    </ModalFooter>
                    </Modal>
                    <NavbarToggler onClick={this.toggleHead}>
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
                <div id='blockMap' className={this.state.isOpen ? 'slideOut' : 'slideIn'}>
                    <div className="middle">
                        <Map className="map" center={[45.767383, 4.831571]} zoom={this.props.zoom}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
                            />
                            {this.state.loaded ?
                                <div>
                                    {this.props.enigme.map((x, i) =>
                                        <div>
                                            {this.state.countAnswer === this.props.enigme.length ?
                                                <Marker position={[45.758473, 4.859238]}>
                                                    <Popup>
                                                        <p>Félicitation, tu as répondu à toutes les énigmes !<br /> Rends-toi ici, un cadeau t'attend</p>
                                                    </Popup>
                                                </Marker>
                                                :
                                                <Marker position={this.props.enigme[i].coordonnee.map(Number)} onClick={() => this.toggle(i)}>
                                                    <Modal
                                                        className="Modale-content"
                                                        isOpen={this.state.modal === i}
                                                        toggle={this.toggle}
                                                    >
                                                        <ModalHeader toggle={this.toggle}>
                                                            <p>{this.props.enigme[i].titre}</p>
                                                        </ModalHeader>
                                                        <ModalBody className="modaltexte">
                                                            <NavLink to="/EnigmePage">
                                                                {" "}
                                                                <button onClick={() => this.props.displayEnigmeAction(i)}> Accéder à lénigme</button>{" "}
                                                            </NavLink>
                                                        </ModalBody>
                                                    </Modal>
                                                </Marker>}
                                        </div>
                                    )}
                                </div> : null}
                            <Marker icon={iconYou} position={this.props.currentPosition}>
                                <Circle
                                    center={this.props.currentPosition}
                                    fillColor="blue"
                                    /* radius={200} */ />
                            </Marker>
                        </Map>
                    </div>
                </div>
            </div >
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPosition: bindActionCreators(getPosition, dispatch),
        enigmesFetch: bindActionCreators(enigmesFetch, dispatch),
        goodTitle: bindActionCreators(goodTitle, dispatch),
        badTitle: bindActionCreators(badTitle, dispatch),
        actualTitle: bindActionCreators(actualTitle, dispatch),
        displayEnigmeAction: bindActionCreators(displayEnigmeAction, dispatch)
    }
}

const mapStateToProps = state => ({
    zoom: state.reducerMapPage.zoom,
    lat1: state.reducerMapPage.lat1,
    lng1: state.reducerMapPage.lng1,
    eg1: state.reducerMapPage.eg1,
    currentPosition: state.reducerMapPage.currentPosition,
    title: state.titleManagement.title,
    enigme: state.reducerMongoEnigmes.enigme,
    check: state.reducerMongoEnigmes.check,
    points: state.pointManagement.points,
})

const iconYou = new L.Icon({
    iconUrl: require("./position.png"),
    iconRetinaUrl: require("./position.png"),
    iconSize: [50, 100],
    className: 'blinking'
});
const iconRed = new L.Icon({
    iconUrl: require("./map-default-red.png"),
    iconRetinaUrl: require("./map-default-red.png"),
    iconSize: [50, 100]
});
const iconBlack = new L.Icon({
    iconUrl: require("./map-default-black.png"),
    iconRetinaUrl: require("./map-default-black.png"),
    iconSize: [50, 100]
});
const iconGreen = new L.Icon({
    iconUrl: require("./map-default-green.png"),
    iconRetinaUrl: require("./map-default-green.png"),
    iconSize: [50, 50]
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapPage);