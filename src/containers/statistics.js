import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Platform,
  StyleSheet,
  View,
  Text
} from 'react-native'
import Table from 'react-native-simple-table'

const columns = [
  {
    title: 'STT',
    dataIndex: 'id',
    width: 35
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    width: 160
  },
  {
    title: 'SĐT',
    dataIndex: 'phone',
    width: 130
  },
  {
    title: 'Đã Cắt',
    dataIndex: 'totalWork',
    width: 35
  },
  {
    title: 'Đã Hủy',
    dataIndex: 'totalCancel',
    width: 35
  },
];

class Statistics extends Component {
  render() {
    const { customers } = this.props.landingScreenMockData;
    console.log('eee');
    return (
      <View style={styles.container}>
        <Text style={styles.title}>react-native-simple-table</Text>
        <Table height={640} columnWidth={120} columns={columns} dataSource={customers} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 20
      },
      android: {}
    }),
  },
  title: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center'
  }
});

const mapStateToProps = (state) => {
  const { landingScreenMockData } = state;
  return { landingScreenMockData }
}

const connectedStatistics = connect(mapStateToProps)(Statistics);

export default connectedStatistics;