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
    Picker,
    Alert,
    CameraRoll
} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import LinearGradient from 'react-native-linear-gradient';
import UI from '../assets/UI';
import CButton from '../components/CButton';
import CTextInput from '../components/CTextInput';
import CCheckbox from '../components/CCheckbox'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PersonRow from "../components/PersonRow";
import Box from "../components/Box";
import {captureRef, captureScreen} from "react-native-view-shot";
import Loading from '../components/Loading'

const catsSource = {
    uri: "https://i.imgur.com/5EOyTDQ.jpg"
};
let {height, width} = Dimensions.get('window');

@inject("store") @observer
export default class Statics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showSeg: 'Partij',
            isLoading: false,
            value: {
                format: "png",
                quality: 0.9,
                result: "tmpfile",
                snapshotContentContainer: false
            }
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

    }

    componentWillUnmount() {

    }

    snapshot = () => {
        captureScreen(this.state.value).then(
            res => {
                console.log(res)
                this.setState({isLoading:true})
                CameraRoll.saveToCameraRoll(res, 'photo').then(() => {
                    this.setState({isLoading:false})

                    Alert.alert(
                        '',
                        'Screen Shot Successfully Added To Camera Roll',
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                    )
                })
            })
            .catch(
                error => (
                    console.warn(error)
                )
            );
    };

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

                <Navbar title={'Statistieken'} rightBtnColor={UI.COLORS_HEX.orange}
                        rightBtnTitle={'Deel'}
                        onPressRightBtn={() => this.snapshot()} leftBtnTitle={'Home'}
                        onPressLeftBtn={() => {
                            Alert.alert(
                                '',
                                'U gaat de partij verlaten, weet u het zeker?',
                                [
                                    {
                                        text: 'Yes', onPress: () => navigator.push({
                                        screen: 'Menu',
                                        navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                        animationType: 'fade',
                                        passProps: {backTitle: 'Kies Categorie'}
                                    })
                                    },
                                    {text: 'Cancel', onPress: () => console.log('OK Pressed')},
                                ],
                            )
                        }}/>


                <View
                    style={{width: width, padding: 15, alignItems: 'center', marginTop: 5}}>
                    <View style={{
                        width: width - 30,
                        flexDirection: 'row',
                        height: 35,
                    }}>
                        <View style={{
                            paddingLeft: 10,
                            justifyContent: 'center',
                            backgroundColor: UI.COLORS_HEX.gray,
                            borderRadius: 3,
                            flex: 0.7,
                            paddingRight: 10,


                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 20,
                                    marginTop: -2
                                }}>{store.Match.player1}</Text>
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
                                }}>{this.state.score11}</Text>
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
                                    color: this.state.score12 !== 0 ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white,
                                }}>{this.state.score12}</Text>
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
                                    color: UI.COLORS_HEX.white,
                                }}>{this.state.score13}</Text>
                            </View>

                        </View>
                    </View>

                    <View style={{
                        width: width - 30,
                        flexDirection: 'row',
                        height: 35,
                        marginTop: 3,

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
                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 20,
                                    marginTop: -2
                                }}>{store.Match.player2}</Text>
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
                                }}>{this.state.score21}</Text>
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
                                    color: UI.COLORS_HEX.white,
                                }}>{this.state.score22}</Text>
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
                                    color: this.state.score23 !== 0 ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white,
                                }}>{this.state.score23}</Text>
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
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 15,
                                marginTop: -3,
                            }}>Partij duur: </Text>
                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 15,
                                marginTop: -3,
                            }}>{store.EndTimeMatch} </Text>

                    </View>
                    <View
                        style={{
                            width: width - 40,
                            backgroundColor: UI.COLORS_HEX.white,
                            borderRadius: 6,
                            borderColor: UI.COLORS_HEX.blue,
                            borderWidth: 0.5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginTop: 10,
                            height: 30
                        }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            this.setState({showSeg: 'Partij'})

                        }} style={{
                            width: (width - 39) / 4,
                            backgroundColor: this.state.showSeg === 'Partij' ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: UI.COLORS_HEX.blue,
                            borderRightWidth: 1,
                            height: 30,
                            borderTopLeftRadius: 6,
                            borderBottomLeftRadius: 6,

                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: this.state.showSeg === 'Partij' ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                    fontSize: 14,
                                    backgroundColor: 'transparent'
                                }}>Partij</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            this.setState({showSeg: 'set1'})
                        }} style={{
                            width: (width - 39) / 4,
                            backgroundColor: this.state.showSeg === 'set1' ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: UI.COLORS_HEX.blue,
                            borderRightWidth: 1,
                            height: 30

                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: this.state.showSeg === 'set1' ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                    fontSize: 14,
                                    backgroundColor: 'transparent'

                                }}>Set 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            this.setState({showSeg: 'set2'})
                        }} style={{
                            width: (width - 39) / 4,
                            backgroundColor: this.state.showSeg === 'set2' ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: UI.COLORS_HEX.blue,
                            borderRightWidth: 1,
                            height: 30
                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: this.state.showSeg === 'set2' ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                    fontSize: 14,
                                    backgroundColor: 'transparent'

                                }}>Set 2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            this.setState({showSeg: 'set3'})
                        }} style={{
                            width: (width - 39) / 4,
                            backgroundColor: this.state.showSeg === 'set3' ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 30,
                            borderTopRightRadius: 6,
                            borderBottomRightRadius: 6,

                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: this.state.showSeg === 'set3' ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                    fontSize: 14,
                                    backgroundColor: 'transparent'

                                }}>Set 3</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={{paddingBottom: 70, alignItems: 'center', marginTop: 15}}>

                        <View style={{
                            width: width - 30,
                            height: 45,
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
                                    borderRadius: 6, height: 45,
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
                                fontSize: 20,
                            }}>
                                {store.Match.player1}
                            </Text>
                            <Text style={{
                                fontFamily: UI.FONT.bold,
                                color: UI.COLORS_HEX.white,
                                fontSize: 24,
                            }}>
                                VS
                            </Text>
                            <Text style={{
                                fontFamily: UI.FONT.bold,
                                color: UI.COLORS_HEX.white,
                                fontSize: 20,
                            }}>
                                {store.Match.player2}
                            </Text>
                        </View>

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
                                fontSize: 21,
                            }}>
                                3/5
                            </Text>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: (width - 30) / 2 + 20,
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
                                    Breakpunten gewonnen
                                </Text>
                            </View>
                            <Text style={{
                                fontFamily: UI.FONT.bold,
                                color: UI.COLORS_HEX.white,
                                fontSize: 21,
                            }}>
                                1/3
                            </Text>
                        </View>

                        <View style={{
                            width: width - 30,
                            height: 35,
                            borderRadius: 6,
                            justifyContent: 'space-around',
                            flexDirection: 'row',
                            marginTop: 5
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
                                fontSize: 21,
                            }}>
                                80
                            </Text>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: (width - 30) / 2 + 20,
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
                                    % Punt op service
                                </Text>
                            </View>
                            <Text style={{
                                fontFamily: UI.FONT.bold,
                                color: UI.COLORS_HEX.white,
                                fontSize: 21,
                            }}>
                                77
                            </Text>
                        </View>
                    </ScrollView>

                </View>
                <Footer/>

                {this.state.isLoading && <Loading/>}

            </View>
        )


    }
}