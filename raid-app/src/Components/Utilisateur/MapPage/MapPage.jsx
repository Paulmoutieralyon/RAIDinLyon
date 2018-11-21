import React from 'react';
import Modal from "react-responsive-modal";
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
            open: false,
        }
    }

    onOpenModal = () => {
        this.setState({
            open: true
        });
    };

    onCloseModal = () => {
        this.setState({
            open: false
        });
    };

    render() {
        const { open } = this.state;

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
                            <span>
                                Egnime n°1 <br /> <button onClick={this.onOpenModal}>Go </button>
                                <Modal open={open} onClose={this.onCloseModal} center>
                                    <h2>Enigme n°1</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                                        pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                                        hendrerit risus, sed porttitor quam.</p>
                                </Modal>
                            </span>
                        </Popup>
                    </Marker>
                </Map>
            </div>
        );
    }
}