import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';

import { generateMockData } from '../redux/rootAction';

import MBottomNavigation from '../components/MBottomNavigation';
import { CustomerFactory } from '../helper/mock-data';
import Database from '../config/database';

const mockData = CustomerFactory.generate().data;

class LandingScreen extends React.Component {

    componentDidMount() {;
        this.props.generateMockData(mockData);
    }

    render() {
        return (
            <MBottomNavigation />
        );
    }
}

const mapStateToProps = (state) => {
    const { } = state;
    return {};
}

const mapStateToDispatch = (dispatch) =>
    bindActionCreators(
        {
            generateMockData
        },
        dispatch
    );

const connectedLandingScreen = connect(mapStateToProps, mapStateToDispatch)(LandingScreen);

export default connectedLandingScreen;