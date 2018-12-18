import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { goodTitle, badTitle, actualTitle } from '../../../Actions/Utilisateur/titleManagement_action.jsx';
import './MapPage.css'
import L from 'leaflet';
import { getPosition } from '../../../Actions/Utilisateur/MapPageActions'
import { enigmesFetch } from '../../../Actions/Utilisateur/enigmesFetchAction'

class MapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameMap: "tu es proche",
            coordonee: [0, 0],
            isFloat: false,
        }
        this.tab = []
        this.data = null
    }

    componentDidMount = () => {
        this.props.getPosition()
        this.props.enigmesFetch()

        fetch("http://localhost:5000/api/enigmes")
            .then(laPetiteReponse => {
                return laPetiteReponse.json()
            })
            .then(data => {
                this.data = data
                this.setState({
                    isFloat: true
                })
            })
    }


    getDistance(distance1, currentPosition) {
        let lon1 = this.toRadian(distance1[0]),
            lat1 = this.toRadian(distance1[1]),
            lon2 = this.toRadian(currentPosition[0]),
            lat2 = this.toRadian(currentPosition[1]);
        let deltaLat = lat2 - lat1;
        let deltaLon = lon2 - lon1;

        let a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
        let c = 2 * Math.asin(Math.sqrt(a));
        let EARTH_RADIUS = 6371;
        return c * EARTH_RADIUS * 1000;
    }

    toRadian(degrees) {
        return degrees * Math.PI / 180;
    }

    render() {
        let position1 = [0, 0]
        /*         this.props.enigme[0] ? console.log([this.props.enigme[0].coordonnee[0], this.props.enigme[0].coordonnee[1]]) : console.log('wait') */
        this.props.enigme[0] ? position1 = [this.props.enigme[0].coordonnee[0], this.props.enigme[0].coordonnee[1]] : console.log("wait")
        const enigme1 = [this.props.eg1];
        
        return (
            <div>

                <NavLink to="../../"><button className="ButtonBack"> Retour </button></NavLink>
                <p className="points">{0} pts</p>
                <h3 className="TitreMapePage">{this.props.title}</h3>
                {(this.state.isFloat === true) ?
                    <div>
                        <Map className="map" center={this.data[1].coordonee.map(Number)} zoom={this.props.zoom}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                            />
                            {this.data.map((x, i) =>
                                <Marker position={this.data[i].coordonee.map(Number)}>
                                    <Popup>
                                        <p>{this.data[i].titre}</p>
                                        <NavLink to="/EnigmePage"> <button>Accéder à lénigme</button> </NavLink>
                                    </Popup>
                                </Marker>
                            )}
                            <Marker icon={iconBlack} position={this.props.currentPosition}>
                                <Circle
                                    center={this.props.currentPosition}
                                    fillColor="blue"
                                    radius={200} />
                            </Marker>
                            {this.getDistance(this.props.currentPosition, this.data.map((x, i) => this.data[i].coordonee.map(Number))) > 200 ?
                                <div><Circle center={this.props.currentPosition} fillColor="purple" radius={200} /></div> : ' '
                            }
                        </Map>
                        {this.getDistance(this.props.currentPosition, this.data[1].coordonee.map(Number)) < 200 ?
                            <div><p className="ProximitéMessage">{this.state.nameMap}</p></div> : null
                        }
                    </div> : <div></div>
                }
            </div >
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getPosition: bindActionCreators(getPosition, dispatch),
        enigmesFetch: bindActionCreators(enigmesFetch, dispatch),

        goodTitle: bindActionCreators(goodTitle, dispatch),
        badTitle: bindActionCreators(badTitle, dispatch),
        actualTitle: bindActionCreators(actualTitle, dispatch),
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
})

const iconRed = new L.Icon({
    iconUrl: require('./map-default-red.png'),
    iconRetinaUrl: require('./map-default-red.png'),
    iconSize: [50, 100],
});
const iconBlack = new L.Icon({
    iconUrl: require('./map-default-black.png'),
    iconRetinaUrl: require('./map-default-black.png'),
    iconSize: [50, 100],
});
const iconGreen = new L.Icon({
    iconUrl: require('./map-default-green.png'),
    iconRetinaUrl: require('./map-default-green.png'),
    iconSize: [50, 50],
});


export default connect(mapStateToProps, mapDispatchToProps)(MapPage)