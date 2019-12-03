import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-kitten';

let today = new Date();

export default class MTime extends React.Component {

    constructor() {
        super();

        this.state = {
            currentTime: today.toLocaleTimeString(),
            currentDay: today.toLocaleDateString()
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            today = new Date();
            this.setState({
                currentTime: today.toLocaleTimeString(),
                currentDay: today.toLocaleDateString()
            });
        }, 1000);
    }

    render() {
        return (
            <View style={styles.contentContainer} >
                <Text category='h1'>{today.toLocaleDateString()}</Text>
                <Text category='h2'>{today.toLocaleTimeString()}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});