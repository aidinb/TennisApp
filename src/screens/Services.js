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
export default class Services extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameScore: {player1: 0, player2: 0, games: [{p1: 0, p2: 0}, {p1: 0, p2: 0}, {p1: 0, p2: 0}]},
            service2Disable: true,
            service1Disable: false,
            service1: {ace: true, winner: true, fout: true, inSpel: true},
            service2: {ace: false, winner: false, fout: false, inSpel: false},

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
        const {navigator, store} = this.props;


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

                <Navbar title={'Wedstrijd ' + store.Baan} rightBtnColor={UI.COLORS_HEX.orange} rightBtnTitle={'Bewerk'}
                        onPressRightBtn={() => alert('Start')} leftBtnTitle={'Undo'}
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
                                    justifyContent: 'space-between',
                                    backgroundColor: UI.COLORS_HEX.gray,
                                    borderRadius: 3,
                                    flex: 0.5,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    width: (width - 30) / 2
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: UI.FONT.regular,
                                            color: UI.COLORS_HEX.white,
                                            fontSize: 20,
                                            marginTop: -2
                                        }}>A. Kleijsen</Text>
                                    {store.Service === 'A. Kleijsen' &&
                                    <Image source={require('../assets/images/ball.png')}
                                           style={{
                                               width: 20,
                                               height: 20,
                                               resizeMode: 'contain',
                                           }}/>}
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

                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: UI.COLORS_HEX.orange,
                                        }}>{this.state.score11 > 40 ? '40' : this.state.score11}</Text>
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
                                            color: this.state.gameScore.games[1].p1 === 6 ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white,
                                        }}>{this.state.gameScore.games[1].p1}</Text>
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
                                        }}>{this.state.score14}</Text>
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
                                    flex: 0.5,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    width: (width - 30) / 2
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: UI.FONT.regular,
                                            color: UI.COLORS_HEX.white,
                                            fontSize: 20,
                                            marginTop: -2
                                        }}>M. Luschen</Text>
                                    {store.Service === 'M. Luschen' &&
                                    <Image source={require('../assets/images/ball.png')}
                                           style={{
                                               width: 20,
                                               height: 20,
                                               resizeMode: 'contain',
                                           }}/>}
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

                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: UI.COLORS_HEX.orange,
                                        }}>{this.state.score21 > 40 ? '40' : this.state.score21}</Text>
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
                                        }}>{this.state.score24}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            width: width - 30,
                            flexDirection: 'row',
                            height: 35,
                            alignItems: 'center'
                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 15,
                                    marginTop: -3,
                                }}>Partij duur: 00u00m</Text>

                        </View>
                        <View style={{
                            width: width - 25,
                            backgroundColor: UI.COLORS_HEX.gray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            borderRadius: 5,
                            marginTop: 15
                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 18,
                                    marginTop: -3,
                                }}>1<View style={{width: 10, height: 20}}><Text style={{
                                fontSize: 14, fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                            }}>e</Text></View> Service</Text>
                            {this.state.service1Disable === true && <View style={{
                                backgroundColor: UI.COLORS_HEX.whiteBoxBlur,
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                borderRadius: 5,

                            }}/>}

                        </View>


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            width: width - 20,

                        }}>
                            <Box title={'Ace'} colors={['#00914C', '#00A550', '#64C08A']}
                                 onPress={() => {
                                     this.setState({
                                         service1: {inSpel: false, winner: false, fout: false, ace: true},
                                         service2: {inSpel: true, winner: true, fout: true, ace: true},
                                         service2Disable: false,
                                         service1Disable: true,
                                     })
                                 }}
                                 width={(width-20)/4-10} topShadowWidth={(width-20)/4-21} topShadowHeight={32}
                                 service1Disable={this.state.service1Disable}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.service1.ace}/>
                            <Box title={'Winner serve'} colors={['#666666', '#808080', '#999999']}
                                 onPress={() => this.setState({
                                     service1: {inSpel: false, ace: false, fout: false, winner: true},
                                     service2: {inSpel: true, winner: true, fout: true, ace: true},
                                     service2Disable: false,
                                     service1Disable: true,

                                 })}
                                 width={(width-20)/4-10} topShadowWidth={(width-20)/4-21} topShadowHeight={32}
                                 service1Disable={this.state.service1Disable}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.service1.winner}/>
                            <Box title={'Fout'} colors={['#CD118C', '#EB008B', '#F074AC']}
                                 onPress={() => this.setState({
                                     service1: {inSpel: false, ace: false, winner: false, fout: true},
                                     service2: {inSpel: true, winner: true, fout: true, ace: true},
                                     service2Disable: false,
                                     service1Disable: true,

                                 })}
                                 width={(width-20)/4-10} topShadowWidth={(width-20)/4-21} topShadowHeight={32}
                                 service1Disable={this.state.service1Disable}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.service1.fout}/>
                            <Box title={'In spel'} colors={['#0095DA', '#00AEEE', '#2BC4F3']}
                                 onPress={() => this.setState({
                                     service1: {inSpel: true, ace: false, winner: false, fout: false},
                                     service2: {inSpel: true, winner: true, fout: true, ace: true},
                                     service2Disable: false,
                                     service1Disable: true,

                                 })}
                                 width={(width-20)/4-10} topShadowWidth={(width-20)/4-21} topShadowHeight={32}
                                 service1Disable={this.state.service1Disable}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.service1.inSpel}/>
                        </View>

                        <View style={{
                            width: width - 25,
                            backgroundColor: UI.COLORS_HEX.gray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            borderRadius: 5,
                            marginTop: 30
                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 18,
                                    marginTop: -3,
                                }}>2<View style={{width: 10, height: 20}}><Text style={{
                                fontSize: 14, fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                            }}>e</Text></View> Service</Text>
                            {this.state.service2Disable === true && <View style={{
                                backgroundColor: UI.COLORS_HEX.whiteBoxBlur,
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                borderRadius: 5,

                            }}/>}
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            width: width - 20,

                        }}>

                            <Box title={'Ace'} colors={['#00914C', '#00A550', '#64C08A']}
                                 onPress={() => {
                                     navigator.push({
                                         screen: 'Winner',
                                         navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                         animationType: 'fade',
                                         passProps: {backTitle: 'Undo'}
                                     })
                                 }}
                                 width={(width-20)/4-10} topShadowWidth={(width-20)/4-21} topShadowHeight={32}
                                 service2Disable={this.state.service2Disable}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.service2.ace}/>
                            <Box title={'Winner serve'} colors={['#666666', '#808080', '#999999']}
                                 onPress={() => navigator.push({
                                     screen: 'Winner',
                                     navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                     animationType: 'fade',
                                     passProps: {backTitle: 'Undo'}
                                 })}
                                 width={(width-20)/4-10} topShadowWidth={(width-20)/4-21} topShadowHeight={32}
                                 service2Disable={this.state.service2Disable}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.service2.winner}/>
                            <Box title={'Fout'} colors={['#CD118C', '#EB008B', '#F074AC']}
                                 onPress={() => navigator.push({
                                     screen: 'Winner',
                                     navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                     animationType: 'fade',
                                     passProps: {backTitle: 'Undo'}
                                 })}
                                 width={(width-20)/4-10} topShadowWidth={(width-20)/4-21} topShadowHeight={32}
                                 service2Disable={this.state.service2Disable}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.service2.fout}/>
                            <Box title={'In spel'} colors={['#0095DA', '#00AEEE', '#2BC4F3']}
                                 onPress={() => navigator.push({
                                     screen: 'Winner',
                                     navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                     animationType: 'fade',
                                     passProps: {backTitle: 'Undo'}
                                 })}
                                 width={(width-20)/4-10} topShadowWidth={(width-20)/4-21} topShadowHeight={32}
                                 service2Disable={this.state.service2Disable}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.service2.inSpel}/>
                        </View>
                    </View>
                </ScrollView>
                <Footer/>

            </View>
        )


    }
}