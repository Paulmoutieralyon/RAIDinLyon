import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, Button} from 'reactstrap';

import "react-toggle-component/styles.css"

export default class ListSessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>Énigmes</h1>
                <Breadcrumb>
                    <BreadcrumbItem active>Énigme 1</BreadcrumbItem>
                </Breadcrumb>
                <Breadcrumb>
                    <BreadcrumbItem active>Énigme 2</BreadcrumbItem>
                </Breadcrumb>

                <Card body>
                    <Button>Nouvelle énigme</Button>
                </Card>


            </div>
        );
    }
}