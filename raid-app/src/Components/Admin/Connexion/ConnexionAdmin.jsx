
import React from 'react';
import Logo from './RaidinLyon.png';
import './ConnexionAdmin.css'

export default class ConnexionAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <img src={Logo} className='Logo'/>
                <form>
                    <label>
                        <h4>Utilisateur</h4>
                        <input className='Connexion' type="text" name="name" />
                    </label>

                    <label>
                        <h4>Mot de passe</h4>
                        <input className='Connexion' type="text" name="name" />
                    </label>
                    <input className='Connexion' type="submit" value="Submit" />
                </form >
            </div >
        );
    }
}