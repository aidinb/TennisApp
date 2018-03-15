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
export default class Kiespartij extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tourney: '',
            party: '3',
            show: '',
            isLoading: false
        };
    }

    componentDidMount() {
        const {store, navigator} = this.props;
        this.setState({isLoading: true})
        store.getTournamentCategories({
            tournament_id: store.TournamentByNumber.id
        }).then(() => {
            this.setState({isLoading: false})
        })
    }


    renderItem = ({item, index}) => {
        const {store, navigator} = this.props;
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                store.setCategory(item);
                store.Matches=[];
                navigator.push({
                    screen: 'DamesEnkel',
                    navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                    animationType: 'fade',
                    passProps: {backTitle: 'Categorie',title:item.name,catId:item.id}
                })
            }} style={{
                width: width,
                flexDirection: 'row',
                padding: 20,
                justifyContent: 'space-between',
                paddingTop: 0,
                borderColor: UI.COLORS_HEX.white,
                borderTopWidth: index === 0 ? 0 : 0.5,
                alignItems: 'center',
                paddingBottom: 0,
                height: 50,
                backgroundColor: UI.COLORS_HEX.lightBlack
            }}>
                <Text
                    style={[UI.regularWhiteText25,{
                        fontSize: 17,
                    }]}>{item.name}</Text>
                <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>
            </TouchableOpacity>
        )
    }

    render() {
        const {navigator, store} = this.props;
        return (
            <View style={{flex: 1}}>
                <BackImage/>

                <Navbar title={'Kies Categorie'} rightBtnColor={UI.COLORS_HEX.orange}
                        leftBtnTitle={this.props.backTitle} onPressLeftBtn={() => navigator.pop()}/>
                <PersonRow title={store.TournamentByNumber.name} url={store.TournomentImage}/>

                <View style={{
                    borderColor: UI.COLORS_HEX.gray,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    marginTop: 10,
                    flex:1
                }}>
                    {store.TournamentCategories && <FlatList data={store.TournamentCategories}
                                                             keyExtractor={(item, index) => 'tour__'+item.id}
                                                             renderItem={this.renderItem}
                                                             contentContainerStyle={{paddingBottom:width/10}}


                    />}

                </View>

                <Footer image={store.SponserImage}/>
                {this.state.isLoading && <Loading/>}

            </View>
        )


    }
}