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

export default class BackImage extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
                <Image source={require('../assets/images/BackImage.png')}
                       style={[UI.absoluteView,{resizeMode: 'cover',width:width,height:height}]}/>

        );
    }


}
