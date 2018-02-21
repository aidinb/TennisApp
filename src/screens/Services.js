import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
    Platform,
    Image,
    TouchableOpacity

} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import UI from '../assets/UI';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Box from "../components/Box";
import BackImage from "../components/BackImage";
import {Stopwatch} from 'react-native-stopwatch-timer'

let {height, width} = Dimensions.get('window');

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
            timerstart: true,
            second_Serve: 0,
            fault: 1,
            set: [],
            set0Point1: '',
            set0Point2: '',
            set1Point1: '',
            set1Point2: '',
            scrollHeight: ''
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

                if (store.Play.score.currentGame.player1 === "game" || store.Play.score.currentGame.player2 === "game") {
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

                if (store.Play.score.currentGame.player1 === "game" || store.Play.score.currentGame.player2 === "game") {
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

    onUndoPress = () => {
        const {navigator, store} = this.props;
        store.deleteLastPlay(store.Match.id)
    };

    onScorePress = (player,type) => {
        const {navigator, store} = this.props;
        if (Platform.OS === 'ios') {
            navigator.showLightBox({
                screen: 'EditScore',
                style: {
                    backgroundBlur: "dark",
                    tapBackgroundToDismiss: true,
                },
                passProps: {player:player,type:type}
            })
        } else {
            navigator.showModal({
                screen: 'EditScore',
                animationType: 'slide-up',
                navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                passProps: {player:player,type:type}

            });
        }
    }

    render() {
        const {navigator, store} = this.props;

        return (
            <View style={{flex: 1}}>
                <BackImage/>

                <View style={[UI.absoluteView, {
                    backgroundColor: 'rgba(0,0,0,0.8)'
                }]}/>

                <Navbar title={'Wedstrijd ' + store.Court.name} rightBtnColor={UI.COLORS_HEX.orange}
                        leftBtnTitle={store.Play.score && (store.Play.score.currentGame.player1 === 0 && store.Play.score.currentGame.player2 === 0) &&
                        (store.Play.score.currentSet.player1 === 0 && store.Play.score.currentSet.player2 === 0) &&
                        store.Play.score.previousSets.length === 0
                            ? 'Instellingen' : 'Corrigeer'}
                        onPressLeftBtn={() => {
                            if (store.Play.score) {
                                if ((store.Play.score.currentGame.player1 === 0 && store.Play.score.currentGame.player2 === 0) &&
                                    (store.Play.score.currentSet.player1 === 0 && store.Play.score.currentSet.player2 === 0) &&
                                    store.Play.score.previousSets.length === 0) {
                                    navigator.pop();

                                } else {
                                    this.onUndoPress();

                                }
                            }
                        }}/>


                <ScrollView contentContainerStyle={{paddingBottom: 70}} ref={ref => this.myScroll = ref}
                            onLayout={ev => this.state.scrollHeight = ev.nativeEvent.layout.height}>
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
                                    padding: 5,
                                    width: (width - 30) / 2
                                }}>
                                    <Text
                                        style={[UI.regularWhiteText25, {
                                            fontSize: 20,
                                            marginTop: -2,
                                            width: (width - 100) / 2

                                        }]} numberOfLines={1}>{store.Match.player1.replace('+', ' ')}</Text>
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
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(1,"currentGame")} style={{
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
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(1,"currentSet")} style={{
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
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => {this.onScorePress(1,'prev1')}} style={{
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
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => {this.onScorePress(1,'prev0')}} style={{
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
                                    </TouchableOpacity>
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
                                    width: (width - 30) / 2,
                                    padding: 5,
                                }}>
                                    <Text
                                        style={[UI.regularWhiteText25, {
                                            fontSize: 20,
                                            marginTop: -2,
                                            width: (width - 100) / 2

                                        }]} numberOfLines={1}>{store.Match.player2.replace('+', ' ')}</Text>
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
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(2,"currentGame")} style={{
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
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(2,"currentSet")} style={{
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
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => {this.onScorePress(2,'prev1')}} style={{
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
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => {this.onScorePress(1,'prev0')}} style={{
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
                                    </TouchableOpacity>
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
                                style={[UI.regularWhiteText25, {
                                    fontSize: 15,
                                    marginTop: -3,
                                }]}>Partij duur: </Text>
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
                        }}>
                            {Platform.OS === 'IOS' ? <Text
                                style={[UI.regularWhiteText25, {
                                    fontSize: 18,
                                    marginTop: -3,
                                }]}>1<View style={{width: 10, height: 20}}><Text style={[UI.regularWhiteText25, {
                                fontSize: 14,
                            }]}>e</Text></View> Service</Text> : <Text
                                style={[UI.regularWhiteText25, {
                                    fontSize: 18,
                                    marginTop: -3,
                                }]}>1<Text style={[UI.regularWhiteText25, {
                                fontSize: 14,
                            }]}>e</Text> Service</Text>}
                            {this.state.fault === 2 && <View style={[UI.absoluteView, {
                                backgroundColor: UI.COLORS_HEX.whiteBoxBlur,
                                borderRadius: 5,

                            }]}/>}

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
                                     this.myScroll.scrollTo({y: this.state.scrollHeight / 3});
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
                                style={[UI.regularWhiteText25, {
                                    fontSize: 18,
                                    marginTop: -3,
                                }]}>2<View style={{width: 10, height: 20}}><Text style={[UI.regularWhiteText25, {
                                fontSize: 14,
                            }]}>e</Text></View> Service</Text> : <Text
                                style={[UI.regularWhiteText25, {
                                    fontSize: 18,
                                    marginTop: -3,
                                }]}>2<Text style={[UI.regularWhiteText25, {
                                fontSize: 14,
                            }]}>e</Text> Service</Text>}
                            {this.state.fault === 1 && <View style={[UI.absoluteView, {
                                backgroundColor: UI.COLORS_HEX.whiteBoxBlur,
                                borderRadius: 5,

                            }]}/>}
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            width: width - 20,
                        }}>
                            <Box title={'Ace'} colors={['#00914C', '#00A550', '#64C08A']}
                                 onPress={() => {
                                     this.myScroll.scrollTo({y: 0});
                                     this.onPlayPress('ACE')
                                 }}
                                 width={(width - 20) / 4 - 10} topShadowWidth={(width - 20) / 4 - 21}
                                 topShadowHeight={32}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.fault !== 1}/>
                            <Box title={'Winner serve'} colors={['#666666', '#808080', '#999999']}
                                 onPress={() => {
                                     this.myScroll.scrollTo({y: 0});
                                     this.onPlayPress('WINNERSERVE ')
                                 }}
                                 width={(width - 20) / 4 - 10} topShadowWidth={(width - 20) / 4 - 21}
                                 topShadowHeight={32}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.fault !== 1}/>
                            <Box title={'Fout'} colors={['#CD118C', '#EB008B', '#F074AC']}
                                 onPress={() => {
                                     this.myScroll.scrollTo({y: 0});
                                     this.onPlayPress('FAULT')
                                 }}
                                 width={(width - 20) / 4 - 10} topShadowWidth={(width - 20) / 4 - 21}
                                 topShadowHeight={32}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.fault !== 1}/>
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