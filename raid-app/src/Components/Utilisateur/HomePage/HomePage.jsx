import React from 'react';
import '../../../App.css';
import { NavLink } from 'react-router-dom';
import logo from '../../../Img/RaidLyonLogo.png';
import info from '../../../Img/info.png'
import '../../../Css/Utilisateur/HomePage/HomePage.css'
import PointManagement from './pointManagement.jsx'

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="bodyHome">
                
                <img className="LogoImg" src={logo} alt='homelogo' />
                <img className="infologo" src={info} alt='homeinfo' />
                <h1 className="TitreSession"> BIENVENUE <br /> A <br />RaidInLyon</h1>
                <NavLink to="../../MapPage/MapPage"><button className="Button1">Lancer la Partie</button></NavLink>
                <PointManagement/>
            </div>
        );
    }
}
