// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// import {
//   Platform,
//   StyleSheet,
//   View,
//   Text
// } from 'react-native'
// import Table from 'react-native-simple-table'

import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import Heartbeat from '../../Heartbeat';
import heart from '../../heart.png';

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

// class Statistics extends Component {
//   render() {
//     const { customers } = this.props.landingScreenMockData;
//     console.log('eee');
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>react-native-simple-table</Text>
//         <Table height={640} columnWidth={120} columns={columns} dataSource={customers} />
//       </View>
//     )
//   }
// }

class Statistics extends Component {
  render() {
    const { customers } = this.props.landingScreenMockData;
    const { heartBeat = false } = this.props.App
    const imageSize = heartBeat ? 150 : 100;
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <Image source={heart} style={{ width: imageSize, height: imageSize }} resizeMode="contain" />
        </View>
        <View style={styles.view}>
          <TouchableOpacity style={styles.button} onPress={() => Heartbeat.startService()}>
            <Text style={styles.instructions}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => Heartbeat.stopService()}>
            <Text style={styles.instructions}>Stop</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  view: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});

// const styles = StyleSheet.create({
//   container: {
//     ...Platform.select({
//       ios: {
//         paddingTop: 20
//       },
//       android: {}
//     }),
//   },
//   title: {
//     fontSize: 18,
//     padding: 10,
//     textAlign: 'center'
//   }
// });

const mapStateToProps = (state) => {
  const { landingScreenMockData, App } = state;
  return { landingScreenMockData, App }
}

const connectedStatistics = connect(mapStateToProps)(Statistics);

export default connectedStatistics;