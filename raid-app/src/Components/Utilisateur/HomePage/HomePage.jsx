import React from 'react';
import '../../../App.css';
import { NavLink } from 'react-router-dom';
import logo from '../../../Img/RaidLyonLogo.png';
import info from '../../../Img/info.png'

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <img className="LogoImg" src={logo} alt='homelogo' />
                <img className="infologo" src={info} alt='homeinfo' />
                <h1 className="TitreSession"> BIENVENUE <br /> A <br />RaidInLyon</h1>
                <NavLink to="../../MapEgnime/MapEgnime"><button className="Button1">Lancer la Partie</button></NavLink>
            </div>
        );
    }
}