import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dimensions, NativeEventEmitter, NativeModules } from 'react-native';

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import MCard from './MCard';

import { homeGetBookingListRequest } from '../redux/rootAction';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class MCarousel extends React.Component {

    UNSAFE_componentWillMount() {
        this.props.homeGetBookingListRequest();
    }

    _renderItem = ({ item, index }) => <MCard item={item} />

    render() {
        const { listBooking = [] } = this.props.home;
        return (
            <Carousel
                vertical={true}
                firstItem={1}
                ref={(c) => { this._carousel = c; }}
                data={listBooking}
                renderItem={this._renderItem}
                sliderWidth={screenWidth}
                sliderHeight={screenHeight}
                itemWidth={screenWidth / 3 * 2}
                itemHeight={screenHeight / 3}
            />
        );
    }
}

const mapStateToProps = state => {
    const { home } = state;
    return { home };
}

const mapStateToDispatch = dispatch =>
    bindActionCreators(
        {
            homeGetBookingListRequest
        },
        dispatch
    );

const connectedMCarousel = connect(mapStateToProps, mapStateToDispatch)(MCarousel);
export default connectedMCarousel;