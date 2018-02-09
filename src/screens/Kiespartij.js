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
export default class Kiespartij extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tourney: '',
            party: '3',
            show: ''
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
                <Navbar title={'Kies Categorie'} rightBtnColor={UI.COLORS_HEX.orange}
                        leftBtnTitle={this.props.backTitle} onPressLeftBtn={() => navigator.pop({
                    animated: true,
                    animationType: 'fade',
                })}/>
                <PersonRow title={'RG Sports Open 2018'}/>

                <View style={{
                    borderColor: UI.COLORS_HEX.gray,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    marginTop: 10
                }}>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigator.push({
                        screen: 'DamesEnkel',
                        navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                        animationType: 'fade',
                        passProps: {backTitle: 'Categorie'}
                    })} style={{
                        width: width,
                        flexDirection: 'row',
                        padding: 20,
                        justifyContent: 'space-between',
                        paddingTop: 0,
                        borderColor: UI.COLORS_HEX.white,
                        alignItems: 'center',
                        paddingBottom: 0,
                        height: 50,
                        backgroundColor: UI.COLORS_HEX.lightBlack
                    }}>
                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 17,
                            }}>Dames enkel 35+</Text>
                        <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigator.push({
                        screen: 'DamesEnkel',
                        navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                        animationType: 'fade',
                        passProps: {backTitle: 'Categorie'}
                    })} style={{
                        width: width,
                        flexDirection: 'row',
                        padding: 20,
                        justifyContent: 'space-between',
                        paddingTop: 0,
                        borderColor: UI.COLORS_HEX.white,
                        borderTopWidth: 0.5,
                        alignItems: 'center',
                        paddingBottom: 0,
                        height: 50,
                        backgroundColor: UI.COLORS_HEX.lightBlack
                    }}>
                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 17,
                            }}>Heren dubbel</Text>
                        <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigator.push({
                        screen: 'DamesEnkel',
                        navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                        animationType: 'fade',
                        passProps: {backTitle: 'Categorie'}
                    })} style={{
                        width: width,
                        flexDirection: 'row',
                        padding: 20,
                        justifyContent: 'space-between',
                        paddingTop: 0,
                        borderColor: UI.COLORS_HEX.white,
                        borderTopWidth: 0.5,
                        alignItems: 'center',
                        paddingBottom: 0,
                        height: 50,
                        backgroundColor: UI.COLORS_HEX.lightBlack
                    }}>
                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 17,
                            }}>Dames enkel</Text>
                        <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>
                    </TouchableOpacity>
                </View>


                <Footer/>


            </View>
        )


    }
}