import React, {Component} from 'react';
import {
    View,
    Dimensions,
    Image
} from 'react-native';
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
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {this.props.image?<Image source={{uri: this.props.image}}
                       style={{
                           width: width,
                           height: width/10,
                           resizeMode: 'contain'
                       }}/>:<View/>}

            </View>

        );
    }


}
