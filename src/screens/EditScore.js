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

let {height, width} = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import {inject, observer} from 'mobx-react/native';

@inject("store") @observer
export default class EditScore extends Component {
    constructor(props) {
        super(props);
    }


    onScorePress = (score) => {
        const {store, navigator} = this.props;
        if(this.props.type==="currentGame"){
            if (this.props.player === 1) {
                store.Play.score.currentGame.player1 = score;
            } else {
                store.Play.score.currentGame.player2 = score;
            }
        }else if(this.props.type==="currentSet"){
            if (this.props.player === 1) {
                store.Play.score.currentSet.player1 = score;
            } else {
                store.Play.score.currentSet.player2 = score;
            }

        }else if(this.props.type==="prev1"){
            // if (this.props.player === 1) {
            //     store.Play.score.previousSets[0]={player1:score}
            // } else {
            //     store.Play.score.previousSets[1].player2 = score;
            // }
        }else{
            // if (this.props.player === 1) {
            //     store.Play.score.previousSets[0].player1 = score;
            // } else {
            //     store.Play.score.previousSets[0].player2 = score;
            // }
        }
        delete store.Play.score.currentGame.tie_break;
        delete store.Play.score.currentSet.super_tie_break;
        store.setMatchScore(store.Match.id, store.Play.score).then(() => {
            console.log(store.Play)
            if (Platform.OS === 'ios') {
                navigator.dismissLightBox();

            }else{
                navigator.dismissModal();

            }
        })
    }

    render() {
        const {store, navigator} = this.props;

        return (

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
                    </View>}

            </View>

        );
    }


}
