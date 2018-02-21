import {
    Alert,
} from 'react-native';
import {observable, action} from 'mobx';
import axios from 'axios';
import site from '../Site';
import lstore from 'react-native-simple-store';

axios.defaults.baseURL = site;
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

class AppState {
    @observable HasService;
    @observable HasWinner;
    @observable HasStroke;
    @observable HasStrokeType;
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
    @observable EndTimeMatch;
    @observable Play;
    @observable WinnerPlayer;
    @observable TournamentId;
    @observable MatcheDet;
    @observable MatcheStatistics;


    constructor() {
        this.HasService = false;
        this.HasWinner = false;
        this.HasStroke = false;
        this.HasStrokeType = false;
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
        this.EndTimeMatch = '';
        this.Play = [];
        this.WinnerPlayer = [];
        this.TournamentId = '';
        this.MatcheDet = [];
        this.MatcheStatistics = [];


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
    setHasStrokeType(res) {
        this.HasStrokeType = res;
    }

    @action
    setService(name) {
        console.log('+++service+++')
        console.log(name)
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

    @action
    setEndTimeMatch(time) {
        this.EndTimeMatch = time;
    }

    @action
    setWinnerPlayer(play) {
        this.WinnerPlayer = play;
    }

    async getAuthenticate(opt) {
        let params = {
            email: opt.email,
            password: opt.pass,
        };
        console.log(params)
        let {data} = await axios.post('/auth', JSON.stringify(params));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
        lstore.save('profile', {
            email: opt.email,
            password: opt.pass
        }).then(() => this.setUser(data.user))


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
            count_points: 1,
            service: opt.service,
            score_type: opt.score_type,
            shot: opt.shot,
            shot_type: opt.shot_type,
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
        let {data} = await axios.get('/api/tournaments/find/' + opt.tournament_number);
        console.log("TournamentByNumber", data)
        this.TournamentByNumber = data;

    }

    async getTournamentCategories(opt) {
        let {data} = await axios.get('/api/tournaments/' + opt.tournament_id).catch((e) => {
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
        this.TournamentId = data.id;

    }


    async getMatches(matchId, catId) {
        let {data} = await axios.get('/api/tournaments/' + matchId + '/matches').catch((e) => {
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
        console.log("getMatches", catId)
        if (data.matches.filter(m => m.category_id === catId).length > 0) {
            this.Matches = data.matches;
        }

    }


    async startMatch(matchId, opt) {
        let params = {
            player1: opt.player1,
            player2: opt.player2,
            server: opt.server,
            court_id: opt.court_id,
            short_game: opt.short_game,
            super_tie_break: opt.super_tie_break,
        };
        console.log(matchId)
        let {data} = await axios.put('/api/matches/' + matchId + '/start', JSON.stringify(params)).catch((e) => {
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
        console.log("startMatch", data)

    }


    async addPlay(opt) {
        let params = {
            match_id: opt.match_id,
            player: opt.player,
            service: opt.service,
            score_type: opt.score_type,
            shot: opt.shot,
            shot_type: opt.shot_type,
            second_serve: opt.second_serve,
        };
        console.log(params)
        let {data} = await axios.post('/api/plays', JSON.stringify(params)).catch((e) => {
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
        console.log("addPlay", data)
        this.Play = data;

    }

    async deleteLastPlay(matchId) {
        console.log(matchId)
        let {data} = await axios.delete('/api/matches/' + matchId + '/lastplay').catch((e) => {
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
        console.log("deleteLastPlay", data)
        this.Play = [];
        this.Play = data;
    }

    async getMatcheDet(matchId) {
        let {data} = await axios.get('/api/matches/' + matchId).catch((e) => {
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
        console.log("getMatcheDet", data)
        this.MatcheDet = data;


    }


    async getMatcheStatistics(matchId) {
        let {data} = await axios.get('/api/statistics/match/' + matchId).catch((e) => {
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
        let arr=[];
        Object.keys(data).map(key => arr.push({key:key,value:data[key]}));
        console.log("MatcheStatistics", arr)
        this.MatcheStatistics = arr;
    }

    async setMatchScore(matchId, score) {
        let params={
            score:score
        }
        console.log(JSON.stringify(params));
        let {data} = await axios.put('/api/matches/' + matchId + '/score', params).catch((e) => {
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
        console.log("setMatchScore", data)
        this.Play = [];
        this.Play = data;
    }
}

const state = new AppState();

export default state;