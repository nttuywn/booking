import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SmsRetriever from 'react-native-sms-retriever';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

import { addworkPostDataRequest } from '../redux/rootAction';
import moment from 'moment';
import { DATE_FORMAT, TIME_FORMAT } from '../config/datetime-format';

class MSMSListen extends React.Component {

    constructor() {
        super();
        this.state = {
            content: null
        }
        this._onSmsListenerPressed();
    }

    componentDidUpdate = () => {
        this._onSmsListenerPressed();
    }

    getDataInSMS = message => {
        let bookingInfo = message.replace('/v2Jz9LM45WV', '').replace('<#>', '').split(',');
        let customerInfo = bookingInfo.map(e => e.split(':'));
        this.props.addworkPostDataRequest({
            name: customerInfo[0][1],
            phone: 'Later',
            date: moment(customerInfo[1][1]).format(DATE_FORMAT),
            hour: customerInfo[2][1],
            minute: customerInfo[2][2],
            status: false
        });
    }

    _onSmsListenerPressed = async () => {
        try {
            console.log(JSON.stringify(this.state));
            const registered = await SmsRetriever.startSmsRetriever();
            if (registered) {
                SmsRetriever.addSmsListener(event => {
                    if (event.message != undefined) {
                        console.log(event.message);
                        SmsRetriever.removeSmsListener();
                        this.setState({
                            content: event.message
                        });
                        this.getDataInSMS(event.message);
                    }
                    if (event.timeout == "Timeout error.") {
                        SmsRetriever.removeSmsListener();
                        this.setState({
                            content: null
                        })
                    }
                });
            }
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    };

    render = () => <Text></Text>
}

const mapStateToProps = state => {
    return {}
}

const mapStateToDispatch = dispatch =>
    bindActionCreators(
        {
            addworkPostDataRequest
        },
        dispatch
    );

const connectedMSMSListen = connect(mapStateToProps, mapStateToDispatch)(MSMSListen);
export default connectedMSMSListen;