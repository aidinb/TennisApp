import React from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform,
    Image,
    Alert
} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import {Stopwatch} from 'react-native-stopwatch-timer'

import UI from '../assets/UI';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Box from "../components/Box";
import BackImage from "../components/BackImage";

let {height, width} = Dimensions.get('window');
const endTime = '';
let set1Point1 = '';
let set1Point2 = '';
let set0Point1 = '';
let set0Point2 = '';


@inject("store") @observer
export default class StartMatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollHeight: '',
            timerstart: true,
            timeReset: false,


        };
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
                }else{
                    set1Point1 = '';
                    set1Point2 = '';

                    set0Point1 = '';
                    set0Point2 = '';
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
        set1Point1 = '';
        set1Point2 = '';
        set0Point1 = '';
        set0Point2 = '';

    }
    setScoreSets = () => {
        const {navigator, store} = this.props;
        console.log('++setScoreSets++')
        console.log(store.Play.score)
        if (store.Play.score) {
            if (store.Play.score.previousSets.length > 1) {
                set1Point1 = store.Play.score.previousSets[1].player1;
                set1Point2 = store.Play.score.previousSets[1].player2;
            }
            if (store.Play.score.previousSets.length > 0) {
                set0Point1 = store.Play.score.previousSets[0].player1;
                set0Point2 = store.Play.score.previousSets[0].player2;
            }
        }
    }

    onPlayPress = (player) => {
        const {navigator, store} = this.props;
        if (store.Update === true) {

            Alert.alert(
                'Attention',
                'are you sure?',
                [
                    {text: 'OK', onPress: () => {
                        store.setUpdate(false)
                        this.setState({timerstart: true});
                        if (store.Play.winner&&store.Play.winner !== 0) {
                            navigator.push({
                                screen: 'MatchResult',
                                navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                animationType: 'fade',
                                passProps: {backTitle: 'Terug'}
                            })
                        }else{
                            store.addPlay({
                                match_id: store.Match.id,
                                player: player,
                                service: '',
                                score_type: '',
                                shot: '',
                                shot_type: '',
                                second_serve: '',
                            }).then(() => {
                                store.setService(store.Play.now_serving)
                                store.setEndTimeMatch(this.endTime)
                                store.setWinnerPlayer(store.Play)
                                store.setService(store.Play.now_serving)
                                if (store.Play.score.previousSets.length > 0) {

                                    if (store.Play.score.previousSets.length > 1) {
                                        set1Point1 = store.Play.score.previousSets[1].player1;
                                        set1Point2 = store.Play.score.previousSets[1].player2;
                                    }
                                    if (store.Play.score.previousSets.length > 0) {
                                        set0Point1 = store.Play.score.previousSets[0].player1;
                                        set0Point2 = store.Play.score.previousSets[0].player2;
                                    }
                                }else{
                                    store.Play.score.previousSets = [];
                                    set1Point1 = '';
                                    set1Point2 = '';
                                    set0Point1 = '';
                                    set0Point2 = '';
                                }
                                if (store.Play.winner !== 0) {
                                    navigator.push({
                                        screen: 'MatchResult',
                                        navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                        animationType: 'fade',
                                        passProps: {backTitle: 'Terug'}
                                    })
                                }

                            })}
                    }},
                    {text: 'CANCEL', onPress: () => console.log('OK Pressed')},
                ],
            )
        }else{
            store.setUpdate(false)
            this.setState({timerstart: true});
            if (store.Play.winner&&store.Play.winner !== 0) {
                navigator.push({
                    screen: 'MatchResult',
                    navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                    animationType: 'fade',
                    passProps: {backTitle: 'Terug'}
                })
            }else{
                store.addPlay({
                    match_id: store.Match.id,
                    player: player,
                    service: '',
                    score_type: '',
                    shot: '',
                    shot_type: '',
                    second_serve: '',
                }).then(() => {
                    store.setService(store.Play.now_serving)
                    store.setEndTimeMatch(this.endTime)
                    store.setWinnerPlayer(store.Play)
                    store.setService(store.Play.now_serving)
                    if (store.Play.score.previousSets.length > 0) {

                        if (store.Play.score.previousSets.length > 1) {
                            set1Point1 = store.Play.score.previousSets[1].player1;
                            set1Point2 = store.Play.score.previousSets[1].player2;
                        }
                        if (store.Play.score.previousSets.length > 0) {
                            set0Point1 = store.Play.score.previousSets[0].player1;
                            set0Point2 = store.Play.score.previousSets[0].player2;
                        }
                    }else{
                        store.Play.score.previousSets = [];
                        set1Point1 = '';
                        set1Point2 = '';
                        set0Point1 = '';
                        set0Point2 = '';
                    }
                    if (store.Play.winner !== 0) {
                        navigator.push({
                            screen: 'MatchResult',
                            navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                            animationType: 'fade',
                            passProps: {backTitle: 'Terug'}
                        })
                    }

                })}
        }



    }

    onUndoPress = () => {
        const {navigator, store} = this.props;

        store.deleteLastPlay(store.Match.id)
    };

    onScorePress = (player, type) => {
        const {navigator, store} = this.props;
        console.log(type)
        if (type === 0) {
            alert('Niet toegestaan om te wijzigen')
        }
        else {
            if (Platform.OS === 'ios') {
                navigator.showLightBox({
                    screen: 'EditScore',
                    style: {
                        backgroundBlur: "dark",
                        tapBackgroundToDismiss: true,
                    },
                    passProps: {player: player, type: type, setScoreSets: this.setScoreSets}
                })
            } else {
                navigator.showModal({
                    screen: 'EditScore',
                    animationType: 'slide-up',
                    navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                    passProps: {player: player, type: type, setScoreSets: this.setScoreSets}

                });
            }

        }
    }

    render() {
        const {navigator, store} = this.props;
        if (store.Play.score) {
            if (store.Play.score.previousSets.length > 0) {
                if (store.Play.score.previousSets.length > 1) {
                    set1Point1 = store.Play.score.previousSets[1].player1;
                    set1Point2 = store.Play.score.previousSets[1].player2;
                }else{
                    set1Point1 = '';
                    set1Point2 = '';
                }
                if (store.Play.score.previousSets.length > 0) {
                    set0Point1 = store.Play.score.previousSets[0].player1;
                    set0Point2 = store.Play.score.previousSets[0].player2;
                }else{
                    set0Point1 = '';
                    set0Point2 = '';
                }
            } else {
                console.log('boooo')
                console.log(store.Play)
                set1Point1 = '';
                set1Point2 = '';
                set0Point1 = '';
                set0Point2 = '';
            }
        }
        return (
            <View style={{flex: 1}}>
                <BackImage/>

                <Navbar title={'Wedstrijd ' + store.Court.name} rightBtnColor={UI.COLORS_HEX.orange}
                        rightBtnTitle={store.Update === false ? "Stop" : "Update"}
                        onPressRightBtn={() => {
                            if (store.Update === false) {
                                Alert.alert(
                                    'Let op!',
                                    'Weet u zeker dat u de wedstrijd wilt stoppen?',
                                    [
                                        {
                                            text: 'Ja', onPress: () => store.pauseMatch(store.Match.id).then(() => {
                                            let diff = moment.duration(moment(store.PauseMatch.end_time).diff(moment(store.PauseMatch.start_time)));
                                            let endTime1 = moment.utc(diff.as('milliseconds')).format('HH:mm:ss')

                                            navigator.push({
                                                screen: 'Statics',
                                                navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                                animationType: 'fade',
                                                passProps: {endTime: endTime1}
                                            })
                                        })
                                        },
                                        {text: 'Annuleren', onPress: () => console.log('OK Pressed')},
                                    ],
                                )

                            } else {
                                delete store.Play.score.currentGame.tie_break;
                                delete store.Play.score.currentGame.finished;
                                delete store.Play.score.currentSet.super_tie_break;
                                delete store.Play.score.currentSet.finished;
                                if (store.Play.score.previousSets[0]) {
                                    delete store.Play.score.previousSets[0].super_tie_break;
                                    delete store.Play.score.previousSets[0].finished;
                                }
                                if (store.Play.score.previousSets[1]) {
                                    delete store.Play.score.previousSets[1].super_tie_break;
                                    delete store.Play.score.previousSets[1].finished;
                                }
                                store.setMatchScore(store.Match.id, store.Play.score).then(() => {
                                    store.setUpdate(false);
                                    if (store.Play.winner !== 0) {
                                        navigator.push({
                                            screen: 'MatchResult',
                                            navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                            animationType: 'fade',
                                            passProps: {backTitle: 'Terug'}
                                        })
                                    }
                                })
                            }
                        }}
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
                                    width: (width - 30) / 2,
                                    padding: 3
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: UI.FONT.regular,
                                            color: UI.COLORS_HEX.white,
                                            fontSize: 20,
                                            marginTop: -2,
                                            flex: 0.85
                                        }} numberOfLines={1}>{store.Match.player1.replace('+', ' ')}</Text>
                                    {store.Service === 1 &&
                                    <Image source={require('../assets/images/ball.png')}
                                           style={{
                                               width: 20,
                                               height: 20,
                                               resizeMode: 'contain',
                                               flex: 0.15
                                           }}/>}
                                </View>
                                <View style={{
                                    paddingLeft: 10,
                                    borderRadius: 5,
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    flex: 0.5
                                }}>
                                    <TouchableOpacity activeOpacity={0.8}
                                                      onPress={() => this.onScorePress(1, store.Play.score ? "currentGame" : 0)}
                                                      style={{
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
                                    <TouchableOpacity activeOpacity={0.8}
                                                      onPress={() => this.onScorePress(1, store.Play.score ? set0Point1 !== '' ? "prev0" : store.Play.score.currentSet.player1 ? "currentSet" : "currentSet" : 0)}
                                                      style={{
                                                          width: (width - 40) / 8 - 4,
                                                          backgroundColor: UI.COLORS_HEX.gray,
                                                          borderRadius: 3,
                                                          justifyContent: 'center',
                                                          alignItems: 'center'

                                                      }}>
                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: store.Play.score ? set0Point1 !== '' && set0Point1 >= 6 && parseInt(set0Point1) > parseInt(set0Point2) ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white : UI.COLORS_HEX.white,
                                        }}>{store.Play.score ? set0Point1 !== '' ? set0Point1 : store.Play.score.currentSet.player1 : 0}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                        this.onScorePress(1, store.Play.score ? set1Point1 !== '' ? "prev1" : set0Point1 !== '' ? "currentSet" : 0 : 0)
                                    }} style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: (width - 40) / 8 - 4,
                                        backgroundColor: UI.COLORS_HEX.gray,
                                        borderRadius: 3
                                    }}>
                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: store.Play.score ? set1Point1 !== '' && set1Point1 >= 6 && parseInt(set1Point1) > parseInt(set1Point2) ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white : UI.COLORS_HEX.white,
                                        }}>{store.Play.score ? set1Point1 !== '' ? set1Point1 : set0Point1 !== '' ? store.Play.score.currentSet.player1 : 0 : 0}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                        this.onScorePress(1, set1Point1 !== '' && set0Point1 !== '' ? store.Play.score && store.Play.score.currentSet.player1 !== '' ? "currentSet" : 0 : 0)
                                    }} style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: (width - 40) / 8 - 4,
                                        backgroundColor: UI.COLORS_HEX.gray,
                                        borderRadius: 3
                                    }}>
                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: store.Play.score ? set1Point1 !== '' && set0Point1 !== '' ? store.Play.winner === 1 && parseInt(store.Play.score.currentSet.player1) > parseInt(store.Play.score.currentSet.player2) ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white : UI.COLORS_HEX.white : UI.COLORS_HEX.white,
                                        }}>{store.Play.score ? set1Point1 !== '' && set0Point1 !== '' ? store.Play.score.currentSet.player1 : 0 : 0}</Text>
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
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    width: (width - 30) / 2,
                                    padding: 3
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: UI.FONT.regular,
                                            color: UI.COLORS_HEX.white,
                                            fontSize: 20,
                                            marginTop: -2,
                                            flex: 0.85
                                        }} numberOfLines={1}>{store.Match.player2.replace('+', ' / ')}</Text>
                                    {store.Service === 2 &&
                                    <Image source={require('../assets/images/ball.png')}
                                           style={{
                                               width: 20,
                                               height: 20,
                                               resizeMode: 'contain',
                                               flex: 0.15

                                           }}/>}
                                </View>
                                <View style={{
                                    paddingLeft: 10,
                                    borderRadius: 5,
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    flex: 0.5

                                }}>
                                    <TouchableOpacity activeOpacity={0.8}
                                                      onPress={() => this.onScorePress(2, "currentGame")}
                                                      style={{
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
                                    <TouchableOpacity activeOpacity={0.8}
                                                      onPress={() => this.onScorePress(2, store.Play.score ? set0Point2 !== '' ? "prev0" : store.Play.score.currentSet.player2 ? "currentSet" : "currentSet" : 0)}
                                                      style={{
                                                          width: (width - 40) / 8 - 4,
                                                          backgroundColor: UI.COLORS_HEX.gray,
                                                          borderRadius: 3,
                                                          justifyContent: 'center',
                                                          alignItems: 'center'

                                                      }}>
                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: store.Play.score ? set0Point2 !== '' && set0Point2 >= 6 && parseInt(set0Point2) > parseInt(set0Point1) ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white : UI.COLORS_HEX.white,
                                        }}>{store.Play.score ? set0Point2 !== '' ? set0Point2 : store.Play.score.currentSet.player2 : 0}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                        this.onScorePress(2, set1Point2 !== '' ? "prev1" : set0Point2 !== '' ? "currentSet" : 0)
                                    }} style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: (width - 40) / 8 - 4,
                                        backgroundColor: UI.COLORS_HEX.gray,
                                        borderRadius: 3
                                    }}>
                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: store.Play.score ? set1Point2 !== '' && set1Point2 >= 6 && parseInt(set1Point2) > parseInt(set1Point1) ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white : UI.COLORS_HEX.white,
                                        }}>{store.Play.score ? set1Point2 !== '' ? set1Point2 : set0Point2 !== '' ? store.Play.score.currentSet.player2 : 0 : 0}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                        this.onScorePress(2, set1Point2 !== '' && set0Point2 !== '' ? "currentSet" : 0)
                                    }} style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: (width - 40) / 8 - 4,
                                        backgroundColor: UI.COLORS_HEX.gray,
                                        borderRadius: 3
                                    }}>
                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: store.Play.score ? set1Point2 !== '' && set0Point2 !== '' ? store.Play.winner === 2 && parseInt(store.Play.score.currentSet.player2) > parseInt(store.Play.score.currentSet.player1) ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white : UI.COLORS_HEX.white : UI.COLORS_HEX.white,
                                        }}>{store.Play.score ? set1Point2 !== '' && set0Point2 !== '' ? store.Play.score.currentSet.player2 : 0 : 0}</Text>
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
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 15,
                                    marginTop: -3,
                                }}>Partij duur: </Text>
                            <Stopwatch start={this.state.timerstart}
                                       options={options}
                                       reset={this.state.timeReset}/>
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
                                flexDirection: 'row',
                                paddingRight: 10,
                                paddingLeft: 10,
                                padding: 3
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: UI.COLORS_HEX.white,
                                        fontSize: 17,
                                        marginTop: -3,
                                        flex: 0.85
                                    }}>{store.Match.player1.replace('+',' / ')}</Text>
                                {store.Service === 1 && <Image source={require('../assets/images/ball.png')}
                                                               style={{
                                                                   width: 18,
                                                                   height: 18,
                                                                   resizeMode: 'contain',
                                                                   flex: 0.15
                                                               }}/>}
                            </View>
                            <View style={{
                                width: (width - 70) / 2, justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingRight: 10,
                                paddingLeft: 10,
                                padding: 3
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: UI.COLORS_HEX.white,
                                        fontSize: 17,
                                        marginTop: -3,
                                        flex: 0.85
                                    }}>{store.Match.player2.replace('+', ' / ')}</Text>
                                {store.Service === 2 && <Image source={require('../assets/images/ball.png')}
                                                               style={{
                                                                   width: 18,
                                                                   height: 18,
                                                                   resizeMode: 'contain',
                                                                   flex: 0.15

                                                               }}/>}
                            </View>


                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            width: width - 90,

                        }}>
                            <Box title={'Punt'} colors={['#00914C', '#00A550', '#64C08A']}
                                 onPress={() => this.onPlayPress(1)}
                                 selected={true}/>
                            <Box title={'Punt'} colors={['#0095DA', '#00AEEE', '#2BC4F3']}
                                 onPress={() => this.onPlayPress(2)}
                                 selected={true}/>
                        </View>
                    </View>
                </ScrollView>
                <Footer image={store.SponserImage}/>

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