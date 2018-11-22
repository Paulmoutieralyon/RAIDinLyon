import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './RaidLyonLogo.png';
import info from './info.png'
import './HomePage.css'

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="bodyHome">
                <img className="infologo" src={info} alt='homeinfo' />
                <img className="LogoImg" src={logo} alt='homelogo' />
                <h1 className="TitreSession"> BIENVENUE <br /> A <br />RaidInLyon</h1>
                <NavLink to="../../MapPage"><button className="Button1">Lancer la Partie</button></NavLink>
            </div>
        );
    }
}
