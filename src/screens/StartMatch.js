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
import {Stopwatch} from 'react-native-stopwatch-timer'

import UI from '../assets/UI';
import CButton from '../components/CButton';
import CTextInput from '../components/CTextInput';
import CCheckbox from '../components/CCheckbox'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PersonRow from "../components/PersonRow";
import Box from "../components/Box";

let {height, width} = Dimensions.get('window');
const endTime = '';

@inject("store") @observer
export default class StartMatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameScore: {player1: 0, player2: 0, games: [{p1: 0, p2: 0}, {p1: 0, p2: 0}, {p1: 0, p2: 0}]},
            score11: 0,
            score12: 0,
            score13: 0,
            score14: 0,
            score21: 0,
            score22: 0,
            score23: 0,
            score24: 0,
            timerstart: true,


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

    getFormatedTime = (t) => {
        this.endTime=t;
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

                <Navbar title={'Wedstrijd ' + store.Court} rightBtnColor={UI.COLORS_HEX.orange}
                        leftBtnTitle={this.state.score11 === 0 ? 'Instellingen' : 'Corrigeer'}
                        onPressLeftBtn={() => {
                            if (this.state.score11 <= 0) {
                                navigator.push({
                                    screen: 'SetUpWedstrijd',
                                    navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                    animationType: 'fade',
                                    passProps: {backTitle: 'kies partij'}
                                })
                            } else {
                                if (this.state.score11 == 46) {

                                    this.setState({
                                        score11: 45,
                                        score12: 0,
                                        score13: 0,
                                        score14: 0,
                                        score21: 0,
                                        score22: 0,
                                        score23: 0,
                                        score24: 0,
                                    });

                                } else {
                                    this.setState({score11: this.state.score11 - 15})
                                }
                            }

                        }}/>
                <PersonRow title={store.TournamentByNumber.name}/>


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
                                        }}>{store.Match.player1}</Text>
                                    {store.Service === store.Match.player1 &&
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
                                        }}>{store.Match.player2}</Text>
                                    {store.Service === store.Match.player2 &&
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
                            alignItems: 'center',
                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 15,
                                    marginTop: -3,
                                }}>Partij duur: </Text>
                            <Stopwatch start={this.state.timerstart}
                                       options={options}
                                       getTime={this.getFormatedTime}/>
                        </View>
                        <View style={{
                            width: width - 70,
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
                                }}>Punt gewonnen door</Text>
                        </View>

                        <View style={{
                            width: width - 70,
                            backgroundColor: UI.COLORS_HEX.gray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            borderRadius: 5,
                            marginTop: 10,
                            flexDirection: 'row',
                            paddingTop: 0,
                            paddingBottom: 0
                        }}>
                            <View style={{
                                width: (width - 70) / 2,
                                borderColor: UI.COLORS_HEX.blue,
                                borderRightWidth: 1,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height: 30,
                                flexDirection: 'row',
                                paddingRight: 10,
                                paddingLeft: 10
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: UI.COLORS_HEX.white,
                                        fontSize: 17,
                                        marginTop: -3,
                                    }}>{store.Match.player1}</Text>
                                {store.Service === 'A. Kleijsen' && <Image source={require('../assets/images/ball.png')}
                                                                           style={{
                                                                               width: 18,
                                                                               height: 18,
                                                                               resizeMode: 'contain',
                                                                           }}/>}
                            </View>
                            <View style={{
                                width: (width - 70) / 2, justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingRight: 10,
                                paddingLeft: 10
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: UI.COLORS_HEX.white,
                                        fontSize: 17,
                                        marginTop: -3,
                                    }}>{store.Match.player2}</Text>
                                {store.Service === 'M. Luschen' && <Image source={require('../assets/images/ball.png')}
                                                                          style={{
                                                                              width: 18,
                                                                              height: 18,
                                                                              resizeMode: 'contain',
                                                                          }}/>}
                            </View>


                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            width: width - 90,

                        }}>
                            <Box title={'Punt'} colors={['#00914C', '#00A550', '#64C08A']}
                                 onPress={() => {
                                     if (this.state.score21 === 15) {
                                         store.setEndTimeMatch(this.endTime)
                                         navigator.push({
                                             screen: 'MatchResult',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Terug'}
                                         })
                                     }
                                     if (this.state.score11 > 40) {
                                         this.setState({
                                             score11: 46,
                                             score12: 6,
                                             score13: 3,
                                             score14: 5,
                                             score21: 15,
                                             score22: 4,
                                             score23: 6,
                                             score24: 2,
                                         });
                                     } else {
                                         this.setState({score11: this.state.score11 + 15})

                                     }

                                 }}
                                 selected={true}/>
                            <Box title={'Punt'} colors={['#0095DA', '#00AEEE', '#2BC4F3']}
                                 onPress={() => this.setState({score21:this.state.score21 + 15,timerstart: false})}
                                 selected={true}/>
                        </View>
                    </View>
                </ScrollView>
                <Footer/>

            </View>
        )


    }
}

const options = {
    container: {
        backgroundColor: 'transparent',
        padding: 5,
        borderRadius: 5,
    },
    text: {
        fontFamily: UI.FONT.regular,
        color: UI.COLORS_HEX.white,
        fontSize: 15,
    }
};