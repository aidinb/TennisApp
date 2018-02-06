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

let {height, width} = Dimensions.get('window');
import UI from '../assets/UI';
import CButton from '../components/CButton';
import CTextInput from '../components/CTextInput';
import CCheckbox from '../components/CCheckbox'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PersonRow from "../components/PersonRow";

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

        store.setService('A. Kleijsen')
    }

    componentWillUnmount() {

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

                <Navbar title={'Partij instellingen'} leftBtnTitle={this.props.backTitle} onPressLeftBtn={() => navigator.pop({
                    animated: true,
                    animationType: 'fade',
                })}/>
                <PersonRow title={'RG Sports Open 2018'}/>


                <ScrollView contentContainerStyle={{paddingBottom: 70}}>
                    <View
                        style={{width: width, padding: 15, flexDirection: 'row', alignItems: 'center', marginTop: 0}}>

                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 17,
                                marginTop: -3,
                                flex: 1
                            }}>Categorie</Text>

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
                                alignItems: 'center'
                            }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.gray,
                                    fontSize: 16,
                                }}>DE5</Text>
                        </View>
                    </View>

                    <View
                        style={{width: width, padding: 15, flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>

                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 17,
                                marginTop: -3,
                                flex: 1
                            }}>Spelers</Text>
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
                                    height: 24,
                                    borderRadius: 6,
                                    borderColor: UI.COLORS_HEX.blue,
                                    borderWidth: 0.5,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    paddingLeft: 15,
                                    paddingRight: 15
                                }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        marginTop: -3,
                                    }}>A. Kleijsen</Text>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        marginTop: -3,
                                    }}>M. Luschen</Text>
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
                                }}>

                            </View>
                            <View style={{
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                                backgroundColor: UI.COLORS_HEX.white,
                                position: 'absolute',
                                top: 7,
                                left: (width / 2 + 50) / 2 - 16,
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
                    </View>


                    <TouchableOpacity activeOpacity={0.8} onPress={() => {

                        if(Platform.OS === 'ios'){
                            navigator.showLightBox({
                                screen: 'KiesCat',
                                style: {
                                    backgroundBlur: "dark",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {
                                    onSelectKies: (e) => {
                                        navigator.dismissLightBox();
                                        store.setBaan(e)
                                    }
                                }
                            })
                        }else{
                            navigator.showModal({
                                screen: 'KiesCat',
                                animationType: 'slide-up',
                                navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                passProps: {
                                    onSelectKies: (e) => {
                                        navigator.dismissModal({
                                            animationType: 'slide-down'
                                        });
                                        store.setBaan(e)
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
                                          paddingBottom:7
                                      }}>

                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 17,
                                marginTop: -3,
                                flex: 1
                            }}>Kies een baan</Text>
                        {store.Baan !== '' && <Text style={{
                            fontFamily: UI.FONT.regular,
                            color: UI.COLORS_HEX.white,
                            fontSize: 17,
                            marginTop: -3,
                            flex: 1
                        }}>{store.Baan}</Text>}
                        <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>

                    </TouchableOpacity>


                    <View
                        style={{width: width, padding: 15, flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>

                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 16,
                                marginTop: -3,
                                flex: 1
                            }}>Wie serveert</Text>

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
                                    this.setState({wie: true});
                                store.setService('A. Kleijsen');
                            }} style={{
                                width: (width / 2 + 50) / 2,
                                backgroundColor: this.state.wie === true ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopLeftRadius: 6,
                                borderBottomLeftRadius: 6,
                                height: 24
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: this.state.wie === true ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        backgroundColor: 'transparent'
                                    }}>A. Kleijsen</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                    this.setState({wie: false})
                                store.setService('M. Luschen');

                            }} style={{
                                width: (width / 2 + 50) / 2,
                                backgroundColor: this.state.wie === false ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopRightRadius: 6,
                                borderBottomRightRadius: 6,
                                height: 24
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: this.state.wie === false ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        backgroundColor: 'transparent'

                                    }}>M. Luschen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View
                        style={{width: width, padding: 15, flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>

                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 16,
                                marginTop: -3,
                                flex: 1
                            }}>Kies spelvorm</Text>

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
                                    }}>Deuce</Text>
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

                                    }}>Beslissend punt</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View
                        style={{width: width, padding: 15, flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>

                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 16,
                                marginTop: -3,
                                flex: 1
                            }}>Inspeeltijd</Text>

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

                                    this.setState({ins: true})

                            }} style={{
                                width: (width / 2 + 50) / 2,
                                backgroundColor: this.state.ins === true ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopLeftRadius: 6,
                                borderBottomLeftRadius: 6,
                                height: 24
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: this.state.ins === true ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        backgroundColor: 'transparent'
                                    }}>Klok uit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {

                                    this.setState({ins: false})

                            }} style={{
                                width: (width / 2 + 50) / 2,
                                backgroundColor: this.state.ins === false ? UI.COLORS_HEX.blue : UI.COLORS_HEX.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopRightRadius: 6,
                                borderBottomRightRadius: 6,
                                height: 24
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: this.state.ins === false ? UI.COLORS_HEX.white : UI.COLORS_HEX.gray,
                                        fontSize: 14,
                                        backgroundColor: 'transparent'

                                    }}>Klok aan</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                   <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
                       <CButton title={'Start'} backgroundColor={UI.COLORS_HEX.blue}
                                color={UI.COLORS_HEX.white}
                                width={width/2+50}
                                onPress={() => {
                                    if(store.Services === true){
                                        navigator.push({
                                            screen: 'StartMatch',
                                            navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                            animationType: 'fade',
                                            passProps: {backTitle: 'Set up'}
                                        })
                                    }else {
                                        navigator.push({
                                            screen: 'Services',
                                            navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                            animationType: 'fade',
                                            passProps: {backTitle: 'Set up'}
                                        })
                                    }

                                }}/>
                   </View>

                </ScrollView>
                <Footer/>

            </View>
        )


    }
}