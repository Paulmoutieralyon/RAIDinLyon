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
                <h1>Cette page n'est pas accessible ! :) </h1>
            </div>

        );
    }
}

