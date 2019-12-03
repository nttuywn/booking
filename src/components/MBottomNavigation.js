import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Home from '../containers/home';
import Calendar from '../containers/calendar';
import Statistics from '../containers/statistics';

const StatisticsRoute = () => <Text>Statistics</Text>;

export default class MBottomNavigation extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'home', color: '#3F51B5' },
      { key: 'calendar', title: 'Calendar', icon: 'calendar-month', color: '#009688' },
      { key: 'statistics', title: 'Statistics', icon: 'poll', color: '#795548' },
      { key: 'setting', title: 'Setting', icon: 'cogs', color: '#FF0000' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: Home,
    calendar: Calendar,
    statistics: Statistics,
    setting: StatisticsRoute,
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