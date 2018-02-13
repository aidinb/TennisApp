import React, {Component} from 'react';
import {
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import UI from '../assets/UI';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'

let {height, width} = Dimensions.get('window');

export default class CTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {

            stopwatchStart: false,
            totalDuration: 90000,

            stopwatchReset: false,
        };
    }
    toggleStopwatch=()=> {
        this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
    }

    resetStopwatch=()=> {
        this.setState({stopwatchStart: false, stopwatchReset: true});
    }

    getFormattedTime=(time)=> {
        this.currentTime = time;
    };

    render() {
        return (
            <View style={{
                flexDirection: 'row',
                width: width,
                alignItems: 'center',

            }}>
                <View>
                    <Stopwatch start={this.props.stopwatchStart}
                               reset={this.state.stopwatchReset}
                               options={options}
                               getTime={this.getFormattedTime} />
                </View>
            </View>

        );
    }


}
const handleTimerComplete = () => alert("custom completion function");

const options = {
    container: {
        backgroundColor: 'transparent',
        padding: 5,
        borderRadius: 5,
    },
    text: {
        fontFamily: UI.FONT.regular,
        color: UI.COLORS_HEX.white,
        fontSize: 15,
    }
};
