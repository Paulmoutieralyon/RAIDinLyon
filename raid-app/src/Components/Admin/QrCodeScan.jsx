import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

class QrCodeScan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 300,
            result: 'No Result',
            resolution: 600,
            dataAtPush: [],
        };
        this.handleScan = this.handleScan.bind(this);
        this.handlePush = this.handlePush.bind(this);
    }
    handleScan(data) {
        if (data) {
            this.setState({
                result: data,
            });
        }
    }
    handlePush() {
        this.setState({
            dataAtPush: this.state.result,
        });
    }
    handleError(err) {
        console.error(err);
    }
    render() {
        console.log("les datas" + this.state.dataAtPush + "sont push !")
        return (
            <div>
                <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    resolution={this.resolution}
                    onScan={this.handleScan}
                    style={{ width: '75%', display: 'block', justifyContent: 'center', alignItems: 'center' }}
                />
                <img style={{ width: '50%' }} src={this.state.result} alt="" />
                <button onClick={this.handlePush}
                    style={{ color: 'white' ,
                    /*     box-shadow: -3px -3px 0px #ca9307; */
                        background: 'rgb(75, 73, 73)',
                        
                        border: '2px double orange',
                        display : 'block',
                        width: '80vw',
                        height:'70px',
                        margin:'100px auto', 
                         }}
                >
                    Valider
				</button>
            </div>
        );
    }
}

export default QrCodeScan;
