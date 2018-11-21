import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import '../../../Css/Utilisateur/MapPage/HomePage.css'

export default class MapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 8,
            latWild: 45.746606,
            lngWild: 4.826917,
            /* 45.746606, 4.826917*/
        }
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        const positionWild = [this.state.latWild, this.state.lngWild]
        return (
            <div>
                <div>Ici la map des egnimes</div>
                <Map className="map" center={positionWild} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={position}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>
                    <Marker position={positionWild}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>
                </Map>
            </div>
        );
    }
}