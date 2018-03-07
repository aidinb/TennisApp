import React, {Component} from 'react';
import {
    View,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native';
import UI from '../assets/UI';
import Ionicons from 'react-native-vector-icons/Ionicons';

let {height, width} = Dimensions.get('window');

export default class CButton extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (

            <TouchableOpacity activeOpacity={0.9} style={{
                width: 20,
                height: 20,
                backgroundColor: UI.COLORS_HEX.white,
                justifyContent: 'center',
                alignItems: 'center'
            }} onPress={this.props.onPress}>
                {this.props.checked ===true&&
                    <Ionicons name="ios-checkmark" size={28} color={UI.COLORS_HEX.black}/>
                }
            </TouchableOpacity>

        );
    }


}
