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
import LinearGradient from 'react-native-linear-gradient';

export default class Box extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress} style={{
                width: 95,
                height: 95,
                backgroundColor: 'transparent',
                marginTop: 10,
                borderRadius: 10,
                borderColor: UI.COLORS_HEX.black,
                borderWidth: 1,

            }}>
                <LinearGradient
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 1}}
                    locations={[0, 0.5, 1.0]}
                    colors={this.props.colors}
                    style={{
                        width: 93,
                        borderRadius: 10, height: 93,
                        shadowColor: 'black',
                        shadowOffset: {width: 0, height: 0},
                        shadowOpacity: 0.7,
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                    <Text
                        style={{
                            fontFamily: UI.FONT.regular,
                            color: UI.COLORS_HEX.white,
                            fontSize: 20,
                        }}>{this.props.title}</Text>

                </LinearGradient>
                <Image source={require('../assets/images/TopShadow_1.png')}
                       style={{
                           width: 84,
                           height: 40,
                           resizeMode: 'cover',
                           position:'absolute',
                           top:5,
                           left:5,
                           right:5
                       }}/>
                <Image source={require('../assets/images/BottomShadow.png')}
                       style={{
                           width: 70,
                           height: 30,
                           resizeMode: 'contain',
                           position:'absolute',
                           bottom:2,
                           right:4
                       }}/>
            </TouchableOpacity>

        );
    }


}
