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
import { Modal, ModalHeader, ModalBody } from "reactstrap";

class MapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameMap: "tu es proche",
            loaded: false,
            countAnswer: 0,
        }
        this.tab = []

    }
    toggle = id => {
        this.setState({
            modal: id
        });
    };

    async componentDidMount() {
        await this.props.getPosition()
        await (this.props.enigme ? null : this.props.enigmesFetch())
        this.setState({ loaded: true })
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

    render() {
        return (
            <div>
                <NavLink to="../../"><button className="ButtonBack"> Retour </button></NavLink>
                <p className="points">{this.props.points} pts</p>
                <h3 className="TitreMapePage">{this.props.title}</h3>
                <div>
                    <Map className="map" center={[45.767383, 4.831571]} zoom={this.props.zoom}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
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
                        <Marker icon={iconBlack} position={this.props.currentPosition}>
                            <Circle
                                center={this.props.currentPosition}
                                fillColor="blue"
                                radius={200} />
                        </Marker>
                    </Map>
                    {this.state.loaded ?
                        <div>
                            {this.getDistance(this.props.currentPosition, this.props.enigme[1].coordonnee.map(Number)) < 200 ?
                                <div><p className="ProximitéMessage">{this.state.nameMap}</p></div> : null}
                        </div> : null}
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
