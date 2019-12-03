import React from 'react';
import { Dimensions } from 'react-native';

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import MCard from './MCard';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class MCarousel extends React.Component {

    constructor() {
        super()
        this.state = {
            entries: [
                { title: 'hello' },
                { title: 'world' },
                { title: 'world' },
                { title: 'world' },
            ]
        }
    }
    _renderItem = ({ item, index }) => <MCard/>

    render() {
        return (
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.entries}
                renderItem={this._renderItem}
                sliderWidth={screenWidth}
                sliderHeight={screenHeight/3*2}
                itemWidth={screenWidth/3*2}
                itemHeight={screenHeight/3}
            />
        );
    }
}