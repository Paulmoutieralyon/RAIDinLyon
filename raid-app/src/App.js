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
import ListEnigmes from './Components/Admin/ListEnigmes';
import ListSessionPage from './Components/Admin/ListSessionPage';
import SessionPage from './Components/Admin/SessionPage';
import Listequipes from './Components/Admin/ListEquipes';
import Addsession from './Components/Admin/Addsession';
import QrCodeScan from './Components/Admin/QrCodeScan';
import ListAdmin from './Components/Admin/ListAdmin';
import UnEnigme from './Components/Admin/UnEnigme';
import uneTeam from './Components/Admin/uneTeam';



export default class App extends Component {

  render() {
    return (
      <div className="App">

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/EnigmePage/:_id" component={EnigmePage} />
            <Route path="/MapPage/" component={MapPage} />

            <Route exact path="/Admin" component={Connexion} />
            <Route path="/Admin/AddTeam" component={AddTeam} />
            <Route path="/Admin/AdminComptes" component={AdminComptes} />
            <Route path="/Admin/Classement" component={Classement} />
            <Route path="/Admin/ListEnigmes" component={ListEnigmes} />
            <Route path="/Admin/ListAdmin" component={ListAdmin} />
            <Route path="/Admin/ListSessionPage" component={ListSessionPage} />
            <Route path="/Admin/ListTeam" component={Listequipes} />
            <Route path="/Admin/SessionPage" component={SessionPage} />
            <Route path="/Admin/AddEgnimes" component={AddEgnimes} />
            <Route path='/Admin/Addsession' component={Addsession} />
            <Route path='/Admin/QrCodeScan' component={QrCodeScan} />
            <Route path="/Admin/enigmes/:id" component={UnEnigme} />
            <Route path="/Admin/equipe/:_id" component={uneTeam} />

          </Switch>
        </BrowserRouter>

      </div>
    );
  };
};