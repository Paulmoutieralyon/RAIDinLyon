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
import Header from '../Header'

class MapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameMap: "tu es proche",
            loaded: true,
            countAnswer: 0,
            isOpenT: false,
            //deadline: 'January, 16, 2019, 18:00:00', // Choix : date et heure de fin
            hourEnd: '0',
            minEnd: '1', // Choix : temps de fin (ex : fin 30min avant 13h ) 
            secEnd: '0',
            hours: 0,
            minutes: 0,
            seconds: 0,
            timeoff: false,
            modal: false,
            modalMarker: false,
            interval: function () {

            }
        };
        this.tab = []
        setInterval(() => this.props.getPosition(), 10000)
    }


    toggle = id => {
        this.setState({
            modal: id
        });
    };

    async componentDidMount() {
        await this.props.getPosition()
        await this.props.enigmesFetch()
        // this.setState({ loaded: true })
        this.areAllAnswersTrue()
    }

    allToggle = () => {
        console.log('tous ca ne mrche')
        this.setState({
            modalMarker: !this.state.modalMarker
        })
        this.toggleTimer()
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

    handleModalCallback = (modalMarkerState) => {
        this.setState({ modalMarker: modalMarkerState})
    }

    render() {

        return (
            <div className="mapPageContainer">
                <Header
                dataCallback={this.handleModalCallback}
                />

                <div id='blockMap' className={this.props.isSliderOpen ? 'slideOut' : 'slideIn'}>
                    <div className="middle">
                        <Map className="map" center={this.props.currentPosition} zoom={this.props.zoom} zoomControl={false}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
                            />
                            {this.state.loaded ?
                                <div>
                                     {this.state.countAnswer === this.props.enigme.length || this.state.modalMarker ? 
                                     
                                        <Marker position={[45.758473, 4.859238]}>
                                            <Popup>
                                                <p>Félicitation, tu as répondu à toutes les énigmes !<br /> Rends-toi ici, un cadeau t'attend</p>
                                            </Popup>
                                        </Marker>
                                        :
                                        <div>
                                        {this.props.enigme.map((x, i) =>
                                            
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
                                                                <NavLink to={`/EnigmePage/${this.props.enigme[i]._id}/${window.localStorage.getItem("id")}`}>
                                                                    {" "}
                                                                    <button onClick={() => this.props.displayEnigmeAction(i)}> Accéder à lénigme</button>{" "}
                                                                </NavLink>
                                                            </ModalBody>
                                                        </Modal>
                                                    </Marker>
                                        )}
                                        </div>
                                     }
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

    isSliderOpen: state.reducerHeader.isSliderOpen,
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