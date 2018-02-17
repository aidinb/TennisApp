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
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={{
                height: 120,
                backgroundColor: UI.COLORS_HEX.lightBlack,
                justifyContent: 'flex-end',
                alignItems: 'center'
            }}>
                <View>
                    <Text
                        style={{fontFamily: UI.FONT.regular, fontSize: 30, color: UI.COLORS_HEX.white}}>GameSet<Text
                        style={{
                            fontFamily: UI.FONT.blackItalic,
                            fontSize: 30,
                            color: UI.COLORS_HEX.orange
                        }}>Stats</Text></Text>
                    <Text
                        style={{
                            fontFamily: UI.FONT.italic,
                            color: UI.COLORS_HEX.white,
                            fontSize: 18,
                            marginTop: -10,
                            paddingLeft: 3
                        }}>Always
                        winning</Text>
                </View>
                <View style={{
                    width: width,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 15,
                    marginBottom: 5
                }}>
                    <Text
                        style={{
                            fontFamily: UI.FONT.regular,
                            color: UI.COLORS_HEX.white,
                            fontSize: 16,
                        }}>{this.props.title}</Text>
                    {this.props.rightBtnTitle&&<TouchableOpacity hitSlop={{top: 10, left: 5, right: 5, bottom: 10}} avtiveOpacity={0.6}
                                      onPress={this.props.onPressRightBtn}
                                      style={{

                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          position: 'absolute',
                                          top: 0,
                                          right: 10,
                                      }}>
                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.orange,
                                fontSize: 16,
                            }}>{this.props.rightBtnTitle}</Text>
                    </TouchableOpacity>}
                    {this.props.leftBtnTitle&&<TouchableOpacity hitSlop={{top: 10, left: 5, right: 5, bottom: 10}} avtiveOpacity={0.6}
                                                                 onPress={this.props.onPressLeftBtn}
                                                                 style={{
                                                                     justifyContent: 'center',
                                                                     alignItems: 'center',
                                                                     position: 'absolute',
                                                                     top: 0,
                                                                     left: 10,
                                                                     flexDirection:'row'
                                                                 }}>
                        <Ionicons name="ios-arrow-back" size={25}
                                  color={UI.COLORS_HEX.orange}/>
                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.orange,
                                fontSize: 14,
                                marginTop:-3,
                                marginLeft:3
                            }}>{this.props.leftBtnTitle}</Text>
                    </TouchableOpacity>}
                </View>

            </View>

        );
    }


}
