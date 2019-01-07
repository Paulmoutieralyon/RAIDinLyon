import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, Button} from 'reactstrap';
import './ListEquipes.css'
import "react-toggle-component/styles.css"

export default class ListSessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='containerListEquipe'>
                <h1>Équipes</h1>
                <Breadcrumb>
                    <BreadcrumbItem active>Équipe 1</BreadcrumbItem>
                </Breadcrumb>
                <Breadcrumb>
                    <BreadcrumbItem active>Équipe 2</BreadcrumbItem>
                </Breadcrumb>

                <Card body>
                    <Button>Nouvelle équipe</Button>
                </Card>


            </div>
        );
    }
}