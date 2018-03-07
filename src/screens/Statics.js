import React from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Image,
    Alert,
    CameraRoll,
    FlatList,
    PermissionsAndroid,
    Platform
} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import LinearGradient from 'react-native-linear-gradient';
import UI from '../assets/UI';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import {captureScreen} from "react-native-view-shot";
import Loading from '../components/Loading';
import BackImage from '../components/BackImage';

let {height, width} = Dimensions.get('window');

const stat={
    aces:'Aces',
    double_faults:'Dubbele fouten',
    first_serve:'1e service %',
    forced_errors:'Forced errors',
    point_first_serve:'% gewonnen op 1e service',
    point_second_serve:'% gewonnen op 2e service',
    unforced_errors:'Unforced errors',
    winners:'Winners',
    winner_serve:'Winner serve',
    break_points:'Breakpunten'


}

@inject("store") @observer
export default class Statics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showSeg: 'match',
            isLoading: false,
            value: {
                format: "png",
                quality: 0.9,
                result: "tmpfile",
                snapshotContentContainer: false
            },
            set0Point1: '',
            set0Point2: '',
            set1Point1: '',
            set1Point2: '',
            statValue: []
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
        this.setState({isLoading: true})
        store.getMatcheStatistics(store.Match.id).then(() => {
            let arr = [];
            Object.keys(store.MatcheStatistics[0].value).map(key => arr.push({
                key: key,
                value: store.MatcheStatistics[0].value[key]
            }));
            this.setState({statValue: arr, isLoading: false})

        });
    }

    snapshot = () => {
        captureScreen(this.state.value).then(
            res => {
                this.setState({isLoading: true})
                CameraRoll.saveToCameraRoll(res, 'photo').then(() => {
                    this.setState({isLoading: false})

                    Alert.alert(
                        '',
                        'Statistieken zijn toevoegd aan je foto\'s',
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                    )
                })
            })

    };
    requestCameraPermission = () => {
        if (Platform.OS !== 'ios') {
            if (Platform.Version >= 23) {
                PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
                    .then((hasPermission) => {
                        if (!hasPermission) {
                            PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
                                    'title': '',
                                    'message': 'Wilt u GameSetStats toegang geven tot uw foto\'s?'
                                })
                                .then((didAccept) => {
                                    if (!didAccept) {
                                        console.error('User refused');
                                    } else {
                                        this.snapshot()
                                    }
                                });
                        } else {
                            this.snapshot()
                        }
                    });
            } else {
                this.snapshot();
            }
        }
        this.snapshot();
    }


    renderItem = ({item, index}) => {
        const {store, navigator} = this.props;
        const Key = item.key;
        return (
            <View style={{
                width: width - 30,
                height: 35,
                borderRadius: 6,
                justifyContent: 'space-around',
                flexDirection: 'row'
            }}>
                <LinearGradient
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 1}}
                    locations={[0, 0.45]}
                    colors={["#999999", "#000000"]}
                    style={{
                        width: width - 30,
                        borderRadius: 6, height: 35,
                        shadowColor: 'black',
                        shadowOffset: {width: 0, height: 0},
                        shadowOpacity: 0.7,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}/>
                <Text style={{
                    fontFamily: UI.FONT.bold,
                    color: UI.COLORS_HEX.white,
                    fontSize: 17,
                    width: width / 8
                }}>
                    {item.value.player1}
                </Text>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: (width - 10) / 2,
                    backgroundColor: UI.COLORS_HEX.boxGray,
                    height: 35,
                    borderRadius: 20,
                    shadowColor: UI.COLORS_HEX.black,
                    shadowOffset: {width: 3, height: 3},
                    shadowOpacity: 0.7,
                }}>
                    <Text style={{
                        fontFamily: UI.FONT.bold,
                        color: UI.COLORS_HEX.white,
                        fontSize: 14,
                    }}>
                        {stat[Key]}
                    </Text>
                </View>
                <Text style={{
                    fontFamily: UI.FONT.bold,
                    color: UI.COLORS_HEX.white,
                    fontSize: 17,
                    width: width / 8,
                    textAlign: 'right'
                }}>
                    {item.value.player2}
                </Text>
            </View>
        )
    };

    render() {
        const {navigator, store} = this.props;
        return (
            <View style={{flex: 1}}>
                <BackImage/>


                <Navbar title={'Statistieken'} rightBtnColor={UI.COLORS_HEX.orange}
                        rightBtnTitle={'Deel'}
                        onPressRightBtn={() => this.requestCameraPermission()} leftBtnTitle={'Home'}
                        onPressLeftBtn={() => {
                            Alert.alert(
                                '',
                                'U gaat de partij verlaten, weet u het zeker?',
                                [
                                    {
                                        text: 'Ja', onPress: () => navigator.push({
                                        screen: 'Menu',
                                        navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                        animationType: 'fade',
                                        passProps: {backTitle: 'Kies Categorie'}
                                    })
                                    },
                                    {text: 'Annuleren', onPress: () => console.log('OK Pressed')},
                                ],
                            )
                        }}/>


                <View
                    style={{width: width, padding: 15, alignItems: 'center', paddingTop: 10, flex: 1}}>
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
                            }]}>{this.props.endTime} </Text>

                    </View>
                    <View
                        style={{

                            backgroundColor: UI.COLORS_HEX.white,
                            borderRadius: 6,
                            borderColor: UI.COLORS_HEX.blue,
                            borderWidth: 0.5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginTop: 5,
                            height: 30
                        }}>
                        {store.MatcheStatistics.map((s, index) => {
                            return (
                                <TouchableOpacity key={'stat' + index} activeOpacity={0.8} onPress={() => {
                                    let arr = [];
                                    Object.keys(s.value).map(key => arr.push({key: key, value: s.value[key]}));
                                    this.setState({showSeg: s.key, statValue: arr})

                                }} style={{
                                    width: (width - 39) / 4,
                                    backgroundColor: this.state.showSeg === s.key ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderColor: UI.COLORS_HEX.blue,
                                    borderRightWidth: index === store.MatcheStatistics.length - 1 ? 0 : 1,
                                    height: 30,
                                    borderTopLeftRadius: index === 0 ? 6 : 0,
                                    borderBottomLeftRadius: index === 0 ? 6 : 0,
                                    borderTopRightRadius: index === store.MatcheStatistics.length - 1 ? 6 : 0,
                                    borderBottomRightRadius: index === store.MatcheStatistics.length - 1 ? 6 : 0,

                                }}>
                                    <Text
                                        style={{
                                            fontFamily: UI.FONT.regular,
                                            color: this.state.showSeg === s.key ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                            fontSize: 14,
                                            backgroundColor: 'transparent'
                                        }}>{s.key.toUpperCase()}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>


                    <View style={{
                        width: width - 30,
                        borderRadius: 6,
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                        marginTop: 10,
                    }}>
                        <LinearGradient
                            start={{x: 0.5, y: 0}}
                            end={{x: 0.5, y: 1}}
                            locations={[0, 0.45]}
                            colors={["#999999", "#000000"]}
                            style={{
                                width: width - 30,
                                borderRadius: 6,
                                shadowColor: 'black',
                                shadowOffset: {width: 0, height: 0},
                                shadowOpacity: 0.7,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0
                            }}/>
                        <View style={{
                            flex: 0.42,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 5
                        }}>
                            <Text style={{
                                fontFamily: UI.FONT.bold,
                                color: UI.COLORS_HEX.white,
                                fontSize: 18,
                            }} numberOfLines={2}>
                                {store.Match.player1.replace('+', ' / ')}
                            </Text>
                        </View>
                        <View style={{
                            flex: 0.15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 5
                        }}>
                            <Text style={{
                                fontFamily: UI.FONT.bold,
                                color: UI.COLORS_HEX.white,
                                fontSize: 24,
                            }}>
                                VS
                            </Text>
                        </View>
                        <View style={{
                            flex: 0.42,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 5
                        }}>
                            <Text style={{
                                fontFamily: UI.FONT.bold,
                                color: UI.COLORS_HEX.white,
                                fontSize: 18,
                            }} numberOfLines={2}>
                                {store.Match.player2.replace('+', ' / ')}
                            </Text>
                        </View>
                    </View>

                    {this.state.statValue && <FlatList data={this.state.statValue}
                                                       keyExtractor={(item, index) => 'Match' + index}
                                                       renderItem={this.renderItem}


                    />}


                </View>

                {this.state.isLoading && <Loading/>}

            </View>
        )


    }
}