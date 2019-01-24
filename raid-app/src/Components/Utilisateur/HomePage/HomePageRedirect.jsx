import React from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import logo from './RaidLyonLogo.png'
import info from './info.png'
import './HomePage.css'
import './InfosModalHome.css'

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="bodyHome">
                <div className='allinfo'>
                    <img className='Infologo' onClick={this.toggle} src={info} alt='infologo'>{this.props.buttonLabel}</img>

                    <h1>Cette page n'est pas accessible ! :) </h1>
                    <img className="LogoImg" src={logo} alt='homelogo' />
                    {/*                         <h1 className="TitreSession"> BIENVENUE <br /> A <br />RaidInLyon</h1> */}
                </div>
            </div>

        );
    }
}

