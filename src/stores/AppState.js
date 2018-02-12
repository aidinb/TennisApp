import {
    Alert,
} from 'react-native';
import {observable, action} from 'mobx';
import axios from 'axios';
import site from '../Site';

axios.defaults.baseURL = site;
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

class AppState {
    @observable HasService;
    @observable HasWinner;
    @observable HasStroke;
    @observable Service;
    @observable Court;
    @observable Services;
    @observable User;
    @observable ListSettings;
    @observable TournamentByNumber;
    @observable TournamentCategories;
    @observable Matches;
    @observable TournamentCourts;
    @observable Category;
    @observable Match;


    constructor() {
        this.HasService = false;
        this.HasWinner = false;
        this.HasStroke = false;
        this.Service = '';
        this.Court = '';
        this.Services = false;
        this.User = [];
        this.ListSettings = [];
        this.TournamentByNumber = [];
        this.TournamentCategories = [];
        this.Matches = [];
        this.TournamentCourts = [];
        this.Category = [];
        this.Match = [];


    }

    @action
    setHasService(res) {
        this.HasService = res;
    }

    @action
    setHasWinner(res) {
        this.HasWinner = res;
    }

    @action
    setHasStroke(res) {
        this.HasStroke = res;
    }

    @action
    setService(name) {
        this.Service = name;
    }

    @action
    setCourt(No) {
        this.Court = No;
    }

    @action
    setServices(set) {
        this.Services = set;
    }

    @action
    setUser(user) {
        this.User = user;
    }
    @action
    setCategory(cat) {
        this.Category = cat;
    }
    @action
    setMatch(match) {
        this.Match = match;
    }
    async getAuthenticate(opt) {
        let params = {
            email: opt.email,
            password: opt.pass,
        };
        console.log(params)
        let {data} = await axios.post('/auth', JSON.stringify(params));
            axios.defaults.headers.common['Authorization'] = 'Bearer ' +data.token;
            this.setUser(data.user)
            console.log("Authenticate", data.token)
            this.Authenticate = data;
    }


    async getListSettings() {
        let {data} = await axios.get('/api/settings').catch((e) => {
            if (e.response && e.response.status) {
                Alert.alert(
                    'Server Error',
                    'Please Try Later',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            } else {
                Alert.alert(
                    'Slow Connection',
                    'please Try Again Later',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            }
        });
        console.log("getListSettings", data)
        this.ListSettings = data;
    }

    async setSettings(opt) {
        let params = {
            service: opt.service,
            shot: opt.shot,
            kaas: opt.kaas,
        };
        console.log(params)
        let {data} = await axios.post('/api/settings', JSON.stringify(params)).catch((e) => {
            if (e.response && e.response.status) {
                Alert.alert(
                    'Server Error',
                    'Please Try Later',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            } else {
                Alert.alert(
                    'Slow Connection',
                    'please Try Again Later',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            }
        });
        console.log("setSettings", data)
    }


    async getTournamentByNumber(opt) {
        let {data} = await axios.get('/api/tournaments/find/'+opt.tournament_number);
        console.log("TournamentByNumber", data)
        this.TournamentByNumber = data;

    }

    async getTournamentCategories(opt) {
        let {data} = await axios.get('/api/tournaments/'+opt.tournament_id).catch((e) => {
            console.log(e.response)
            if (e.response && e.response.status) {
                Alert.alert(
                    'Server Error',
                    'Please Try Later',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            } else {
                Alert.alert(
                    'Slow Connection',
                    'please Try Again Later',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            }
        });
        console.log("TournamentCategories", data)
        this.TournamentCategories = data.categories;
        this.TournamentCourts = data.courts;

    }


    async getMatches() {
        let {data} = await axios.get('/api/matches').catch((e) => {
            console.log(e.response)
            if (e.response && e.response.status) {
                Alert.alert(
                    'Server Error',
                    'Please Try Later',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            } else {
                Alert.alert(
                    'Slow Connection',
                    'please Try Again Later',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            }
        });
        console.log("getMatches", data)
        this.Matches = data;

    }


}

const state = new AppState();

export default state;