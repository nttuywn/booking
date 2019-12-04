import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Autocomplete, withKeyboardAwareScrollView } from "react-native-dropdown-autocomplete";
import { Layout, Text, Input } from 'react-native-ui-kitten';
import { Avatar, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CustomerFactory } from '../helper/mock-data';

class AddWork extends React.Component {

    state = {
        date: new Date('2020-06-12T14:42:42'),
        mode: 'date',
        show: false,
        query: null
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

    render() {
        const { scrollToInput, onDropdownClose, onDropdownShow } = this.props;
        const { customers } = this.props.landingScreenMockData;
        return (
            <Layout style={styles.container}>
                <Layout style={styles.layout} level='1'>
                    <Autocomplete
                        // key={shortid.generate()}
                        // scrollToInput={ev => scrollToInput(ev)}
                        // onDropdownClose={() => onDropdownClose()}
                        // onDropdownShow={() => onDropdownShow()}
                        placeholder="Tìm Kiếm"
                        inputContainerStyle={{ width: '100%' }}
                        inputStyle={{ width: '100%' }}
                        data={customers}
                        minimumCharactersCount={2}
                        highlightText
                        valueExtractor={item => `${item.name} (${item.phone})`}
                        rightContent
                        rightTextExtractor={item => item.properties}
                    />
                </Layout>

                <Layout style={styles.layout} level='1'>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Avatar.Image
                            size={120}
                            source={{ uri: 'http://images.summitmedia-digital.com/cosmo/images/2018/11/27/blackpink-lisa-1543288094.jpg' }}
                        />
                    </View>
                    <Input
                        value={'Hoàng Văn A'}
                        style={styles.input}
                        textStyle={styles.inputText}
                        labelStyle={styles.inputLabel}
                        onChangeText={() => console.log('e')}
                        label='Tên:'

                    />
                    <Input
                        value={'0345678888'}
                        style={styles.input}
                        textStyle={styles.inputText}
                        labelStyle={styles.inputLabel}
                        onChangeText={() => console.log('e')}
                        label='Số Điện Thoại:'
                    />
                    <View style={{ width: '100%' }} onTouchStart={this.timepicker}>
                        <Input
                            style={styles.input}
                            textStyle={styles.inputText}
                            labelStyle={styles.inputLabel}
                            onTouchStart={this.datepicker}
                            label='Ngày tháng:'
                            disabled={true}
                        />
                    </View>
                    <View style={{ width: '100%' }} onTouchStart={this.timepicker}>
                        <Input
                            style={styles.input}
                            textStyle={styles.inputText}
                            labelStyle={styles.inputLabel}
                            onTouchStart={this.timepicker}
                            label='Thời gian:'
                            disabled={true}
                        />
                    </View>
                    <Button mode="contained" onPress={() => console.log('Pressed')}>
                        Thêm
                </Button>
                    {this.state.show && <DateTimePicker value={this.state.date}
                        mode={this.state.mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.setDate} />
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
        },
        dispatch
    );

const connectedAddWork = connect(mapStateToProps, mapStateToDispatch)(AddWork);

export default connectedAddWork;