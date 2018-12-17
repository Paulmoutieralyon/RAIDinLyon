
import React from 'react';
import { Button, Input, FormGroup, Label, FormText } from 'reactstrap';
import './Addsession.css'

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
                

                <Button>Créer une énigme</Button>
                <Button>Créer une équipe</Button>
                <Button>Classement</Button>
            </div>
        );
    }
}