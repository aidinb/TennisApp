import React from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform,
    StyleSheet,
    Alert
} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import UI from '../assets/UI';
import CButton from '../components/CButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Navbar from '../components/Navbar';
import PersonRow from "../components/PersonRow";
import BackImage from "../components/BackImage";

let {height, width} = Dimensions.get('window');

@inject("store") @observer
export default class SetUpWedstrijd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wie: true,
            kies1: 0,
            kies2: 0,
            ins: false,
        };
    }

    componentDidMount() {
        const {navigator, store} = this.props;
        store.setService(1)
        this.setState({kies1: store.Match.short_game, kies2: store.Match.super_tie_break})
        store.Court = '';
        store.MatcheDet=[];
        store.getMatcheDet(store.Match.id);
    }


    onStartPress = () => {
        const {navigator, store} = this.props;
        store.Play = [];
        store.MatcheDet = [];

        if (store.Court !== '') {
            store.getMatcheDet(store.Match.id).then(() => {
                if (store.MatcheDet.start_time === null) {
                    store.startMatch(store.Match.id, {
                        player1: store.Match.player1,
                        player2: store.Match.player2,
                        server: store.Service,
                        court_id: store.Court.id,
                        short_game: this.state.kies1,
                        super_tie_break: this.state.kies2,
                    });
                    store.Play = [];
                    if (store.HasService === false) {
                        navigator.push({
                            screen: 'StartMatch',
                            navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                            animationType: 'fade',
                            passProps: {backTitle: 'Set up'}
                        })
                    } else {
                        navigator.push({
                            screen: 'Services',
                            navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                            animationType: 'fade',
                            passProps: {backTitle: 'Set up'}
                        })
                    }
                } else {
                    if (store.MatcheDet.winner === 0) {
                        store.Play = store.MatcheDet;
                        store.setService(store.MatcheDet.now_serving)
                        if (store.HasService === false) {
                            navigator.push({
                                screen: 'StartMatch',
                                navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                animationType: 'fade',
                                passProps: {backTitle: 'Set up'}
                            })
                        } else {
                            navigator.push({
                                screen: 'Services',
                                navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                animationType: 'fade',
                                passProps: {backTitle: 'Set up'}
                            })
                        }
                    } else {
                        alert('Wedstrijd is al gespeeld')
                    }


                }
            })


        } else {
            Alert.alert(
                '',
                'Kies eerst een baan',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
            )
        }
    }

    render() {
        const {navigator, store} = this.props;
        const player1 = store.Match.player1.split('+');
        const player2 = store.Match.player2.split('+');

        return (
            <View style={{flex: 1}}>
                <BackImage/>


                <Navbar title={'Partij instellingen'} leftBtnTitle={this.props.backTitle}
                        onPressLeftBtn={() => navigator.pop()}/>
                <PersonRow title={store.TournamentByNumber.name}/>


                <ScrollView contentContainerStyle={{paddingBottom: 70}}>
                    <View
                        style={{width: width, padding: 15, flexDirection: 'row', alignItems: 'center', marginTop: 0}}>
                        <Text
                            style={styles.titleText}>Categorie</Text>
                        <View
                            style={{
                                width: width / 2 + 50,
                                backgroundColor: UI.COLORS_HEX.white,
                                borderRadius: 6,
                                borderColor: UI.COLORS_HEX.blue,
                                borderWidth: 0.5,
                                shadowColor: UI.COLORS_HEX.blue,
                                shadowOffset: {width: 0, height: 0},
                                shadowOpacity: 0.7,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 3,
                                height: 28

                            }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.gray,
                                    fontSize: 16,
                                }}>{this.props.category}</Text>
                        </View>
                    </View>

                    <View
                        style={{width: width, padding: 15, flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>

                        <Text
                            style={styles.titleText}>Spelers</Text>
                        <View style={{
                            shadowColor: UI.COLORS_HEX.blue,
                            shadowOffset: {width: 0, height: 0},
                            shadowOpacity: 0.7,
                            backgroundColor: 'white',
                            elevation: 5,
                            flexDirection: 'row',
                            borderColor: UI.COLORS_HEX.blue,
                            borderWidth: 0.5,
                            width: width / 2 + 50,
                            borderRadius: 6,
                        }}>
                            <View style={{
                                flex: 0.40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 5,
                                backgroundColor: UI.COLORS_HEX.white,
                                borderTopLeftRadius: 6,
                                borderBottomLeftRadius: 6,
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        marginTop: -3,
                                        textAlign: 'center',
                                        flex: 0.15,
                                    }} numberOfLines={1}>{player1[0]}</Text>
                                {player1.length > 1 && <View><Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        marginTop: -3,
                                        textAlign: 'center',
                                        flex: 0.15,
                                    }} numberOfLines={1}>{player1[1]}</Text></View>}
                            </View>
                            <View style={{
                                flex: 0.20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 5,
                                backgroundColor: UI.COLORS_HEX.white,
                            }}>
                                <View style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 16,
                                    backgroundColor: UI.COLORS_HEX.white,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderColor: UI.COLORS_HEX.blue,
                                    borderWidth: 1,
                                    shadowColor: UI.COLORS_HEX.gray,
                                    shadowOffset: {width: 0, height: 0},
                                    shadowOpacity: 0.3,
                                    elevation: 5,
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: UI.FONT.regular,
                                            color: UI.COLORS_HEX.gray,
                                            fontSize: 16,
                                            marginTop: -3,
                                        }}>vs</Text>
                                </View>
                            </View>
                            <View style={{
                                flex: 0.40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 5,
                                backgroundColor: UI.COLORS_HEX.white,
                                borderTopRightRadius: 6,
                                borderBottomRightRadius: 6,
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        marginTop: -3,
                                        textAlign: 'center',
                                        flex: 0.15,

                                    }} numberOfLines={1}>{player2[0]}</Text>
                                {player2.length > 1 && <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        marginTop: -3,
                                        textAlign: 'center',
                                        flex: 0.15,

                                    }} numberOfLines={1}>{player2[1]}</Text>}
                            </View>

                        </View>
                    </View>


                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                        if (Platform.OS === 'ios') {
                            navigator.showLightBox({
                                screen: 'KiesCat',
                                style: {
                                    backgroundBlur: "dark",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {
                                    onSelectKies: (e) => {
                                        navigator.dismissLightBox();
                                        store.setCourt(e)
                                    }
                                }
                            })
                        } else {
                            navigator.showModal({
                                screen: 'KiesCat',
                                animationType: 'slide-up',
                                navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                passProps: {
                                    onSelectKies: (e) => {
                                        navigator.dismissModal({
                                            animationType: 'slide-down'
                                        });
                                        store.setCourt(e)
                                    }
                                }
                            });
                        }
                    }}
                                      style={{
                                          width: width,
                                          padding: 15,
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          paddingTop: 0,
                                          paddingBottom: 7
                                      }}>

                        <Text
                            style={styles.titleText}>Kies een baan</Text>
                        {store.Court !== '' && <Text style={{
                            fontFamily: UI.FONT.regular,
                            color: UI.COLORS_HEX.white,
                            fontSize: 17,
                            marginTop: -3,
                            flex: 1
                        }}>{store.Court.name}</Text>}
                        <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>

                    </TouchableOpacity>


                    <View
                        style={{width: width, padding: 15, flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>
                        <Text
                            style={styles.titleText}>Wie serveert</Text>
                        <View
                            style={{
                                width: width / 2 + 50,
                                backgroundColor: UI.COLORS_HEX.white,
                                borderRadius: 6,
                                borderColor: UI.COLORS_HEX.blue,
                                borderWidth: 0.5,
                                shadowColor: UI.COLORS_HEX.blue,
                                shadowOffset: {width: 0, height: 0},
                                shadowOpacity: 0.7,
                                justifyContent: 'center',
                                alignItems: 'stretch',
                                flexDirection: 'row',
                                height: 28

                            }}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                this.setState({wie: true});
                                store.setService(1);
                            }} style={{
                                width: (width / 2 + 50) / 2,
                                backgroundColor: this.state.wie === true ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopLeftRadius: 6,
                                borderBottomLeftRadius: 6,
                                padding: 5,
                                height: 28

                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: this.state.wie === true ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        backgroundColor: 'transparent',
                                        textAlign: 'center'
                                    }} numberOfLines={1}>{store.Match.player1.replace('+', ' ')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                this.setState({wie: false})
                                store.setService(2);
                            }} style={{
                                width: (width / 2 + 50) / 2,
                                backgroundColor: this.state.wie === false ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopRightRadius: 6,
                                borderBottomRightRadius: 6,
                                padding: 5,
                                height: 28

                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: this.state.wie === false ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        backgroundColor: 'transparent',
                                        textAlign: 'center',

                                    }} numberOfLines={1}>{store.Match.player2.replace('+', ' ')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View
                        style={{width: width, padding: 15, flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>

                        <Text
                            style={styles.titleText}>Kies spelvorm</Text>

                        <View
                            style={{
                                width: width / 2 + 50,
                                backgroundColor: UI.COLORS_HEX.white,
                                borderRadius: 6,
                                borderColor: UI.COLORS_HEX.blue,
                                borderWidth: 0.5,
                                shadowColor: UI.COLORS_HEX.blue,
                                shadowOffset: {width: 0, height: 0},
                                shadowOpacity: 0.7,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                height: 28

                            }}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                this.setState({kies1: 0})

                            }} style={{
                                width: (width / 2 + 50) / 2,
                                backgroundColor: this.state.kies1 === 0 ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopLeftRadius: 6,
                                borderBottomLeftRadius: 6,
                                height: 28

                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: this.state.kies1 === 0 ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        backgroundColor: 'transparent'
                                    }}>Deuce</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {

                                this.setState({kies1: 1})

                            }} style={{
                                width: (width / 2 + 50) / 2,
                                backgroundColor: this.state.kies1 === 1 ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopRightRadius: 6,
                                borderBottomRightRadius: 6,
                                height: 28
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: this.state.kies1 === 1 ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        backgroundColor: 'transparent'

                                    }}>Beslissend punt</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        width: width,
                        padding: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: 0,
                        justifyContent: 'flex-end'
                    }}>
                        <View
                            style={{
                                width: width / 2 + 50,
                                backgroundColor: UI.COLORS_HEX.white,
                                borderRadius: 6,
                                borderColor: UI.COLORS_HEX.blue,
                                borderWidth: 0.5,
                                shadowColor: UI.COLORS_HEX.blue,
                                shadowOffset: {width: 0, height: 0},
                                shadowOpacity: 0.7,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                height: 28

                            }}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                this.setState({kies2: 0})

                            }} style={{
                                width: (width / 2 + 50) / 2,
                                backgroundColor: this.state.kies2 === 0 ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopLeftRadius: 6,
                                borderBottomLeftRadius: 6,
                                height: 28

                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: this.state.kies2 === 0 ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        backgroundColor: 'transparent'
                                    }}>Derde set</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                this.setState({kies2: 1})

                            }} style={{
                                width: (width / 2 + 50) / 2,
                                backgroundColor: this.state.kies2 === 1 ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopRightRadius: 6,
                                borderBottomRightRadius: 6,
                                height: 28

                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: this.state.kies2 === 1 ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        backgroundColor: 'transparent'

                                    }}>Super tiebreak</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                        <CButton title={'Start'} backgroundColor={UI.COLORS_HEX.blue}
                                 color={UI.COLORS_HEX.white}
                                 width={width / 2 + 50}
                                 onPress={this.onStartPress}/>
                    </View>

                </ScrollView>

            </View>
        )


    }
}

const styles = StyleSheet.create({
    titleText: {
        fontFamily: UI.FONT.regular,
        color: UI.COLORS_HEX.white,
        fontSize: 16,
        marginTop: -3,
        flex: 1
    },
});