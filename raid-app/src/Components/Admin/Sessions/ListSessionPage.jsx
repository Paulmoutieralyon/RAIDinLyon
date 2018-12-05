
import React from 'react';
import './ListSessionPage.css'
import { Breadcrumb, BreadcrumbItem,Card, Button, CardTitle, CardText } from 'reactstrap';
import ToggleButton from 'react-toggle-button';

export default class ListSessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    /* Telecharger "npm i react-toggle-button" pour faire fonctionner le toggle */

    render() {
        return (
            <div>
                <h2>Sessions</h2>
                <Breadcrumb>
                    <BreadcrumbItem active>Session 1</BreadcrumbItem>
                    <ToggleButton className='toggle' />
                </Breadcrumb>

                <Breadcrumb>
                    <BreadcrumbItem active>Session 2</BreadcrumbItem>
                    <ToggleButton className='toggle' />
                </Breadcrumb>

                <Breadcrumb>
                    <BreadcrumbItem active>Session 3</BreadcrumbItem>
                    <ToggleButton className='toggle' />
                </Breadcrumb>

                <Card body>
                    <Button>Créer une nouvelle session</Button>
                </Card>
            </div>
        );
    }
}