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
import {Stopwatch} from 'react-native-stopwatch-timer'

const endTime = '';
let puntWinner = '';
let score_type = '';
let shot = '';
let shot_type = '';
@inject("store") @observer
export default class Services extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameScore: {player1: 0, player2: 0, games: [{p1: 0, p2: 0}, {p1: 0, p2: 0}, {p1: 0, p2: 0}]},
            timerstart: true,
            second_Serve: 0,
            fault: 1,
            set: [],
            set0Point1: '',
            set0Point2: '',
            set1Point1: '',
            set1Point2: '',
        }
        ;
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }

    onNavigatorEvent(event) {
        const {store, navigator} = this.props;
        switch (event.id) {
            case 'willAppear':
                if (store.Play.score) {
                    if (store.Play.score.previousSets.length > 1) {
                        this.setState({set1Point1: store.Play.score.previousSets[1].player1});
                        this.setState({set1Point2: store.Play.score.previousSets[1].player2});
                    }
                    if (store.Play.score.previousSets.length > 0) {
                        this.setState({set0Point1: store.Play.score.previousSets[0].player1});
                        this.setState({set0Point2: store.Play.score.previousSets[0].player2});
                    }
                }
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
        this.endTime = t;
    }

    onPlayPress = (serviceType) => {
        const {navigator, store} = this.props;
        console.log('+++serviceType++')
        console.log(serviceType)
        this.setState({timerstart: true})

        if (serviceType === 'FAULT' && this.state.second_Serve === 0) {
            console.log('----11111-----')
            this.setState({fault: 2, second_Serve: 1})
        } else if (serviceType === 'FAULT' && this.state.second_Serve === 1) {
            console.log('----22222-----');
            store.addPlay({
                match_id: store.Match.id,
                player: puntWinner !== '' ? puntWinner : store.Service === 1 ? 2 : 1,
                service: serviceType,
                score_type: score_type !== '' ? score_type : '',
                shot: shot !== '' ? shot : '',
                shot_type: shot_type !== '' ? shot_type : '',
                second_serve: 1,
            }).then(() => {
                this.setState({second_Serve: 0, fault: 1});
                puntWinner = '';
                score_type = '';
                shot = '';
                shot_type = '';
                store.setService(store.Play.now_serving === 0 ? 1 : store.Play.now_serving)
                if (store.Play.score.previousSets.length > 1) {
                    this.setState({set1Point1: store.Play.score.previousSets[1].player1});
                    this.setState({set1Point2: store.Play.score.previousSets[1].player2});
                }
                if (store.Play.score.previousSets.length > 0) {
                    this.setState({set0Point1: store.Play.score.previousSets[0].player1});
                    this.setState({set0Point2: store.Play.score.previousSets[0].player2});
                }

                if (store.Play.score.currentGame.player1 === "game" || store.Play.score.currentGame.player1 === "game") {
                    store.setEndTimeMatch(this.endTime)
                    store.setWinnerPlayer(store.Play)

                    navigator.push({
                        screen: 'MatchResult',
                        navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                        animationType: 'fade',
                        passProps: {backTitle: 'Terug', play: store.Play,}
                    })
                }
            })
        } else {
            console.log('----333333-----')
            console.log(puntWinner)
            store.addPlay({
                match_id: store.Match.id,
                player: puntWinner !== '' ? puntWinner : store.Service,
                service: serviceType,
                score_type: score_type !== '' ? score_type : '',
                shot: shot !== '' ? shot : '',
                shot_type: shot_type !== '' ? shot_type : '',
                second_serve: serviceType === 'FAULT' ? 1 : '',
            }).then(() => {
                this.setState({second_Serve: 0})
                puntWinner = '';
                score_type = '';
                shot = '';
                shot_type = '';
                console.log(store.Play)
                store.setService(store.Play.now_serving === 0 ? 1 : store.Play.now_serving)
                this.setState({fault: 1})
                if (store.Play.score.previousSets.length > 1) {
                    this.setState({set1Point1: store.Play.score.previousSets[1].player1});
                    this.setState({set1Point2: store.Play.score.previousSets[1].player2});
                }
                if (store.Play.score.previousSets.length > 0) {
                    this.setState({set0Point1: store.Play.score.previousSets[0].player1});
                    this.setState({set0Point2: store.Play.score.previousSets[0].player2});
                }
                store.setEndTimeMatch(this.endTime)
                store.setWinnerPlayer(store.Play)

                if (store.Play.score.currentGame.player1 === "game" || store.Play.score.currentGame.player1 === "game") {
                    navigator.push({
                        screen: 'MatchResult',
                        navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                        animationType: 'fade',
                        passProps: {backTitle: 'Terug'}
                    })
                }

            })
        }
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

                <Navbar title={'Wedstrijd ' + store.Court.name} rightBtnColor={UI.COLORS_HEX.orange}
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
                                this.setState({score11: this.state.score11 - 15})
                            }

                        }}/>


                <ScrollView contentContainerStyle={{paddingBottom: 70}}>
                    <View
                        style={{width: width, padding: 15, alignItems: 'center', marginTop: 5}}>
                        <View>
                            <View style={{
                                width: width - 30,
                                flexDirection: 'row',
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
                                    {store.Service === 1 &&
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
                                        }}>{store.Play.score && store.Play.score.currentGame.player1 === "deuce" ? 40 : store.Play.score && store.Play.score.currentGame.player1 === "adv" ? "AD" : store.Play.score ? store.Play.score.currentGame.player1 : 0}</Text>
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
                                            color: store.Play.score && store.Play.score.currentSet.player1 >= 6 ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white,
                                        }}>{store.Play.score ? store.Play.score.currentSet.player1 : 0}</Text>
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
                                            color: this.state.set1Point1 !== '' && this.state.set1Point1 >= 6 ? UI.COLORS_HEX.orange : this.state.set0Point1 !== '' && this.state.set0Point1 >= 6 ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white,
                                        }}>{this.state.set1Point1 !== '' ? this.state.set1Point1 : this.state.set0Point1 !== '' ? this.state.set0Point1 : 0}</Text>
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
                                            color: this.state.set1Point1 !== '' && this.state.set0Point1 >= 6 ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white,
                                        }}>{this.state.set1Point1 !== '' && this.state.set0Point1 !== '' ? this.state.set0Point1 : 0}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{
                                width: width - 30,
                                flexDirection: 'row',
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
                                    {store.Service === 2 &&
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
                                        }}>{store.Play.score && store.Play.score.currentGame.player2 === "deuce" ? 40 : store.Play.score && store.Play.score.currentGame.player2 === "adv" ? "AD" : store.Play.score ? store.Play.score.currentGame.player2 : 0}</Text>
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
                                            color: store.Play.score && store.Play.score.currentSet.player2 >= 6 ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white,
                                        }}>{store.Play.score ? store.Play.score.currentSet.player2 : 0}</Text>
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
                                            color: this.state.set1Point2 !== '' && this.state.set1Point2 >= 6 ? UI.COLORS_HEX.orange : this.state.set1Point2 === '' && this.state.set0Point2 !== '' && this.state.set0Point2 >= 6 ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white,
                                        }}>{this.state.set1Point2 !== '' ? this.state.set1Point2 : this.state.set0Point2 !== '' ? this.state.set0Point2 : 0}</Text>
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
                                            color: this.state.set1Point2 !== '' && this.state.set0Point2 >= 6 ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white,
                                        }}>{this.state.set1Point2 !== '' && this.state.set0Point2 !== '' ? this.state.set0Point2 : 0}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
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
                            width: width - 25,
                            backgroundColor: UI.COLORS_HEX.gray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            borderRadius: 5,
                            marginTop: 15
                        }}>
                            {Platform.OS === 'IOS' ? <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 18,
                                    marginTop: -3,
                                }}>1<View style={{width: 10, height: 20}}><Text style={{
                                fontSize: 14, fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                            }}>e</Text></View> Service</Text> : <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 18,
                                    marginTop: -3,
                                }}>1<Text style={{
                                fontSize: 14, fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                            }}>e</Text> Service</Text>}
                            {this.state.fault === 2 && <View style={{
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
                                 onPress={() => this.onPlayPress('ACE')}
                                 width={(width - 20) / 4 - 10} topShadowWidth={(width - 20) / 4 - 21}
                                 topShadowHeight={32}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.fault !== 2}/>
                            <Box title={'Winner serve'} colors={['#666666', '#808080', '#999999']}
                                 onPress={() => this.onPlayPress('WINNERSERVE ')}
                                 width={(width - 20) / 4 - 10} topShadowWidth={(width - 20) / 4 - 21}
                                 topShadowHeight={32}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.fault !== 2}/>
                            <Box title={'Fout'} colors={['#CD118C', '#EB008B', '#F074AC']}
                                 onPress={() => {
                                     this.onPlayPress('FAULT');
                                 }}
                                 width={(width - 20) / 4 - 10} topShadowWidth={(width - 20) / 4 - 21}
                                 topShadowHeight={32}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.fault !== 2}
                                 fault={true}/>
                            <Box title={'In spel'} colors={['#0095DA', '#00AEEE', '#2BC4F3']}
                                 onPress={() => {

                                     navigator.push({
                                         screen: 'Winner',
                                         navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                         animationType: 'fade',
                                         passProps: {
                                             backTitle: 'Undo', puntPress: (player, scoreType, shott, shotType) => {
                                                 console.log('+++punt player++')
                                                 console.log(player)

                                                 puntWinner = player;
                                                 score_type = scoreType;
                                                 shot = shott;
                                                 shot_type = shotType;
                                                 this.onPlayPress('IN_GAME');
                                             }
                                         }
                                     })
                                 }}
                                 width={(width - 20) / 4 - 10} topShadowWidth={(width - 20) / 4 - 21}
                                 topShadowHeight={32}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.fault !== 2}/>
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
                            {Platform.OS === 'IOS' ? <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 18,
                                    marginTop: -3,
                                }}>2<View style={{width: 10, height: 20}}><Text style={{
                                fontSize: 14, fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                            }}>e</Text></View> Service</Text> : <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 18,
                                    marginTop: -3,
                                }}>2<Text style={{
                                fontSize: 14, fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                            }}>e</Text> Service</Text>}
                            {this.state.fault === 1 && <View style={{
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
                                 onPress={() => this.onPlayPress('ACE')}
                                 width={(width - 20) / 4 - 10} topShadowWidth={(width - 20) / 4 - 21}
                                 topShadowHeight={32}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.fault !== 1}/>
                            <Box title={'Winner serve'} colors={['#666666', '#808080', '#999999']}
                                 onPress={() => this.onPlayPress('WINNERSERVE ')}
                                 width={(width - 20) / 4 - 10} topShadowWidth={(width - 20) / 4 - 21}
                                 topShadowHeight={32}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.fault !== 1}/>
                            <Box title={'Fout'} colors={['#CD118C', '#EB008B', '#F074AC']}
                                 onPress={() => {
                                     this.onPlayPress('FAULT')
                                 }}
                                 width={(width - 20) / 4 - 10} topShadowWidth={(width - 20) / 4 - 21}
                                 topShadowHeight={32}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.fault !== 1}/>
                            <Box title={'In spel'} colors={['#0095DA', '#00AEEE', '#2BC4F3']}
                                 onPress={() => {
                                     this.onPlayPress('IN_GAME ');
                                     navigator.push({
                                         screen: 'Winner',
                                         navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                         animationType: 'fade',
                                         passProps: {backTitle: 'Undo'}
                                     })
                                 }}
                                 width={(width - 20) / 4 - 10} topShadowWidth={(width - 20) / 4 - 21}
                                 topShadowHeight={32}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.fault !== 1}/>
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