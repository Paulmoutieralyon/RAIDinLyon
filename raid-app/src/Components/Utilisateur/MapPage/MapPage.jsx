import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { goodTitle, badTitle, actualTitle } from '../../../Actions/Utilisateur/titleManagement_action.jsx';
import './MapPage.css'
import L from 'leaflet';
import { getPosition } from '../../../Actions/Utilisateur/MapPageActions'

class MapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameMap: "tu es proche",

            //va y avoir la DB après
            id: 0,
            position: [0, 0]
        }
    }

    componentDidMount = () => {
        this.props.getPosition()


        fetch("http://localhost:5000/api/markers")
            .then(laPetiteReponse => {
                return laPetiteReponse.json()
            })
            .then(data => {
                this.setState({
                    id: data[0].id,
                    position: data[0].position,
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
                <p className="points">{0} pts</p>
                <h3 className="TitreMapePage">{this.props.title}</h3>
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
                            <NavLink to="/EnigmePage"> <button>Accéder à lénigme5</button> </NavLink>
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

                    {this.getDistance(this.props.currentPosition, position2) < 200 ?
                        <div>
                            <Circle
                                center={this.props.currentPosition}
                                fillColor="purple"
                                radius={200}

                            />
                        </div> : ' '}
                </Map>
                {this.getDistance(this.props.currentPosition, position2) < 200 ? <div><p className="ProximitéMessage">{this.state.nameMap}</p></div> : null}



            </div>
        );
    }
}

/* const mapDispatchToProps = dispatch => ({bindActionCreators({ getPosition }, dispatch)}) */

const mapDispatchToProps = dispatch => {
    return {
        getPosition: bindActionCreators(getPosition, dispatch),
        goodTitle: bindActionCreators(goodTitle, dispatch),
        badTitle: bindActionCreators(badTitle, dispatch),
        actualTitle: bindActionCreators(actualTitle, dispatch),
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

    eg1: state.reducerMapPage.eg1,
    eg2: state.reducerMapPage.eg2,
    eg3: state.reducerMapPage.eg2,
    eg4: state.reducerMapPage.eg3,
    eg5: state.reducerMapPage.eg4,
    eg6: state.reducerMapPage.eg5,

    currentPosition: state.reducerMapPage.currentPosition,

    title: state.titleManagement.title,
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