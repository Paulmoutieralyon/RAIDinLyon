import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// Chemin 
import HomePage from './Components/Utilisateur/HomePage/HomePage';
import EnigmePage from './Components/Utilisateur/EnigmePage/EnigmePage';
import MapPage from './Components/Utilisateur/MapPage/MapPage';
import AddEgnimes from './Components/Admin/Enigmes/AddEgnimes';
import AddTeam from './Components/Admin/Equipes/AddTeam';
import ListTeam from './Components/Admin/Equipes/ListTeam';
import AdminComptes from './Components/Admin/Administrateurs/AdminComptes';
import AddAdmin from './Components/Admin/Administrateurs/AddAdmin'
import Classement from './Components/Admin/Equipes/Classement';
import ConnexionAdmin from './Components/Admin/Connexion/ConnexionAdmin';
import ListEgnimes from './Components/Admin/Enigmes/ListEgnimes';
import ListSessionPage from './Components/Admin/Sessions/ListSessionPage';
import SessionPage from './Components/Admin/Sessions/SessionPage';


export default class App extends Component {

  render() {
    return (
      <div className="App">

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/EnigmePage" component={EnigmePage} />
            <Route path="/MapPage/" component={MapPage} />

            <Route exact path="/Admin" component={ConnexionAdmin} />
            <Route path="/Admin/AddTeam" component={AddTeam} />
            <Route path="/Admin/ListTeam" component={ListTeam} />
            <Route path="/Admin/AdminComptes" component={AdminComptes} />
            <Route path="/Admin/AddAdmin" component={AddAdmin} />
            <Route path="/Admin/Classement" component={Classement} />
            <Route path="/Admin/ListEgnimes" component={ListEgnimes} />
            <Route path="/Admin/ListSessionPage" component={ListSessionPage} />
            <Route path="/Admin/SessionPage" component={SessionPage} />
            <Route path="/Admin/AddEgnimes" component={AddEgnimes} />
          </Switch>
        </BrowserRouter>

      </div>
    );
  };
};