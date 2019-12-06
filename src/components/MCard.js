import React from 'react';

import { View } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { Button, Text } from 'react-native-ui-kitten';
import MCountingTime from './MCountingTime';

export default class MCard extends React.Component {

    constructor() {
        super();
        this.state = {
            start: false,
        }
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
                    {this.state.start ? <MCountingTime /> : <Text category="h6">Công việc chưa bắt đầu</Text>}
                </Card.Content>

                <Card.Actions>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button status='success'
                            onPress={() => this.setState({
                                start: true
                            })}>
                            Bắt Đầu
                            </Button>
                        <Button status='danger'>Hủy Bỏ</Button>
                    </View>
                </Card.Actions>
            </Card>
        );
    }
}