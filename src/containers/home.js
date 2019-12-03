import React from 'react';

import { View } from 'react-native';

import MCarousel from '../components/MCarousel';
import MTime from '../components/MTime';

const Home = () => (
    <View>
        <MTime />
        <MCarousel />
    </View>
);
export default Home;