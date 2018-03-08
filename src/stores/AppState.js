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
    @observable Update;
    @observable TournomentImage;
    @observable Sponser;
    @observable SponserImage;
    @observable PauseMatch;


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
        this.Play = [{score: {currentGame: {player1: 0, player2: 0}}}];
        this.WinnerPlayer = [];
        this.TournamentId = '';
        this.MatcheDet = [];
        this.MatcheStatistics = [];
        this.Update = false;
        this.TournomentImage = '';
        this.Sponser = [];
        this.SponserImage = '';
        this.PauseMatch = '';


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

    @action
    setUpdate(update) {
        this.Update = update;
    }

    @action
    deleteToken() {
        axios.defaults.headers.common['Authorization'] = '';
    }

    async getAuthenticate(opt, remember) {
        let params = {
            email: opt.email,
            password: opt.pass,
        };
        let {data} = await axios.post('/auth', JSON.stringify(params));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
        if (remember === true) {
            lstore.save('profile', {
                email: opt.email,
                password: opt.pass
            }).then(() => this.setUser(data.user))
        } else {
            this.setUser(data.user)
        }


        // console.log("Authenticate", data.token)
        this.Authenticate = data;
    }


    async getListSettings() {
        let {data} = await axios.get('/api/settings').catch((e) => {
            if (e.response && e.response.status) {
                Alert.alert(
                    e.response.status.toString(),
                    JSON.parse(e.request._response).error[0],
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            } else {
                Alert.alert(
                    'Trage verbinding',
                    'Probeer het later opnieuw',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            }
        });
        // console.log("getListSettings", data)
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
        let {data} = await axios.post('/api/settings', JSON.stringify(params)).catch((e) => {
            if (e.response && e.response.status) {
                Alert.alert(
                    e.response.status.toString(),
                    JSON.parse(e.request._response).error[0],
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            } else {
                Alert.alert(
                    'Trage verbinding',
                    'Probeer het later opnieuw',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            }
        });
        // console.log("setSettings", data)
    }


    async getTournamentByNumber(opt) {
        let {data} = await axios.get('/api/tournaments/find/' + opt.tournament_number);
        // console.log("TournamentByNumber", data)
        this.TournamentByNumber = data;

    }

    async getTournamentCategories(opt) {
        let {data} = await axios.get('/api/tournaments/' + opt.tournament_id).catch((e) => {
            if (e.response && e.response.status) {
                Alert.alert(
                    e.response.status.toString(),
                    JSON.parse(e.request._response).error[0],
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            } else {
                Alert.alert(
                    'Trage verbinding',
                    'Probeer het later opnieuw',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            }
        });
        // console.log("TournamentCategories", data)
        this.TournamentCategories = data.categories;
        this.TournamentCourts = data.courts;
        this.TournamentId = data.id;
        this.TournomentImage = data.image;

    }


    async getMatches(catId) {
        let {data} = await axios.get('/api/categories/' + catId).catch((e) => {
            if (e.response && e.response.status) {
                Alert.alert(
                    e.response.status.toString(),
                    JSON.parse(e.request._response).error[0],
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            } else {
                Alert.alert(
                    'Trage verbinding',
                    'Probeer het later opnieuw',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            }
        });
        // console.log("getMatches", data)
        this.Matches = data.matches;


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
        let {data} = await axios.put('/api/matches/' + matchId + '/start', params).catch((e) => {
            if (e.response && e.response.status) {
                Alert.alert(
                    e.response.status.toString(),
                    JSON.parse(e.request._response).error[0],
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            } else {
                Alert.alert(
                    'Trage verbinding',
                    'Probeer het later opnieuw',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            }
        });
        // console.log("startMatch", data)

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
        let {data} = await axios.post('/api/plays', JSON.stringify(params)).catch((e) => {
            if (e.response && e.response.status) {
                Alert.alert(
                    e.response.status.toString(),
                    JSON.parse(e.request._response).error[0],
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            } else {
                Alert.alert(
                    'Trage verbinding',
                    'Probeer het later opnieuw',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            }
        });
        // console.log("addPlay", data)
        this.Play = data;
        this.Service = data.now_serving;


    }

    async deleteLastPlay(matchId) {
        let {data} = await axios.delete('/api/matches/' + matchId + '/lastplay').catch((e) => {
            if (e.response && e.response.status) {
                Alert.alert(
                    'Let op',
                    'Je kan niet verder terug',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            } else {
                Alert.alert(
                    'Trage verbinding',
                    'Probeer het later opnieuw',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            }
        });
        // console.log("deleteLastPlay", data)
        this.Play = [];
        this.Play = data;
        this.Service = data.now_serving;

    }

    async getMatcheDet(matchId) {
        let {data} = await axios.get('/api/matches/' + matchId).catch((e) => {
            if (e.response && e.response.status) {
                Alert.alert(
                    e.response.status.toString(),
                    JSON.parse(e.request._response).error[0],
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            } else {
                Alert.alert(
                    'Trage verbinding',
                    'Probeer het later opnieuw',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            }
        });
        // console.log("getMatcheDet", data)
        this.MatcheDet = data;


    }


    async getMatcheStatistics(matchId) {
        let {data} = await axios.get('/api/statistics/match/' + matchId).catch((e) => {
            if (e.response && e.response.status) {
                Alert.alert(
                    e.response.status.toString(),
                    JSON.parse(e.request._response).error[0],
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            } else {
                Alert.alert(
                    'Trage verbinding',
                    'Probeer het later opnieuw',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            }
        });
        let arr = [];
        Object.keys(data).map(key => arr.push({key: key, value: data[key]}));
        // console.log("MatcheStatistics", arr)
        this.MatcheStatistics = arr;
    }

    async getLastScore(matchId) {
        let {data} = await axios.get('/api/matches/' + matchId).catch((e) => {
            if (e.response && e.response.status) {
                Alert.alert(
                    e.response.status.toString(),
                    JSON.parse(e.request._response).error[0],
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            } else {
                Alert.alert(
                    'Trage verbinding',
                    'Probeer het later opnieuw',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            }
        });
        // console.log("getLastScore", data)
        this.Play = data;
        this.Service = data.now_serving;
    }

    async setMatchScore(matchId, score) {
        let params = {
            score: score
        }
        let {data} = await axios.put('/api/matches/' + matchId + '/score', params).catch((e) => {
            if (e.response && e.response.status) {
                Alert.alert(
                    e.response.status.toString(),
                    JSON.parse(e.request._response).error[0],
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
                this.getLastScore(matchId);
            } else {
                Alert.alert(
                    'Trage verbinding',
                    'Probeer het later opnieuw',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            }
        });
        // console.log("setMatchScore", data)
        this.Play = [];
        this.Play = data;
        this.Service = data.now_serving;
    }

    async getSponser() {
        let {data} = await axios.get('/api/sponsors/main').catch((e) => {
            if (e.response && e.response.status) {
                Alert.alert(
                    e.response.status.toString(),
                    JSON.parse(e.request._response).error[0],
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            } else {
                Alert.alert(
                    'Trage verbinding',
                    'Probeer het later opnieuw',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            }
        });
        // console.log("getSponser", data)
        this.Sponser = data;
        this.SponserImage = data.image;
    }

    async pauseMatch(matchId) {
        let {data} = await axios.put('/api/matches/'+matchId+'/pause').catch((e) => {
            if (e.response && e.response.status) {
                Alert.alert(
                    e.response.status.toString(),
                    JSON.parse(e.request._response).error[0],
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            } else {
                Alert.alert(
                    'Trage verbinding',
                    'Probeer het later opnieuw',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                )
            }
        });
        // console.log("pauseMatch", data)
        this.PauseMatch = data;

    }
}

const state = new AppState();

export default state;