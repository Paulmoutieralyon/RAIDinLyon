import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Toggle from "react-toggle-component";
import "react-toggle-component/styles.css"

export default class ListSessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>Sessions</h1>
                <Breadcrumb>
                    <BreadcrumbItem active>Session 1</BreadcrumbItem>
                    <Toggle />
                </Breadcrumb>
 

                <Card body>
                    <Button>Nouvelle session</Button>
                </Card>


            </div>
        );
    }
}