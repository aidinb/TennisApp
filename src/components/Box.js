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
                width: this.props.width?this.props.width:width/3-30,
                height: this.props.width?this.props.width:width/3-30,
                backgroundColor: 'transparent',
                marginTop: 10,
                borderRadius: 10,
                borderColor: UI.COLORS_HEX.black,
                borderWidth: 1,
                justifyContent:'center',
                alignItems:'center'

            }}>

                <LinearGradient
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 1}}
                    locations={[0, 0.5, 1.0]}
                    colors={this.props.colors}
                    style={{
                        width: this.props.width?this.props.width-2:width/3-32,
                        borderRadius: 10, height: this.props.width?this.props.width-2:width/3-32,
                        shadowColor: 'black',
                        shadowOffset: {width: 0, height: 0},
                        shadowOpacity: 0.7,
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                    <Image source={require('../assets/images/TopShadow_1.png')}
                           style={{
                               width: this.props.topShadowWidth?this.props.topShadowWidth:width/3-41,
                               height: this.props.topShadowHeight?this.props.topShadowHeight:40,
                               resizeMode: 'cover',
                               position:'absolute',
                               top:5,
                               left:5,
                               right:5
                           }}/>
                    <Text
                        style={{
                            fontFamily: UI.FONT.bold,
                            color: UI.COLORS_HEX.white,
                            fontSize: 15,
                            width:this.props.width?this.props.width-15:93,
                            textAlign:'center',
                        }}>{this.props.title}</Text>

                </LinearGradient>

                <Image source={require('../assets/images/BottomShadow.png')}
                       style={{
                           width: 70,
                           height: 30,
                           resizeMode: 'contain',
                           position:'absolute',
                           bottom:2,
                           right:4
                       }}/>
                {this.props.selected===false&&<View style={{
                    backgroundColor: UI.COLORS_HEX.whiteBoxBlur,
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderRadius: 5,

                }}/>}
            </TouchableOpacity>

        );
    }


}
