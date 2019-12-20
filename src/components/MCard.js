import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { View } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { Button, Text } from 'react-native-ui-kitten';

import { homeFinishJobRequest } from '../redux/rootAction';

import MCountingTime from './MCountingTime';

class MCard extends React.Component {

    constructor() {
        super();
        this.state = {
            start: false,
        }
        this.clock = React.createRef();
    }

    finishJob = () => {
        this.props.homeFinishJobRequest({
            ...this.props.item,
            status: '1'
        });
        this.clock.current.stopClock();
    }

    render() {
        const customer = this.props.item;
        return (
            <Card>
                <Card.Title
                    title={customer.name}
                    subtitle={customer.phone}
                    left={(props) => <Avatar.Image {...props} source={{ uri: 'http://images.summitmedia-digital.com/cosmo/images/2018/11/27/blackpink-lisa-1543288094.jpg' }} />} />
                <Card.Content>
                    <Text category="h6">{`Ngày hẹn: ${customer.date}`}</Text>
                    <Text category="h6">{`Thời gian hẹn: ${customer.hour}:${customer.minute}`}</Text>
                    <Text category="h6">Thời gian bắt đầu: 14:05</Text>
                    {this.state.start ? <MCountingTime ref={this.clock}/> : <Text category="h6">Công việc chưa bắt đầu</Text>}
                </Card.Content>

                {customer.status == "1" ?
                    <Text category="h6">Công việc đã được thực hiện</Text> :
                    <Card.Actions>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                            {this.state.start ?
                                <Button status='danger'
                                    onPress={() => this.finishJob()}>
                                    Kết Thúc
                            </Button> :
                                <Button status='success'
                                    onPress={() => this.setState({
                                        start: true
                                    })}>
                                    Bắt Đầu
                            </Button>
                            }
                        </View>
                    </Card.Actions>
                }
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const { } = state;
    return {};
}

const mapStateToDispatch = dispatch =>
    bindActionCreators(
        {
            homeFinishJobRequest
        },
        dispatch
    );

const connectedMCard = connect(mapStateToProps, mapStateToDispatch)(MCard);
export default connectedMCard;