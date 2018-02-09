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
    Switch
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
export default class Setting extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            punten: true,
            service: false,
            winner: false,
            slag: false,
            type: false,
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
        const {store, navigator} = this.props;

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
                <Navbar title={'Setting'} rightBtnTitle={'Save'} onPressRightBtn={() => {
                    navigator.push({
                        screen: 'Tourney',
                        navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                        animationType: 'fade',
                        passProps: {backTitle: 'Setting'}

                    })
                }} leftBtnTitle={this.props.backTitle} onPressLeftBtn={() => navigator.push({
                    screen: 'Menu',
                    navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                    animationType: 'fade',

                })}/>

                <PersonRow title={'Hanneke Siemens'}/>
                <ScrollView contentContainerStyle={{paddingBottom: 70}}>
                    <View style={{width: width, padding: 20}}>
                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 16,
                            }}>Geef in deze stap aan wat je aan statistieken wilt
                            terug zien. Kies daarna voor “Save”.</Text>
                    </View>

                    <View style={{
                        width: width,
                        padding: 20,
                        backgroundColor: UI.COLORS_HEX.gray,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingTop: 6,
                        paddingBottom: 6,
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 16,
                            }}>Punten teller</Text>
                        <Switch style={{transform: [{scaleX: .8}, {scaleY: .8}]}} onTintColor={UI.COLORS_HEX.orange}
                                tintColor={Platform.OS === 'ios' ? UI.COLORS_HEX.orange : UI.COLORS_HEX.lightGray}
                                thumbTintColor={'white'} onValueChange={(val) => this.setState({punten: val})}
                                value={this.state.punten}/>
                    </View>

                    <View style={{
                        width: width,
                        padding: 20,
                        backgroundColor: UI.COLORS_HEX.gray,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingTop: 6,
                        paddingBottom: 6,
                        alignItems: 'center',
                        marginTop: 10
                    }}>
                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 16,
                            }}>Service</Text>
                        <Switch style={{transform: [{scaleX: .8}, {scaleY: .8}]}} onTintColor={UI.COLORS_HEX.orange}
                                tintColor={Platform.OS === 'ios' ? UI.COLORS_HEX.orange : UI.COLORS_HEX.lightGray}
                                thumbTintColor={'white'} onValueChange={(val) => store.HasService=val}
                                value={store.HasService}/>
                    </View>

                    <View style={{
                        width: width,
                        padding: 20,
                        backgroundColor: UI.COLORS_HEX.gray,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingTop: 6,
                        paddingBottom: 6,
                        alignItems: 'center',
                        marginTop: 10
                    }}>
                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 16,
                            }}>Winner, (Un)forced Error</Text>
                        <Switch style={{transform: [{scaleX: .8}, {scaleY: .8}]}} onTintColor={UI.COLORS_HEX.orange}
                                tintColor={Platform.OS === 'ios' ? UI.COLORS_HEX.orange : UI.COLORS_HEX.lightGray}
                                thumbTintColor={'white'} onValueChange={(val) => store.HasWinner=val}
                                value={store.HasWinner}/>
                    </View>
                    <View style={{
                        width: width,
                        padding: 20,
                        backgroundColor: UI.COLORS_HEX.gray,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingTop: 6,
                        paddingBottom: 6,
                        alignItems: 'center',
                        marginTop: 10
                    }}>
                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 16,
                            }}>Type slag</Text>
                        <Switch style={{transform: [{scaleX: .8}, {scaleY: .8}]}} onTintColor={UI.COLORS_HEX.orange}
                                tintColor={Platform.OS === 'ios' ? UI.COLORS_HEX.orange : UI.COLORS_HEX.lightGray}
                                thumbTintColor={'white'} onValueChange={(val) => store.HasStroke=val}
                                value={store.HasStroke}/>
                    </View>
                </ScrollView>
                <Footer/>


            </View>
        )


    }
}