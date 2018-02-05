import React, {Component} from 'react';
import {
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform
} from 'react-native';
import UI from '../assets/UI';
let {height, width} = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class KiesCat extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <ScrollView contentContainerStyle={{alignItems: 'center',}} style={{
                width: Platform.OS === 'ios'?width-30:width,
                padding: 10,

            }}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.onSelectKies('Baan 1')}
                                  style={{width: width, padding: 15, flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>

                    <Text
                        style={{
                            fontFamily: UI.FONT.regular,
                            color: UI.COLORS_HEX.white,
                            fontSize: 17,
                            marginTop: -3,
                            flex: 1
                        }}>Baan 1</Text>
                    <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>

                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.onSelectKies('Baan 2')}
                                  style={{width: width, padding: 15, flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>

                    <Text
                        style={{
                            fontFamily: UI.FONT.regular,
                            color: UI.COLORS_HEX.white,
                            fontSize: 17,
                            marginTop: -3,
                            flex: 1
                        }}>Baan 2</Text>
                    <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>

                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.onSelectKies('Baan 3')}
                                  style={{width: width, padding: 15, flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>

                    <Text
                        style={{
                            fontFamily: UI.FONT.regular,
                            color: UI.COLORS_HEX.white,
                            fontSize: 17,
                            marginTop: -3,
                            flex: 1
                        }}>Baan 3</Text>
                    <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>

                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.onSelectKies('Baan 4')}
                                  style={{width: width, padding: 15, flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>

                    <Text
                        style={{
                            fontFamily: UI.FONT.regular,
                            color: UI.COLORS_HEX.white,
                            fontSize: 17,
                            marginTop: -3,
                            flex: 1
                        }}>Baan 4</Text>
                    <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>

                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.onSelectKies('Baan 5')}
                                  style={{width: width, padding: 15, flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>

                    <Text
                        style={{
                            fontFamily: UI.FONT.regular,
                            color: UI.COLORS_HEX.white,
                            fontSize: 17,
                            marginTop: -3,
                            flex: 1
                        }}>Baan 5</Text>
                    <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>

                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.onSelectKies('Baan 6')}
                                  style={{width: width, padding: 15, flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>

                    <Text
                        style={{
                            fontFamily: UI.FONT.regular,
                            color: UI.COLORS_HEX.white,
                            fontSize: 17,
                            marginTop: -3,
                            flex: 1
                        }}>Baan 6</Text>
                    <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>

                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.onSelectKies('Baan 7')}
                                  style={{width: width, padding: 15, flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>

                    <Text
                        style={{
                            fontFamily: UI.FONT.regular,
                            color: UI.COLORS_HEX.white,
                            fontSize: 17,
                            marginTop: -3,
                            flex: 1
                        }}>Baan 7</Text>
                    <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>

                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.onSelectKies('Baan 8')}
                                  style={{width: width, padding: 15, flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>

                    <Text
                        style={{
                            fontFamily: UI.FONT.regular,
                            color: UI.COLORS_HEX.white,
                            fontSize: 17,
                            marginTop: -3,
                            flex: 1
                        }}>Baan 8</Text>
                    <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>

                </TouchableOpacity>
            </ScrollView>

        );
    }


}
