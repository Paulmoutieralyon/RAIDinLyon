import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "./MapPage.css";
import L from "leaflet";
import axios from "axios";
import { getPosition } from "../../../Actions/Utilisateur/MapPageActions";
import { enigmesFetch } from "../../../Actions/Utilisateur/enigmesFetchAction";
import { displayEnigmeAction } from "../../../Actions/displayEnigmeAction.js";
import moment from "moment";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Header from "../Header";

class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameMap: "tu es proche",
      loaded: true,
      countAnswer: 0,
      isOpenT: false,
      //deadline: 'January, 16, 2019, 18:00:00', // Choix : date et heure de fin
      hourEnd: "0",
      minEnd: "1", // Choix : temps de fin (ex : fin 30min avant 13h )
      secEnd: "0",
      hours: 0,
      minutes: 0,
      seconds: 0,
      timeoff: false,
      modal: false,
      scoreuser: null,
      pointrencontre: [1, 4],
      activationsession: null,
      modalMarker: false,
      succeed: false,
      loadedEnigmeEquipe: false,
      isSuccess: false,
      interval: function() {}
    };
    this.tab = [];
    this.user = this.props.match.params._id;
    setInterval(() => this.props.getPosition(), 10000);
  }

  toggle = id => {
    this.setState({
      modal: id
    });
  };

  async componentDidMount() {
    await this.props.getPosition();
    await this.props.enigmesFetch();
    // this.setState({ loaded: true })
    this.areAllAnswersTrue();
    axios
      .get("/api/session")
      .then(response => {
        this.setState({
          pointrencontre: response.data[0].pointrencontre,
          activationsession: response.data[0].isactivate
        });
        console.log(this.state.pointrencontre);
      })
      .catch(error => {
        throw error;
      });
    axios
      .get(`/api/equipe/${this.user}`)
      .then(data => {
        console.log("HALLO :", this.user);
        let score = data.data[0];
        this.setState({
          scoreuser: score.score
        });
        if (data.data.length >= 0) {
          this.data = data.data[0].enigmes;
          if (this.data === []) {
            this.setState({
              loadedEnigmeEquipe: false
            });
          } else {
            this.setState({
              loadedEnigmeEquipe: true
            });
          }
          //console.log("DATA: ", data.data[0].enigmes)
          //console.log("OoOoO: ", this.data)
        }
      })
      .catch(error => {
        throw error;
      });
  }

  allToggle = () => {
    console.log("tous ca ne mrche");
    this.setState({
      modalMarker: !this.state.modalMarker
    });
    this.toggleTimer();
  };

  areAllAnswersTrue = () => {
    for (let i = 0; i < this.props.enigme.length; i++) {
      if (this.props.enigme[i].check === true) {
        this.setState({ countAnswer: this.state.countAnswer + 1 });
      }
    }
  };

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
  selectColorIcon(questionId, allQuestionAnswered) {
    if (!allQuestionAnswered) return iconBlack;
    const questionAnwered = allQuestionAnswered.find(
      question => questionId === question._idQuestion
    );
    if (questionAnwered)
      if (questionAnwered.succeed) return iconGreen;
      else return iconRed;
    else return iconBlack;
  }
  handleModalCallback = modalMarkerState => {
    this.setState({ modalMarker: modalMarkerState });
  };

  saveEndTime = () => {
    axios
      .put(`/api/equipes/donnees/${window.localStorage.getItem("id")}`, {
        h_fin: moment().format()
      })
      .then(function(response) {
        console.log("L'envoi a fonctionné", response);
      })
      .catch(function(error) {
        console.log("L'envoi n'a PAS fonctionné", error);
      });
  };

  render() {
    return (
      <div className="mapPageContainer">
        <Header
          dataCallback={this.handleModalCallback}
          scoreuser={this.state.scoreuser}
        />

        <div
          id="blockMap"
          className={this.props.isSliderOpen ? "slideOut" : "slideIn"}
        >
          <div className="middle">
            <Map
              className="map"
              center={this.props.currentPosition}
              zoom={this.props.zoom}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
              />
              {this.state.loaded ? (
                <div>
                  {this.props.enigme.map((x, i) => (
                    <div>
                      {this.state.countAnswer === this.props.enigme.length ||
                      this.state.modalMarker ? (
                        <div>
                          {this.saveEndTime()}
                          <Marker
                            position={[
                              this.state.pointrencontre[0],
                              this.state.pointrencontre[1]
                            ]}
                          >
                            <Popup>
                              <p>
                                Félicitation, tu as répondu à toutes les énigmes
                                !<br /> Rends-toi ici, un cadeau t'attend
                              </p>
                            </Popup>
                          </Marker>
                        </div>
                      ) : (
                        <Marker
                          icon={this.selectColorIcon(
                            this.props.enigme[i]._id,
                            this.data
                          )}
                          position={this.props.enigme[i].coordonnee.map(Number)}
                          onClick={() => this.toggle(i)}
                        >
                          <Modal
                            className="Modale-content"
                            isOpen={this.state.modal === i}
                            toggle={this.toggle}
                          >
                            <ModalHeader toggle={this.toggle}>
                              <p>{this.props.enigme[i].titre}</p>
                            </ModalHeader>
                            <ModalBody className="modaltexte">
                              <NavLink
                                to={`/EnigmePage/${
                                  this.props.enigme[i]._id
                                }/${window.localStorage.getItem("id")}`}
                              >
                                {" "}
                                <button
                                  onClick={() =>
                                    this.props.displayEnigmeAction(i)
                                  }
                                >
                                  {" "}
                                  Accéder à lénigme
                                </button>{" "}
                              </NavLink>
                            </ModalBody>
                          </Modal>
                        </Marker>
                      )}
                    </div>
                  ))}
                </div>
              ) : null}
              <Marker icon={iconYou} position={this.props.currentPosition}>
                <Circle
                  center={this.props.currentPosition}
                  fillColor="blue"
                  /* radius={200} */
                />
              </Marker>
            </Map>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPosition: bindActionCreators(getPosition, dispatch),
    enigmesFetch: bindActionCreators(enigmesFetch, dispatch),
    displayEnigmeAction: bindActionCreators(displayEnigmeAction, dispatch)
  };
};

const mapStateToProps = state => ({
  zoom: state.reducerMapPage.zoom,
  lat1: state.reducerMapPage.lat1,
  lng1: state.reducerMapPage.lng1,
  eg1: state.reducerMapPage.eg1,
  currentPosition: state.reducerMapPage.currentPosition,
  enigme: state.reducerMongoEnigmes.enigme,
  check: state.reducerMongoEnigmes.check,
  points: state.pointManagement.points,
  isSliderOpen: state.reducerHeader.isSliderOpen
});

const iconYou = new L.Icon({
  iconUrl: require("./position.png"),
  iconRetinaUrl: require("./position.png"),
  iconSize: [50, 100],
  className: "blinking"
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
