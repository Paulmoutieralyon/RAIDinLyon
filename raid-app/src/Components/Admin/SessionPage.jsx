import { Button } from 'reactstrap';
import React from 'react';
import './SessionPage.css'

export default class SessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='containerSessionPage'>
                <h1>Titre de la session</h1>
                <Button>Liste des énigmes</Button>
                <Button>Liste des équipes</Button>
                <Button>Classement</Button>
            </div>
        );
    }
}