import React from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform,
    StyleSheet,
} from 'react-native';
import {inject, observer} from 'mobx-react/native';

import UI from '../assets/UI';
import CButton from '../components/CButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../components/Footer';
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
            kies1: false,
            kies2: true,
            ins: false,
        };
    }

    componentDidMount() {
        const {navigator, store} = this.props;
        store.setService(1)
    }


    onStartPress = () => {
        const {navigator, store} = this.props;
store.Play=[];
        // store.createMatch({
        //     category_id:store.Category.id,
        //     court_id:store.Court.id,
        //     player1:store.Match.player1,
        //     player2:store.Match.player2,
        //     server:store.Service===store.Match.player1?1:2,
        //     short_game:!this.state.kies1,
        //     super_tie_break:!this.state.kies2,
        //     clock:0,
        // }).then(() => {
        //     console.log(store.CreateMatch)
        // })

        if (store.Court !== '') {
            store.startMatch(store.Match.id);
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
            alert('Please choose kies een baan')
        }
    }

    render() {
        const {navigator, store} = this.props;
        return (
            <View style={{flex: 1}}>
                <BackImage/>
                <View style={[UI.absoluteView,{
                    backgroundColor: 'rgba(0,0,0,0.8)'
                }]}/>

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
                                padding:3
                            }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.gray,
                                    fontSize: 16,
                                }}>{store.Category.name}</Text>
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
                            backgroundColor: 'transparent',
                            elevation: 5,
                        }}>

                            <View
                                style={{
                                    width: width / 2 + 50,
                                    backgroundColor: UI.COLORS_HEX.white,
                                    borderRadius: 6,
                                    borderColor: UI.COLORS_HEX.blue,
                                    borderWidth: 0.5,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}>
                                <View style={{
                                    flex: 0.50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 5
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: UI.FONT.regular,
                                            color: UI.COLORS_HEX.gray,
                                            fontSize: 14,
                                            marginTop: -3,
                                            textAlign: 'center'
                                        }}>{store.Match.player1}</Text>
                                </View>
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
                                <View style={{
                                    flex: 0.50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 5
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: UI.FONT.regular,
                                            color: UI.COLORS_HEX.gray,
                                            fontSize: 14,
                                            marginTop: -3,
                                            textAlign: 'center'
                                        }}>{store.Match.player2}</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    width: width / 2 + 50,
                                    backgroundColor: UI.COLORS_HEX.white,
                                    height: 24,
                                    borderRadius: 6,
                                    borderColor: UI.COLORS_HEX.blue,
                                    borderWidth: 0.5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}/>
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
                                flex:1
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: this.state.wie === true ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        backgroundColor: 'transparent',
                                        textAlign: 'center'
                                    }}>{store.Match.player1}</Text>
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
                                flex:1
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: this.state.wie === false ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        backgroundColor: 'transparent',
                                        textAlign: 'center',

                                    }}>{store.Match.player2}</Text>
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
                                height: 24,
                                borderRadius: 6,
                                borderColor: UI.COLORS_HEX.blue,
                                borderWidth: 0.5,
                                shadowColor: UI.COLORS_HEX.blue,
                                shadowOffset: {width: 0, height: 0},
                                shadowOpacity: 0.7,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                this.setState({kies1: true})

                            }} style={{
                                width: (width / 2 + 50) / 2,
                                backgroundColor: this.state.kies1 === true ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopLeftRadius: 6,
                                borderBottomLeftRadius: 6,
                                height: 24
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: this.state.kies1 === true ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        backgroundColor: 'transparent'
                                    }}>Deuce</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {

                                this.setState({kies1: false})

                            }} style={{
                                width: (width / 2 + 50) / 2,
                                backgroundColor: this.state.kies1 === false ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopRightRadius: 6,
                                borderBottomRightRadius: 6,
                                height: 24
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: this.state.kies1 === false ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
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
                        paddingTop: 5,
                        justifyContent: 'flex-end'
                    }}>


                        <View
                            style={{
                                width: width / 2 + 50,
                                backgroundColor: UI.COLORS_HEX.white,
                                height: 24,
                                borderRadius: 6,
                                borderColor: UI.COLORS_HEX.blue,
                                borderWidth: 0.5,
                                shadowColor: UI.COLORS_HEX.blue,
                                shadowOffset: {width: 0, height: 0},
                                shadowOpacity: 0.7,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                this.setState({kies2: true})

                            }} style={{
                                width: (width / 2 + 50) / 2,
                                backgroundColor: this.state.kies2 === true ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopLeftRadius: 6,
                                borderBottomLeftRadius: 6,
                                height: 24
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: this.state.kies2 === true ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        backgroundColor: 'transparent'
                                    }}>Derde set</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                this.setState({kies2: false})

                            }} style={{
                                width: (width / 2 + 50) / 2,
                                backgroundColor: this.state.kies2 === false ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopRightRadius: 6,
                                borderBottomRightRadius: 6,
                                height: 24
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: this.state.kies2 === false ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
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
                <Footer/>

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