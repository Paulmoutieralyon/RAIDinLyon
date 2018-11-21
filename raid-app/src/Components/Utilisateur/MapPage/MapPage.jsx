import React from 'react';
import Modal from "react-responsive-modal";
import { connect } from 'react-redux'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import '../../../Css/Utilisateur/MapPage/HomePage.css'

class MapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

        const position1 = [this.props.lat1, this.props.lng1];
        const position2 = [this.props.lat2, this.props.lng2];
        const position3 = [this.props.lat3, this.props.lng3];
        const position4 = [this.props.lat4, this.props.lng4];
        const position5 = [this.props.lat5, this.props.lng5];
        const position6 = [this.props.lat6, this.props.lng6];
        return (
            <div>
                <Map className="map" center={position1} zoom={this.props.zoom}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={position1}>
                        <Popup>
                            <span>Wild Code School <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>
                    <Marker position={position2}>
                        <Popup>
                            <span>Wild Code School <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>
                    <Marker position={position3}>
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
                            <span>Wild Code School <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>
                    <Marker position={position4}>
                        <Popup>
                            <span>Wild Code School <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>
                    <Marker position={position5}>
                        <Popup>
                            <span>Wild Code School <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>
                    <Marker position={position6}>
                        <Popup>
                            <span>Wild Code School <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>
                </Map>
            </div>
        );
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
})

export default connect(mapStateToProps)(MapPage)