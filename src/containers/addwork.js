import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Autocomplete, withKeyboardAwareScrollView } from "react-native-dropdown-autocomplete";
import { Layout, Text, Input } from 'react-native-ui-kitten';
import { Avatar, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import { addworkPostDataRequest, addworkPostDataResponse } from '../redux/rootAction';
import { TIME_FORMAT, DATE_FORMAT } from '../config/datetime-format';

class AddWork extends React.Component {

    state = {
        hour: '00',
        minute: '00',
        date: '',
        mode: 'date',
        show: false,
        query: null,
        name: null,
        phone: null,
    }

    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }

    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }

    datepicker = () => {
        this.show('date');
    }

    timepicker = () => {
        this.show('time');
    }

    postAddWorkData = () => {
        let form = new FormData();
        this.props.addworkPostDataRequest({
            name: this.state.name,
            phone: this.state.phone,
            date: this.state.date,
            hour: this.state.hour,
            minute: this.state.minute,
            status: false
        });
    }

    render() {
        const { scrollToInput, onDropdownClose, onDropdownShow } = this.props;
        const { customers = [] } = this.props.landingScreenMockData;
        return (
            <Layout style={styles.container}>
                <Layout style={styles.layout} level='1'>
                    <Autocomplete
                        // key={shortid.generate()}
                        // scrollToInput={ev => scrollToInput(ev)}
                        // onDropdownClose={() => onDropdownClose()}
                        // onDropdownShow={() => onDropdownShow()}
                        handleSelectItem={(item) =>
                            this.setState({
                                ...this.state,
                                name: item.name,
                                phone: item.phone
                            })
                        }
                        placeholder="Tìm Kiếm"
                        inputContainerStyle={{ width: '100%' }}
                        inputStyle={{ width: '100%' }}
                        data={customers}
                        minimumCharactersCount={1}
                        highlightText
                        valueExtractor={item => `${item.name} (${item.phone})`}
                        rightContent
                        rightTextExtractor={item => item.properties}
                    />
                </Layout>

                <Layout style={styles.layout} level='1'>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar.Image
                            size={120}
                            source={{ uri: 'http://images.summitmedia-digital.com/cosmo/images/2018/11/27/blackpink-lisa-1543288094.jpg' }}
                        />
                    </View>
                    <Input
                        value={this.state.name ? this.state.name : ''}
                        style={styles.input}
                        textStyle={styles.inputText}
                        labelStyle={styles.inputLabel}
                        onChangeText={() => console.log('e')}
                        label='Tên:'

                    />
                    <Input
                        value={this.state.phone ? `${this.state.phone}` : ''}
                        style={styles.input}
                        textStyle={styles.inputText}
                        labelStyle={styles.inputLabel}
                        onChangeText={() => console.log('e')}
                        label='Số Điện Thoại:'
                    />
                    <View style={{ width: '100%' }} onTouchStart={this.datepicker}>
                        <Input
                            value={this.state.date}
                            style={styles.input}
                            textStyle={styles.inputText}
                            labelStyle={styles.inputLabel}
                            label='Ngày tháng:'
                            disabled={true}
                        />
                    </View>
                    <View style={{ width: '100%' }} onTouchStart={this.timepicker}>
                        <Input
                            value={`${this.state.hour}:${this.state.minute}`}
                            style={styles.input}
                            textStyle={styles.inputText}
                            labelStyle={styles.inputLabel}
                            label='Thời gian:'
                            disabled={true}
                        />
                    </View>
                    <Button mode="contained" onPress={() => this.postAddWorkData()}>
                        Thêm
                </Button>
                    {this.state.show &&
                        <DateTimePicker
                            value={new Date()}
                            mode={this.state.mode}
                            display="default"
                            onChange={(event, dateTime) => this.state.mode == 'time' ?
                                this.setState({
                                    ...this.state,
                                    show: false,
                                    hour: `${moment(dateTime, TIME_FORMAT).hour()}`,
                                    minute: `${moment(dateTime, TIME_FORMAT).minute()}`
                                }) :
                                this.setState({ ...this.state, show: false, date: `${moment(dateTime).format(DATE_FORMAT)}` })
                            } />
                    }
                </Layout>
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: '5%'
    },
    input: { borderRadius: 20 },
    inputText: { color: '#3366FF' },
    inputLabel: { color: '#3366FF' },
    inputCaption: { color: '#3366FF' }
});

const mapStateToProps = (state) => {
    const { landingScreenMockData } = state;
    return { landingScreenMockData };
}

const mapStateToDispatch = (dispatch) =>
    bindActionCreators(
        {
            addworkPostDataRequest,
            addworkPostDataResponse
        },
        dispatch
    );

const connectedAddWork = connect(mapStateToProps, mapStateToDispatch)(AddWork);

export default connectedAddWork;