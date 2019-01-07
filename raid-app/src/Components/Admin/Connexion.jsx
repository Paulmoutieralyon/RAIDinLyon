
import React, { Fragment } from 'react';
//import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { TextField, Snackbar, Button, IconButton, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from "react-router-dom";
import logo from './logo_tinyplanet_orange.png';
import './Connexion.css'

export default class AdminComptes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='containerConnexion'>
                <Grid 
                    alignItems='center'
                    style={{ height: '100%' }}
                    item xs={12} sm={6}
                    style={{ 'text-align': 'center' }}>
                        <img src={logo} />

                        <Fragment >
                            <TextField
                                label='Admin'
                                type='text'
                                name='text'
                                className='inputadmin'
                            />
                            <br />
                            <TextField
                                label='Password'
                                type='password'
                                name='password'
                                className='inputpassword'
                            />
                            
                            <br />
                            <Button color="secondary" size="lg">Connexion</Button>
                            
                            
                        </Fragment>
                        </Grid>
            </div >
                    );
                }
}