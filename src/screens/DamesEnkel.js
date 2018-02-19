import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    FlatList,
} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import UI from '../assets/UI';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PersonRow from "../components/PersonRow";
import Loading from '../components/Loading';
import BackImage from '../components/BackImage';

let {height, width} = Dimensions.get('window');

@inject("store") @observer
export default class DamesEnkel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false

        };
    }

    componentDidMount() {
        const {store, navigator} = this.props;
        this.setState({isLoading: true})
        store.getMatches(store.TournamentId,this.props.catId).then(() => {
            this.setState({isLoading: false})
            console.log('====matches====')
            console.log(store.Matches)
        })
    }


    renderItem = ({item, index}) => {
        const {store, navigator} = this.props;
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                store.setMatch(item)
                navigator.push({
                    screen: 'SetUpWedstrijd',
                    navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                    animationType: 'fade',
                    passProps: {backTitle: 'kies partij'}
                })
            }} style={{
                width: width,
                flexDirection: 'row',
                padding: 20,
                justifyContent: 'space-between',
                paddingTop: 5,
                borderColor: UI.COLORS_HEX.white,
                borderTopWidth: index === 0 ? 0 : 0.5,
                alignItems: 'center',
                paddingBottom: 5,
                backgroundColor: UI.COLORS_HEX.lightBlack,
                paddingRight: 10
            }}>
                <Text
                    style={[UI.regularWhiteText25,{
                        fontSize: 17,
                        width: width - 55
                    }]}>{store.Category.name_short + ' ' + item.player1.replace('+',' ') + ' vs ' + item.player2.replace('+',' ')}</Text>
                <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>
            </TouchableOpacity>
        )
    };

    render() {
        const {navigator, store} = this.props;
        return (
            <View style={{flex: 1}}>
                <BackImage/>
                <View style={[UI.absoluteView,{
                    backgroundColor: 'rgba(0,0,0,0.8)'
                }]}/>
                <Navbar title={this.props.title} leftBtnTitle={this.props.backTitle}
                        onPressLeftBtn={() => navigator.pop()}/>

                <PersonRow title={store.TournamentByNumber.name}/>

                {store.Matches && <FlatList data={store.Matches}
                                            keyExtractor={(item, index) => 'Match' + item.id}
                                            renderItem={this.renderItem}
                                            contentContainerStyle={{paddingBottom: 40}}
                />}


                <Footer/>
                {this.state.isLoading && <Loading/>}
            </View>
        )


    }
}