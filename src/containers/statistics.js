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
  PermissionsAndroid,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import MVideo from '../native-module/MVideo'

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

async function getUserPer() {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    {
      title: 'Cool Photo App RECEIVE_SMS Permission',
      message:
        'Cool Photo App needs access to your RECEIVE_SMS ' +
        'so you can take awesome pictures.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
}

class Statistics extends Component {

  componentWillMount() {
    // getUserPer()
  
  }

  render() {
    const { customers } = this.props.landingScreenMockData;
    return (
      <View style={styles.container}>
        <MVideo style={styles.myComponentStyle}/>
        {/* <View style={styles.view}>
          <TouchableOpacity style={styles.button} onPress={() => MVideo.open()}>
            <MVideo />
            <Text style={styles.instructions}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => Heartbeat.stopService()}>
            <Text style={styles.instructions}>Stop</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myComponentStyle: {
    width: Math.round(Dimensions.get('window').width),
    height: Math.round(Dimensions.get('window').height) / 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#FFFFFF"
  },
});

const mapStateToProps = (state) => {
  const { landingScreenMockData, App } = state;
  return { landingScreenMockData, App }
}

const connectedStatistics = connect(mapStateToProps)(Statistics);

export default connectedStatistics;