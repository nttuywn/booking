import React from 'react';

import { View } from 'react-native';

import MCarousel from '../components/MCarousel';
import MTime from '../components/MTime';
import { Button } from 'react-native-paper';
import MSMSListen from '../components/MSMSListen';

const Home = () => (
    <View>
        <MSMSListen />
        <MTime />
        <MCarousel />
    </View>
);
export default Home;