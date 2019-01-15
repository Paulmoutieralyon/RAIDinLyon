import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './RaidLyonLogo.png';
import info from './info.png';
import './HomePage.css';
import './InfosModalHome.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div className="bodyHome">
                <div className='allinfo'>
                    <img className='Infologo'  onClick={this.toggle}  src={info} alt='infologo'>{this.props.buttonLabel}</img>
                    
                        <Modal className='Modale' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Règle du jeu de piste</ModalHeader>
                            <ModalBody className='modaltexte'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </ModalBody>
                        </Modal>

                        <img className="LogoImg" src={logo} alt='homelogo' />
{/*                         <h1 className="TitreSession"> BIENVENUE <br /> A <br />RaidInLyon</h1> */}
                        <NavLink to="../../MapPage"><button className="Button1">Lancer la Partie</button></NavLink>
                </div>
                </div>

                );
            }
        }
        
