import {Navigation} from 'react-native-navigation';
import {Provider} from 'mobx-react/native';
import store from './stores/AppState'


import Index from './screens/Index';
import Login from './screens/Login';
import Menu from './screens/Menu';
import Setting from './screens/Setting';
import Tourney from './screens/Tourney';
import Kiespartij from './screens/Kiespartij';
import DamesEnkel from './screens/DamesEnkel';
import SetUpWedstrijd from './screens/SetUpWedstrijd';
import KiesCat from './screens/KiesCat';
import StartMatch from './screens/StartMatch';
import MatchResult from './screens/MatchResult';
import Statics from './screens/Statics';





export function registerScreens() {


    Navigation.registerComponent('Index', () => Index, store, Provider);
    Navigation.registerComponent('Login', () => Login, store, Provider);
    Navigation.registerComponent('Menu', () => Menu, store, Provider);
    Navigation.registerComponent('Setting', () => Setting, store, Provider);
    Navigation.registerComponent('Tourney', () => Tourney, store, Provider);
    Navigation.registerComponent('Kiespartij', () => Kiespartij, store, Provider);
    Navigation.registerComponent('DamesEnkel', () => DamesEnkel, store, Provider);
    Navigation.registerComponent('SetUpWedstrijd', () => SetUpWedstrijd, store, Provider);
    Navigation.registerComponent('KiesCat', () => KiesCat, store, Provider);
    Navigation.registerComponent('StartMatch', () => StartMatch, store, Provider);
    Navigation.registerComponent('MatchResult', () => MatchResult, store, Provider);
    Navigation.registerComponent('Statics', () => Statics, store, Provider);

}