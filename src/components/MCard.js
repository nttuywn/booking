import React from 'react';

import { View } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { Button, Text } from 'react-native-ui-kitten';

export default class MCard extends React.Component {
    render() {
        return (
            <Card>
                <Card.Title
                    title="Ngô Trọng Tuyên"
                    subtitle="0345081945"
                    left={(props) => <Avatar.Image {...props} source={{ uri: 'http://images.summitmedia-digital.com/cosmo/images/2018/11/27/blackpink-lisa-1543288094.jpg' }} />} />
                <Card.Content>
                    <Text category="h6">Thời gian hẹn: 14:00</Text>
                    <Text category="h6">Thời gian bắt đầu: 14:05</Text>
                    <Text category="h6">Thời gian làm: 00:00</Text>
                </Card.Content>

                <Card.Actions>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button status='success'>Bắt Đầu</Button>
                        <Button status='danger'>Hủy Bỏ</Button>
                    </View>
                </Card.Actions>
            </Card>
        );
    }
}