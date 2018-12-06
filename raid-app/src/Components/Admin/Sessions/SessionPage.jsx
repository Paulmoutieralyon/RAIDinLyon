import { Button, Card } from 'reactstrap';
import React from 'react';
import './SessionPage.css';
import imageRandom from './Imagerandom.png';

export default class SessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <img src={imageRandom} />
                <h1>Titre de la session</h1>
                <Button>Liste des énigmes</Button>
                <Button>Liste des équipes</Button>
                <Button>Classement</Button>
            </div>
        );
    }
}