import React, {Component} from 'react';
import {
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform,
    FlatList
} from 'react-native';
import UI from '../assets/UI';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {inject, observer} from 'mobx-react/native';

let {height, width} = Dimensions.get('window');

@inject("store") @observer
export default class EditScore extends Component {
    constructor(props) {
        super(props);
    }



    onScorePress = (score) => {
        const {store, navigator} = this.props;
        store.setUpdate(true)
        if (this.props.type === "currentGame") {
            if (this.props.player === 1) {
                store.Play.score.currentGame.player1 = score;
            } else {
                store.Play.score.currentGame.player2 = score;
            }
        } else if (this.props.type === "currentSet") {
            if (this.props.player === 1) {
                store.Play.score.currentSet.player1 = score;
            } else {
                store.Play.score.currentSet.player2 = score;
            }

        } else if (this.props.type === "prev1") {
            if (store.Play.score.previousSets[1]) {

                if (this.props.player === 1) {
                    store.Play.score.previousSets[1].player1 = score;
                    this.props.setScoreSets();
                } else {
                    store.Play.score.previousSets[1].player2 = score;
                    this.props.setScoreSets();
                }
            } else {
                if (this.props.player === 1) {
                    if (store.Play.score.previousSets[1] && parseInt(store.Play.score.previousSets[1].player2) !== 0) {
                        store.Play.score.previousSets.push({...store.Play.score.previousSets, player1: score});
                    } else {
                        store.Play.score.previousSets.push({
                            ...store.Play.score.previousSets,
                            player1: score,
                            player2: ''
                        });
                    }
                    this.props.setScoreSets();
                } else {
                    if (store.Play.score.previousSets[1].player2 && parseInt(store.Play.score.previousSets[1].player2) !== 0) {
                        store.Play.score.previousSets.push({...store.Play.score.previousSets, player2: score});
                    } else {
                        store.Play.score.previousSets.push({
                            ...store.Play.score.previousSets,
                            player2: score,
                            player1: ''
                        });
                    }
                    this.props.setScoreSets();

                }
            }
        } else {
            if (store.Play.score.previousSets[0]) {
                if (this.props.player === 1) {
                    store.Play.score.previousSets[0].player1 = score;
                    this.props.setScoreSets();

                } else {
                    store.Play.score.previousSets[0].player2 = score;
                    this.props.setScoreSets();

                }
            } else {
                if (this.props.player === 1) {
                    if (store.Play.score.previousSets[0] && parseInt(store.Play.score.previousSets[0].player2) !== 0) {
                        store.Play.score.previousSets.push({...store.Play.score.previousSets, player1: score});
                    } else {
                        store.Play.score.previousSets.push({
                            ...store.Play.score.previousSets,
                            player1: score,
                            player2: ''
                        });
                    }
                    this.props.setScoreSets();
                } else {
                    if (store.Play.score.previousSets[0].player2 && parseInt(store.Play.score.previousSets[0].player2) !== 0) {
                        store.Play.score.previousSets.push({...store.Play.score.previousSets, player2: score});
                    } else {
                        store.Play.score.previousSets.push({
                            ...store.Play.score.previousSets,
                            player2: score,
                            player1: ''
                        });
                    }
                    this.props.setScoreSets();

                }
            }
        }

        if (Platform.OS === 'ios') {
            navigator.dismissLightBox();

        } else {
            navigator.dismissModal();

        }


    }

    render() {
        const {store, navigator} = this.props;

        return (

            <ScrollView showsVerticalScrollIndicator={false} style={{
                height: height, backgroundColor: Platform.OS === 'ios' ? 'transparent' : UI.COLORS_HEX.black
            }} contentContainerStyle={{
                paddingTop: 50,
                paddingBottom: 20,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {this.props.type === "currentGame" ?
                    <View>

                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(0)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(15)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>15</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(30)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>30</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(40)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>40</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("AD")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>AD</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("1")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("2")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("3")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("4")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("5")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("6")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>6</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("7")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("8")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>8
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("9")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>9</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("10")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>10</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("11")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>11</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("12")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>12</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("13")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>13</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("14")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>14</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("15")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>15</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("16")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>16</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("17")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>17</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("18")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>18</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("19")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>19</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress("20")} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>20</Text>
                        </TouchableOpacity>

                    </View> : <View>

                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(0)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(1)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(2)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(3)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(4)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(5)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(6)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>6</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(7)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(8)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(9)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>9</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(10)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>10</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(11)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>11</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(12)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>12</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(13)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>13</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(14)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>14</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(15)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>15</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(16)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>16</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(17)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>17</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(18)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>18</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(19)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>19</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(20)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>20</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(21)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>21</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(22)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>22</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(23)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>23</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(24)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>24</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(25)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>25</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(26)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>26</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(27)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>27</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(28)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>28</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(29)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>29</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onScorePress(30)} style={{
                            width: width / 2,
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                }}>30</Text>
                        </TouchableOpacity>
                    </View>}

            </ScrollView>

        );
    }


}
