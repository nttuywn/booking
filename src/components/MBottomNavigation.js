import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Home from '../containers/home';

const HomeRoute = () => <Home/>;

const CalendarRoute = () => <Text>Calendar</Text>;

const StatisticsRoute = () => <Text>Statistics</Text>;

export default class MBottomNavigation extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'home' },
      { key: 'calendar', title: 'Calendar', icon: 'calendar-month' },
      { key: 'statistics', title: 'Statistics', icon: 'poll' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: Home,
    calendar: CalendarRoute,
    statistics: StatisticsRoute,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}