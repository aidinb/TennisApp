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
import Box from "../components/Box";

@inject("store") @observer
export default class SlagType extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            foreHand: true,
            backHand: true,
            slag: true,
            drop: false,
            smash: false,
            ground: false,
            lob: false,
            volley: false,


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

                <Navbar title={'Wedstrijd ' + store.Baan} rightBtnColor={UI.COLORS_HEX.orange} rightBtnTitle={'Bewerk'}
                        onPressRightBtn={() => alert('Start')} leftBtnTitle={'Undo'}
                        onPressLeftBtn={() => navigator.pop({
                            animated: true,
                            animationType: 'fade',
                        })}/>


                <ScrollView contentContainerStyle={{paddingBottom: 70, alignItems: 'center'}}>
                    <View
                        style={{width: width, padding: 15, alignItems: 'center', marginTop: 5}}>

                        <View style={{
                            width: width - 70,
                            backgroundColor: UI.COLORS_HEX.gray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            borderRadius: 5,
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 18,
                                    marginTop: -3,
                                }}>Slag</Text>
                            {this.state.slag === false && <View style={{
                                backgroundColor: UI.COLORS_HEX.whiteBoxBlur,
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                borderRadius: 5,

                            }}/>}
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: width - 90,

                        }}>
                            <Box title={'Fore-\nhand'} colors={['#00914C', '#00A550', '#64C08A']}
                                 onPress={() => {
                                     this.setState({
                                         slag: false,
                                         backHand: false,
                                         drop: true,
                                         smash: true,
                                         ground: true,
                                         lob: true,
                                         volley: true,
                                         foreHand:true
                                     })
                                 }}
                                 selected={this.state.foreHand}/>
                            <Box title={'Back-\nhand'} colors={['#0095DA', '#00AEEE', '#2BC4F3']}
                                 onPress={() => this.setState({
                                     slag: false,
                                     foreHand: false,
                                     drop: true,
                                     smash: true,
                                     ground: true,
                                     lob: true,
                                     volley: true,
                                     backHand:true
                                 })}
                                 selected={this.state.backHand}/>
                        </View>
                    </View>

                    <View style={{
                        width: width - 70,
                        backgroundColor: UI.COLORS_HEX.gray,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 30,
                        borderRadius: 5,
                        marginTop: 5
                    }}>
                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 18,
                                marginTop: -3,
                            }}>Type Slag</Text>
                    </View>
                    <View style={{
                        width: width - 60,
                        flexDirection: 'row',
                        justifyContent: 'space-around'

                    }}>
                        <View style={{
                            justifyContent: 'space-between',

                        }}>
                            <Box title={'Drop-\nshot'} colors={['#FAAC18', '#FFCA05', '#FFE7A3']}
                                 onPress={() => {
                                     navigator.push({
                                         screen: 'MatchResult',
                                         navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                         animationType: 'fade',
                                         passProps: {backTitle: 'Undo'}
                                     })
                                 }}
                                 selected={this.state.drop}/>
                            <Box title={'Smash'} colors={['#C7B299', '#C7B299', '#C7B299']}
                                 onPress={() => alert('hi')}
                                 selected={this.state.smash}/>
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center'

                        }}>
                            <Box title={'Ground-\nstroke'} colors={['#666666', '#808080', '#999999']}
                                 onPress={() => navigator.push({
                                     screen: 'Services',
                                     navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                     animationType: 'fade',
                                     passProps: {backTitle: 'Undo'}
                                 })}
                                 selected={this.state.ground}/>
                        </View>
                        <View style={{
                            justifyContent: 'space-between',

                        }}>
                            <Box title={'Lob'} colors={['#CD118C', '#EB008B', '#F074AC']}
                                 onPress={() => {
                                 }}
                                 selected={this.state.lob}/>
                            <Box title={'Volley'} colors={['#93278F', '#93278F', '#93278F']}
                                 onPress={() => alert('hi')}
                                 selected={this.state.volley}/>
                        </View>
                    </View>
                </ScrollView>
                <Footer/>

            </View>
        )


    }
}