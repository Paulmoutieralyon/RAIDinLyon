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
                <h1>Sessions</h1>
                <Breadcrumb>
                    <BreadcrumbItem active>Session 1</BreadcrumbItem>
                    <Toggle />
                </Breadcrumb>
 

                <Card body>
                    <NavLink to = "/Admin/SessionPage"><Button>Nouvelle session</Button></NavLink>
                </Card>
                <NavLink to = "/Admin/"><Button>Retour</Button></NavLink>

            </div>
        );
    }
}