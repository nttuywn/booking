import React from 'react';

import { Text } from 'react-native-ui-kitten';

export default class MCountingTime extends React.Component {

    constructor() {
        super();

        this.state = {
            startHour: 0,
            startMinute: 0
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            if (this.state.startMinute == 59) {
                this.setState({
                    startMinute: 0,
                    startHour: this.state.startHour + 1
                });
            } else {
                this.setState({
                    startMinute: this.state.startMinute + 1
                });
            }
        }, 1000);
    }

    render() {
        return (
            <Text category="h6">Thời gian cắt: {this.state.startHour}:{this.state.startMinute}</Text>
        );
    }
}