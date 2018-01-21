/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

import React, {PureComponent} from 'react';
import {AppRegistry} from 'react-native';

import RootScene from './src/RootScene';
import HotUpdate from './src/HotUpdate';
import SplashScreen from 'react-native-splash-screen';
import CodePush from "react-native-code-push";
export default class App extends PureComponent {
  render () {
    return <RootScene />;
   // return <HotUpdate />;
  }
  componentDidMount () {
    //初始化非开发环境关闭所有log
    if (!__DEV__) {
      global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        error: () => {},
      };
    }
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide ();
    //热更新
    console.warn("111")
    this.syncImmediate();
  }
      /** Update pops a confirmation dialog, and then immediately reboots the app 一键更新，加入的配置项 */
      syncImmediate() {
        console.warn("sss")
        CodePush.sync(
          { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
        //   this.codePushStatusDidChange.bind(this),
        //   this.codePushDownloadDidProgress.bind(this)
        );
      }
}

AppRegistry.registerComponent ('CloudCarHome', () => App);
