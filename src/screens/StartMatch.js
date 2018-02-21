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
            set0Point1: '',
            set0Point2: '',
            set1Point1: '',
            set1Point2: '',
            scrollHeight: '',
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

    };

    getFormatedTime = (t) => {
        this.endTime = t;
    };

    onPlayPress = (player) => {
        const {navigator, store} = this.props;
        this.setState({timerstart: true})
        store.addPlay({
            match_id: store.Match.id,
            player: player,
            service: '',
            score_type: '',
            shot: '',
            shot_type: '',
            second_serve: '',
        }).then(() => {
            console.log(store.Play)
            store.setService(store.Play.now_serving === 0 ? 1 : store.Play.now_serving)
            store.setEndTimeMatch(this.endTime)
            store.setWinnerPlayer(store.Play)
            if (store.Play.score.previousSets.length > 1) {
                this.setState({set1Point1: store.Play.score.previousSets[1].player1});
                this.setState({set1Point2: store.Play.score.previousSets[1].player2});
            }
            if (store.Play.score.previousSets.length > 0) {
                this.setState({set0Point1: store.Play.score.previousSets[0].player1});
                this.setState({set0Point2: store.Play.score.previousSets[0].player2});
            }
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
                        leftBtnTitle={store.Play.score&&(store.Play.score.currentGame.player1 === 0 && store.Play.score.currentGame.player2 === 0) &&
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
                <PersonRow title={store.TournamentByNumber.name}/>


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
                                            marginTop: -2
                                        }} numberOfLines={1}>{store.Match.player1.replace('+',' ')}</Text>
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
                                            marginTop: -2
                                        }} numberOfLines={1}>{store.Match.player2.replace('+',' ')}</Text>
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
                                    }}>{store.Match.player1}</Text>
                                {store.Service === 1 && <Image source={require('../assets/images/ball.png')}
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
                                paddingLeft: 10,
                                padding: 3
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: UI.COLORS_HEX.white,
                                        fontSize: 17,
                                        marginTop: -3,
                                    }}>{store.Match.player2}</Text>
                                {store.Service === 2 && <Image source={require('../assets/images/ball.png')}
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
                                 onPress={() => this.onPlayPress(1)}
                                 selected={true}/>
                            <Box title={'Punt'} colors={['#0095DA', '#00AEEE', '#2BC4F3']}
                                 onPress={() => this.onPlayPress(2)}
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