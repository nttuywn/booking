import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from '../styles/style';

export default class Home extends React.Component {
    
    constructor() {
        super()
        this.state = {
            entries: [
                { title: 'hello' },
                { title: 'world' },
            ]
        }
    }
    _renderItem({ item, index }) {
        return (
            <View>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        );
    }

    render() {
        return (
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.entries}
                renderItem={this._renderItem}
                sliderWidth={150}
                itemWidth={100}
            />
        );
    }
}