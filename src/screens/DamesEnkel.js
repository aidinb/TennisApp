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
import UI from '../assets/UI';
import CButton from '../components/CButton';
import CTextInput from '../components/CTextInput';
import CCheckbox from '../components/CCheckbox'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PersonRow from "../components/PersonRow";
import Loading from '../components/Loading'

let {height, width} = Dimensions.get('window');

@inject("store") @observer
export default class DamesEnkel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false

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
        this.setState({isLoading: true})
        store.getMatches().then(()=>{
            this.setState({isLoading: false})
            console.log(store.Matches)
        })
    }

    componentWillUnmount() {

    }
    renderItem=({item,index})=>{
        const {store, navigator} = this.props;
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                store.setMatch(item)
                navigator.push({
                screen: 'SetUpWedstrijd',
                navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                animationType: 'fade',
                passProps: {backTitle: 'kies partij'}
            })}} style={{
                width: width,
                flexDirection: 'row',
                padding: 20,
                justifyContent: 'space-between',
                paddingTop: 0,
                borderColor: UI.COLORS_HEX.white,
                borderTopWidth: index===0?0:0.5,
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
                    }}>{this.props.cat+' '+item.player1+' vs '+item.player2}</Text>
                <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>
            </TouchableOpacity>
        )
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
                <Navbar title={this.props.title} leftBtnTitle={this.props.backTitle} onPressLeftBtn={() => navigator.push({
                    screen: 'Kiespartij',
                    navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                    animationType: 'fade',
                    passProps: {backTitle: 'Toernooi'}

                })}/>

                <PersonRow title={store.TournamentByNumber.name}/>
                <View style={{
                    borderColor: UI.COLORS_HEX.gray,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    marginTop: 10
                }}>
                    {store.Matches&&<FlatList data={store.Matches}
                                              keyExtractor={(item, index) => 'Match'+item.id}
                                              renderItem={this.renderItem}
                    />}

                </View>
                <Footer/>
                {this.state.isLoading && <Loading/>}


            </View>
        )


    }
}