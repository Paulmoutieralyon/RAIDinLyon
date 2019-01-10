
import React from 'react';
import { Button, Input, FormGroup, Label, FormText } from 'reactstrap';
import './Addsession.css';
import {NavLink} from 'react-router-dom';

export default class AddEgnimes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <div className='containerAddsession'>
                <h1>Titre Session</h1>
                <FormGroup>
                    <Label for="exampleFile">Image</Label>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText color="muted">
                        Importer une image pour cette session
          </FormText>
                </FormGroup>
                

                <NavLink to = "/Admin/AddEgnimes"><Button>Créer une énigme</Button></NavLink>
                <NavLink to = "/Admin/AddTeam"><Button>Créer une équipe</Button></NavLink>
                <NavLink to = "/Admin/Classement"><Button>Classement</Button></NavLink>
                <NavLink to = "/Admin/SessionPage"><Button>Retour</Button></NavLink>
            </div>
        );
    }
}