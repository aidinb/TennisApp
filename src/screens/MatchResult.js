import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
    Image,
} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import UI from '../assets/UI';
import CButton from '../components/CButton';
import Navbar from '../components/Navbar';
import BackImage from '../components/BackImage';
import moment from 'moment';

let {height, width} = Dimensions.get('window');

@inject("store") @observer
export default class MatchResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            set0Point1: '',
            set0Point2: '',
            set1Point1: '',
            set1Point2: '',
            endTime: ''
        };
    }

    componentDidMount() {
        const {store, navigator} = this.props;
        if (store.Play.score.previousSets.length > 1) {
            this.setState({set1Point1: store.Play.score.previousSets[1].player1});
            this.setState({set1Point2: store.Play.score.previousSets[1].player2});
        }
        if (store.Play.score.previousSets.length > 0) {
            this.setState({set0Point1: store.Play.score.previousSets[0].player1});
            this.setState({set0Point2: store.Play.score.previousSets[0].player2});
        }

        let diff = moment.duration(moment(store.Play.end_time).diff(moment(store.Play.start_time)));
         this.setState({endTime: moment.utc(diff.as('milliseconds')).format('HH:mm:ss')})
    }

    render() {
        const {navigator, store} = this.props;
        return (
            <View style={{flex: 1}}>
                <BackImage/>


                <Navbar title={'Wedstrijd ' + store.Court.name} rightBtnColor={UI.COLORS_HEX.orange}
                        leftBtnTitle={'Terug'}
                        onPressLeftBtn={() => {
                            store.getMatcheDet(store.Match.id).then(() => {
                                store.Play = store.MatcheDet;
                                store.Service = store.MatcheDet.server;
                                navigator.pop({
                                    animated: true,
                                    animationType: 'fade',
                                })
                            });
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
                                    paddingLeft: 10,
                                    justifyContent: 'center',
                                    backgroundColor: UI.COLORS_HEX.gray,
                                    borderRadius: 3,
                                    flex: 0.7,
                                    paddingRight: 10,
                                    padding: 3
                                }}>
                                    <Text
                                        style={[UI.regularWhiteText25, {
                                            fontSize: 20,
                                            marginTop: -2
                                        }]} numberOfLines={1}>{store.Match.player1.replace('+', ' / ')}</Text>
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
                                            color: store.Play.score ?  this.state.set0Point1 !== '' && this.state.set0Point1 >= 6 && parseInt(this.state.set0Point1) > parseInt(this.state.set0Point2) ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white : UI.COLORS_HEX.white,
                                        }}>{store.Play.score ?  this.state.set0Point1 !== '' ? this.state.set0Point1 : 0 : 0}</Text>
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
                                            color: store.Play.score ? this.state.set1Point1 !== '' && this.state.set1Point1 >= 6 && parseInt(this.state.set1Point1) > parseInt(this.state.set1Point2) ? UI.COLORS_HEX.orange : this.state.set1Point1 === '' && store.Play.score.currentSet.player1 !== '' && store.Play.score.currentSet.player1 >= 6 && parseInt(store.Play.score.currentSet.player1) > parseInt(store.Play.score.currentSet.player2) ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white : UI.COLORS_HEX.white,
                                        }}>{store.Play.score ? this.state.set1Point1 !== '' ? this.state.set1Point1 : store.Play.score.currentSet.player1 !== '' ? store.Play.score.currentSet.player1 : 0 : 0}</Text>
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
                                            color: store.Play.score ? this.state.set1Point1 !== '' && store.Play.score.currentSet.player1 >= 6 && parseInt(store.Play.score.currentSet.player1) > parseInt(store.Play.score.currentSet.player2) ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white : UI.COLORS_HEX.white,
                                        }}>{store.Play.score ? this.state.set1Point1 !== '' && this.state.set0Point1 !== '' ? store.Play.score.currentSet.player1 : 0 : 0}</Text>
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
                                    flex: 0.7,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    padding: 3
                                }}>
                                    <Text
                                        style={[UI.regularWhiteText25, {
                                            fontSize: 20,
                                            marginTop: -2
                                        }]} numberOfLines={1}>{store.Match.player2.replace('+', ' / ')}</Text>
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
                                            color: store.Play.score ?  this.state.set0Point2 !== '' && this.state.set0Point2 >= 6 && parseInt(this.state.set0Point2) > parseInt(this.state.set0Point1) ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white : UI.COLORS_HEX.white,
                                        }}>{store.Play.score ?  this.state.set0Point2 !== '' ? this.state.set0Point2 : 0 : 0}</Text>
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
                                            color: store.Play.score ? this.state.set1Point2 !== '' && this.state.set1Point2 >= 6 && parseInt(this.state.set1Point2) > parseInt(this.state.set1Point1) ? UI.COLORS_HEX.orange : this.state.set1Point2 === '' && store.Play.score.currentSet.player2 !== '' && store.Play.score.currentSet.player2 >= 6 && parseInt(store.Play.score.currentSet.player2) > parseInt(store.Play.score.currentSet.player1) ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white : UI.COLORS_HEX.white,
                                        }}>{store.Play.score ? this.state.set1Point2 !== '' ? this.state.set1Point2 : store.Play.score.currentSet.player2 !== '' ? store.Play.score.currentSet.player2 : 0 : 0}</Text>
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
                                            color: store.Play.score ? this.state.set1Point2 !== '' && store.Play.score.currentSet.player2 >= 6 && parseInt(store.Play.score.currentSet.player2) > parseInt(store.Play.score.currentSet.player1) ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white : UI.COLORS_HEX.white,
                                        }}>{store.Play.score ? this.state.set1Point2 !== '' && this.state.set0Point2 !== '' ? store.Play.score.currentSet.player2 : 0 : 0}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            width: width - 30,
                            flexDirection: 'row',
                            height: 25,
                            alignItems: 'center'
                        }}>
                            <Text
                                style={[UI.regularWhiteText25, {
                                    fontSize: 15,
                                    marginTop: -3,
                                }]}>Partij duur: </Text>
                            <Text
                                style={[UI.regularWhiteText25, {
                                    fontSize: 15,
                                    marginTop: -3,
                                }]}>{this.state.endTime} </Text>

                        </View>
                        <Text
                            style={{
                                fontFamily: UI.FONT.blackItalic,
                                color: UI.COLORS_HEX.white,
                                fontSize: 32,
                                marginTop: 15,
                            }}>{store.WinnerPlayer.winner === 1 ? store.WinnerPlayer.player1.replace('+', ' / ') :  store.WinnerPlayer.player2.replace('+', ' / ')}</Text>
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
                        <View style={{marginTop: 40}}>
                            <CButton title={'Toon GameSetStats'} fontSize={16} width={width - 60}
                                     backgroundColor={UI.COLORS_HEX.blue}
                                     color={UI.COLORS_HEX.white}
                                     onPress={() => {
                                         navigator.push({
                                             screen: 'Statics',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Registreren', endTime: this.state.endTime}
                                         })
                                     }}/>
                        </View>
                    </View>
                </ScrollView>

            </View>
        )


    }
}