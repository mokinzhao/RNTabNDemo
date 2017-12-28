
import React, { PureComponent } from 'react'
import { AppRegistry } from 'react-native'

import RootScene from './src/RootScene';
import SplashScreen from 'react-native-splash-screen'
export default class App extends PureComponent {
    render() {
        return (
            <RootScene />
        );
    }
    componentDidMount() {
    	// do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
         SplashScreen.hide();
    }

}

AppRegistry.registerComponent('CloudCarHome', () => App);