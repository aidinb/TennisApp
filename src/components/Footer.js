import React, {Component} from 'react';
import {
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import UI from '../assets/UI';
let {height, width} = Dimensions.get('window');

export default class Footer extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 40,
                backgroundColor: UI.COLORS_HEX.lightBlack,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={require('../assets/images/logo.png')}
                       style={{
                           width: width - 120,
                           height: 60,
                           resizeMode: 'contain'
                       }}/>
            </View>

        );
    }


}
