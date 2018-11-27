import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import './MapPage.css'
import L from 'leaflet';
import { getPosition } from '../../../Actions/Utilisateur/MapPageActions'

class MapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = () => {
        this.props.getPosition()
        /*         navigator.geolocation.getCurrentPosition(location => {
                    this.setState({
                        lat: location.coords.latitude,
                        lng: location.coords.longitude,
                    })
                    this.setState({ currentPosition: [this.state.lat, this.state.lng] })
                }); */
    }
    render() {

        const position1 = [this.props.lat1, this.props.lng1];
        const position2 = [this.props.lat2, this.props.lng2];
        const position3 = [this.props.lat3, this.props.lng3];
        const position4 = [this.props.lat4, this.props.lng4];
        const position5 = [this.props.lat5, this.props.lng5];
        const position6 = [this.props.lat6, this.props.lng6];

        const enigme1 = [this.props.eg1];
        const enigme2 = [this.props.eg2];
        const enigme3 = [this.props.eg3];
        const enigme4 = [this.props.eg4];
        const enigme5 = [this.props.eg5];
        const enigme6 = [this.props.eg6]
        return (
            
            <div>
                <NavLink to="../../"><button className="ButtonBack"> Retour </button></NavLink>
                <p className="TitreMapPage"> SUR LES TRACES DE NICOLAS FLAMEL</p>
                <Map className="map" center={position1} zoom={this.props.zoom}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    <Marker icon={iconRed} position={position1}>
                        <Popup>
                            <span>{enigme1}<br /></span>
                            <NavLink to="/EnigmePage"> <button>Accéder à lénigme</button> </NavLink>
                        </Popup>
                    </Marker>
                    <Marker icon={iconRed} position={position2}>
                        <Popup>
                            <span>{enigme2}<br /></span>
                            <NavLink to="/EnigmePage"> <button>Accéder à lénigme</button> </NavLink>
                        </Popup>
                    </Marker>
                    <Marker icon={iconRed} position={position3}>
                        <Popup>
                            <span>{enigme3} <br /></span>
                            <NavLink to="/EnigmePage"> <button>Accéder à lénigme</button> </NavLink>
                        </Popup>
                    </Marker>
                    <Marker icon={iconRed} position={position4}>
                        <Popup>
                            <span>{enigme4}<br /></span>
                            <NavLink to="/EnigmePage"> <button>Accéder à lénigme</button> </NavLink>
                        </Popup>
                    </Marker>
                    <Marker icon={iconRed} position={position5}>
                        <Popup>
                            <span>{enigme5}<br /></span>
                            <NavLink to="/EnigmePage"> <button>Accéder à lénigme</button> </NavLink>
                        </Popup>
                    </Marker>
                    <Marker icon={iconRed} position={position6}>
                        <Popup>
                            <span>{enigme6}<br /></span>
                            <NavLink to="/EnigmePage"> <button>Accéder à lénigme</button> </NavLink>
                        </Popup>
                    </Marker>
                    <Marker icon={iconBlack} position={this.props.currentPosition}>
                        <Popup>
                            <span>{enigme6}<br /></span>
                            <NavLink to="/EnigmePage"> <button>Accéder à lénigme</button> </NavLink>
                        </Popup>
                        <Circle
                            center={this.props.currentPosition}
                            fillColor="blue"
                            radius={200} />
                    </Marker>
                </Map>
                <p><h1>{this.state.lat}{this.state.lng}</h1></p>
            </div>
        );
    }
}

/* const mapDispatchToProps = dispatch => ({bindActionCreators({getPosition}, dispatch)}) */

const mapDispatchToProps = dispatch => {
    return {
        getPosition: bindActionCreators(getPosition, dispatch)
    }
}

const mapStateToProps = state => ({
    zoom: state.reducerMapPage.zoom,
    lat1: state.reducerMapPage.lat1,
    lng1: state.reducerMapPage.lng1,
    lat2: state.reducerMapPage.lat2,
    lng2: state.reducerMapPage.lng2,
    lat3: state.reducerMapPage.lat3,
    lng3: state.reducerMapPage.lng3,
    lat4: state.reducerMapPage.lat4,
    lng4: state.reducerMapPage.lng4,
    lat5: state.reducerMapPage.lat5,
    lng5: state.reducerMapPage.lng5,
    lat6: state.reducerMapPage.lat6,
    lng6: state.reducerMapPage.lng6,

    //nom énigme
    eg1: state.reducerMapPage.eg1,
    eg2: state.reducerMapPage.eg2,
    eg3: state.reducerMapPage.eg2,
    eg4: state.reducerMapPage.eg3,
    eg5: state.reducerMapPage.eg4,
    eg6: state.reducerMapPage.eg5,

    currentPosition: state.reducerMapPage.currentPosition,
})

const iconRed = new L.Icon({
    iconUrl: require('./map-default-red.png'),
    iconRetinaUrl: require('./map-default-red.png'),
    iconSize: [50, 100],
});
const iconBlack = new L.Icon({
    iconUrl: require('./map-default-black.png'),
    iconRetinaUrl: require('./map-default-black.png'),
    iconSize: [50, 50],
});
const iconGreen = new L.Icon({
    iconUrl: require('./map-default-green.png'),
    iconRetinaUrl: require('./map-default-green.png'),
    iconSize: [50, 50],
});


export default connect(mapStateToProps, mapDispatchToProps)(MapPage)