import React from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Linking,
    FlatList,
    Platform,
    Image,
    TextInput,
    Switch,
    Picker
} from 'react-native';
import {inject, observer} from 'mobx-react/native';

let {height, width} = Dimensions.get('window');
import UI from '../assets/UI';
import CButton from '../components/CButton';
import CTextInput from '../components/CTextInput';
import CCheckbox from '../components/CCheckbox'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PersonRow from "../components/PersonRow";
import Box from "../components/Box";

@inject("store") @observer
export default class MatchResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            score11: 6,
            score12: 3,
            score13: 6,
            score21: 4,
            score22: 6,
            score23: 2,
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }

    onNavigatorEvent(event) {
        const {store, navigator} = this.props;
        switch (event.id) {
            case 'willAppear':
                break;
            case 'didAppear':

                break;
            case 'willDisappear':
                break;
            case 'didDisappear':
                break;
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    render() {
        const {navigator, store} = this.props;
        return (
            <View style={{flex: 1}}>
                <Image source={require('../assets/images/436417.png')}
                       style={{
                           position: 'absolute',
                           top: 0,
                           bottom: 0,
                           left: 0,
                           right: 0
                       }}/>

                <View style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)'
                }}/>

                <Navbar title={'Wedstrijd baan 8'} rightBtnColor={UI.COLORS_HEX.orange} rightBtnTitle={'Bewerk'}
                        onPressRightBtn={() => alert('Start')} leftBtnTitle={'Terug'}
                        onPressLeftBtn={() => navigator.pop({
                            animated: true,
                            animationType: 'fade',
                        })}/>


                <ScrollView contentContainerStyle={{paddingBottom: 70}}>
                    <View
                        style={{width: width, padding: 15, alignItems: 'center', marginTop: 5}}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            this.setState({
                                score11: 40,
                                score12: 6,
                                score13: 3,
                                score14: 5,
                                score21: 15,
                                score22: 4,
                                score23: 6,
                                score24: 2,
                            })
                        }}>
                            <View style={{
                                width: width - 30,
                                flexDirection: 'row',
                                height: 35,
                            }}>
                                <View style={{
                                    paddingLeft: 10,
                                    justifyContent: 'center',
                                    backgroundColor: UI.COLORS_HEX.gray,
                                    borderRadius: 3,
                                    flex: 0.7,
                                    paddingRight: 10,


                                }}>
                                    <Text
                                        style={{
                                            fontFamily: UI.FONT.regular,
                                            color: UI.COLORS_HEX.white,
                                            fontSize: 20,
                                            marginTop: -2
                                        }}>A. Kleijsen</Text>
                                </View>
                                <View style={{
                                    paddingLeft: 10,
                                    borderRadius: 5,
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    flex: 0.5

                                }}>
                                    <View style={{
                                        width: (width - 40) / 8 - 4,
                                        backgroundColor: UI.COLORS_HEX.gray,
                                        borderRadius: 3,
                                        justifyContent: 'center',
                                        alignItems: 'center'


                                    }}>
                                        {/*<TextInput style={{*/}
                                        {/*flex: 1, justifyContent: 'center',*/}
                                        {/*alignItems: 'center',*/}
                                        {/*fontSize:22,*/}
                                        {/*fontFamily: UI.FONT.bold,*/}
                                        {/*color:UI.COLORS_HEX.white,*/}


                                        {/*}}*/}
                                        {/*underlineColorAndroid='rgba(0,0,0,0)'*/}
                                        {/*autoCapitalize={'none'}*/}
                                        {/*onChangeText={(text) => this.setState({score11: text})}*/}
                                        {/*value={this.state.score11}/>*/}

                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: UI.COLORS_HEX.orange,
                                        }}>{this.state.score11}</Text>
                                    </View>
                                    <View style={{
                                        width: (width - 40) / 8 - 4,
                                        backgroundColor: UI.COLORS_HEX.gray,
                                        borderRadius: 3,
                                        justifyContent: 'center',
                                        alignItems: 'center'

                                    }}>
                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: this.state.score12 !== 0 ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white,
                                        }}>{this.state.score12}</Text>
                                    </View>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: (width - 40) / 8 - 4,
                                        backgroundColor: UI.COLORS_HEX.gray,
                                        borderRadius: 3
                                    }}>
                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: UI.COLORS_HEX.white,
                                        }}>{this.state.score13}</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={{
                                width: width - 30,
                                flexDirection: 'row',
                                height: 35,
                                marginTop: 3
                            }}>
                                <View style={{
                                    justifyContent: 'space-between',
                                    backgroundColor: UI.COLORS_HEX.gray,
                                    borderRadius: 3,
                                    flex: 0.7,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: UI.FONT.regular,
                                            color: UI.COLORS_HEX.white,
                                            fontSize: 20,
                                            marginTop: -2
                                        }}>M. Luschen</Text>
                                </View>
                                <View style={{
                                    paddingLeft: 10,
                                    borderRadius: 5,
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    flex: 0.5

                                }}>
                                    <View style={{
                                        width: (width - 40) / 8 - 4,
                                        backgroundColor: UI.COLORS_HEX.gray,
                                        borderRadius: 3,
                                        justifyContent: 'center',
                                        alignItems: 'center'


                                    }}>
                                        {/*<TextInput style={{*/}
                                        {/*flex: 1, justifyContent: 'center',*/}
                                        {/*alignItems: 'center',*/}
                                        {/*fontSize:22,*/}
                                        {/*fontFamily: UI.FONT.bold,*/}
                                        {/*color:UI.COLORS_HEX.white,*/}


                                        {/*}}*/}
                                        {/*underlineColorAndroid='rgba(0,0,0,0)'*/}
                                        {/*autoCapitalize={'none'}*/}
                                        {/*onChangeText={(text) => this.setState({score11: text})}*/}
                                        {/*value={this.state.score11}/>*/}

                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: UI.COLORS_HEX.orange,
                                        }}>{this.state.score21}</Text>
                                    </View>
                                    <View style={{
                                        width: (width - 40) / 8 - 4,
                                        backgroundColor: UI.COLORS_HEX.gray,
                                        borderRadius: 3,
                                        justifyContent: 'center',
                                        alignItems: 'center'

                                    }}>
                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: UI.COLORS_HEX.white,
                                        }}>{this.state.score22}</Text>
                                    </View>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: (width - 40) / 8 - 4,
                                        backgroundColor: UI.COLORS_HEX.gray,
                                        borderRadius: 3
                                    }}>
                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: this.state.score23 !== 0 ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white,
                                        }}>{this.state.score23}</Text>
                                    </View>

                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            width: width - 30,
                            flexDirection: 'row',
                            height: 25,
                            alignItems: 'center'
                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 15,
                                    marginTop: -3,
                                }}>Partij duur: 01u38m</Text>

                        </View>
                        <Text
                            style={{
                                fontFamily: UI.FONT.blackItalic,
                                color: UI.COLORS_HEX.white,
                                fontSize: 32,
                                marginTop: -3,
                            }}>A. Kleijsen</Text>
                        <Text
                            style={{
                                fontFamily: UI.FONT.blackItalic,
                                color: UI.COLORS_HEX.white,
                                fontSize: 32,
                                marginTop: -3,
                            }}>Gefeliciteerd!</Text>

                        <Image source={require('../assets/images/placeholder.png')}
                               style={{
                                   width: 90,
                                   height: 90,
                                   zIndex: 1
                               }}/>
                        <Image source={require('../assets/images/logo.png')}
                               style={{
                                   width: width - 40,
                                   height: 60,
                                   resizeMode: 'contain',
                                   marginTop: -20,
                                   zIndex: 0
                               }}/>
                        <View style={{marginTop: 10}}>
                            <CButton title={'Toon GameSetStat'} fontSize={16} width={width / 2}
                                     backgroundColor={UI.COLORS_HEX.blue}
                                     color={UI.COLORS_HEX.white}
                                     onPress={() => {
                                         navigator.push({
                                             screen: 'Statics',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Registreren'}
                                         })
                                     }}/>
                        </View>
                    </View>
                </ScrollView>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 40,
                    backgroundColor: UI.COLORS_HEX.lightBlack,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft:15,
                    paddingRight:15
                }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() =>navigator.push({
                        screen: 'Menu',
                        navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                        animationType: 'fade',

                    })}
                                      style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 16,
                                marginTop: -3,
                            }}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() =>navigator.push({
                        screen: 'Tourney',
                        navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                        animationType: 'fade',
                        passProps: {backTitle: 'Home'}

                    })}
                                      style={{justifyContent: 'center', alignItems: 'center'}}>

                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 16,
                                marginTop: -3,
                            }}>Toernooi</Text>

                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() =>navigator.push({
                        screen: 'Setting',
                        navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                        animationType: 'fade',
                        passProps: {backTitle: 'Home'}

                    })}
                                      style={{justifyContent: 'center', alignItems: 'center'}}>

                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 16,
                                marginTop: -3,
                            }}>Setting</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )


    }
}