import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

// Chemin 

import HomePage from './Components/Utilisateur/HomePage/HomePage';
import EnigmePage from './Components/Utilisateur/EnigmePage/EnigmePage';
import MapPage from './Components/Utilisateur/MapPage/MapPage';

import AddEgnimes from './Components/Admin/AddEgnimes';
import AddTeam from './Components/Admin/AddTeam';
import AdminComptes from './Components/Admin/AdminComptes';
import Classement from './Components/Admin/Classement';
import Connexion from './Components/Admin/Connexion';
import ListEgnimes from './Components/Admin/ListEgnimes';
import ListSessionPage from './Components/Admin/ListSessionPage';
import SessionPage from './Components/Admin/SessionPage';

export default class App extends Component {


  render() {
    return (
      <div className="App">

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/EnigmePage" component={EnigmePage} />
            <Route path="/MapPage/" component={MapPage} />

            <Route exact path="/Admin" component={Connexion} />
            <Route path="/Admin/AddTeam" component={AddTeam} />
            <Route path="/Admin/AdminComptes" component={AdminComptes} />
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