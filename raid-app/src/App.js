import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// Chemin 
import HomePage from './Components/Utilisateur/HomePage/HomePage';
import HomePageRedirect from './Components/Utilisateur/HomePage/HomePageRedirect';
import EnigmePage from './Components/Utilisateur/EnigmePage/EnigmePage';
import MapPage from './Components/Utilisateur/MapPage/MapPage';
import AddEgnimes from './Components/Admin/AddEgnimes';
import AddTeam from './Components/Admin/AddTeam';
import AdminComptes from './Components/Admin/AdminComptes';
import Classement from './Components/Admin/Classement';
import Connexion from './Components/Admin/Connexion';
import ListEnigmes from './Components/Admin/ListEnigmes';
import ListSessionPage from './Components/Admin/ListSessionPage';
import SessionPage from './Components/Admin/SessionPage';
import Listequipes from './Components/Admin/ListEquipes';
import Addsession from './Components/Admin/Addsession';
import QrCodeScan from './Components/Admin/QrCodeScan';
import ListAdmin from './Components/Admin/ListAdmin';
import UnEnigme from './Components/Admin/UnEnigme';
import uneTeam from './Components/Admin/uneTeam';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activation: null,
      componentsession: null
    };
  }

  componentDidMount() {
    axios.get('/api/session')
      .then(response => {
        this.setState({
          componentsession: response.data[0].isactivate
        })
      })
      .catch(error => {
        throw (error);
      });
  }

  render() {
    console.log(this.state.componentsession)
    console.log(window.localStorage.getItem("token"), "ok")
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            {this.state.componentsession ?
              <div>
                {window.localStorage.getItem("token") ?
                  <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/EnigmePage/:_id/:id" component={EnigmePage} />
                    <Route path="/MapPage/:_id" component={MapPage} />
                  </Switch>
                  :
                  <Switch>
                    <Route exact path="/" component={HomePage} />
                  </Switch>
                }
                </div>
              :
              <Switch>
                <Route path="/redirection" component={HomePageRedirect} />
              </Switch>
            }

            {window.localStorage.getItem("tokenAdmin") ?
              <Switch>
                <Route exact path="/Admin" component={Connexion} />
                <Route path="/Admin/AddTeam/:_id" component={AddTeam} />
                <Route path="/Admin/AdminComptes/:_id" component={AdminComptes} />
                <Route path="/Admin/Classement/:_id" component={Classement} />
                <Route path="/Admin/ListEnigmes/:_id" component={ListEnigmes} />
                <Route path="/Admin/ListAdmin/:_id" component={ListAdmin} />
                <Route path="/Admin/ListSessionPage/:_id" component={ListSessionPage} />
                <Route path="/Admin/ListTeam/:_id" component={Listequipes} />
                <Route path="/Admin/SessionPage/:_id" component={SessionPage} />
                <Route path="/Admin/AddEgnimes/:_id" component={AddEgnimes} />
                <Route path='/Admin/Addsession/:_id' component={Addsession} />
                <Route path='/Admin/QrCodeScan/:_id' component={QrCodeScan} />
                <Route path="/Admin/enigmes/:_id/:id" component={UnEnigme} />
                <Route path="/Admin/equipe/:_id/:id" component={uneTeam} />
              </Switch>
              :
              <Switch>
                <Route exact path="/Admin" component={Connexion} />
              </Switch>
            }
          </div>
        </BrowserRouter>
      </div>
    );
  };
};