import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Toggle from "react-toggle-component";
import "react-toggle-component/styles.css";
import './ListSessionPage.css';
import {NavLink} from 'react-router-dom';

export default class ListSessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div class='containerListSessionPage'>
                <h1>Session</h1>
                <Breadcrumb>
                    <NavLink to="/Admin/SessionPage"><BreadcrumbItem active><Button>Sur les traces de Nicolas flamel</Button></BreadcrumbItem></NavLink>
                    <Toggle />
                </Breadcrumb>
 

                <Card body>
                    <NavLink to = "/Admin/Addsession"><Button>Modifier</Button></NavLink>
                </Card>
                <NavLink to = "/Admin/"><Button>Retour</Button></NavLink>

            </div>
        );
    }
}