import {Linking, Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {iconsMap, iconsLoaded} from './assets/appIcons';
import {registerScreens} from './Screens';
import UI from './assets/UI';

// import axios from 'axios';

registerScreens();

iconsLoaded.then(() => {

    startApp();

});


function startApp() {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'Index',
            navigatorStyle: {...UI.NAVIGATION_STYLE,navBarHidden: true},
        },
    });
}

export {startApp}