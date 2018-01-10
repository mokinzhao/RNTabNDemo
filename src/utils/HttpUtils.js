/**
 * http网络请求工具类
 * @flow
 * @Create date 20170301
 * @Create by mokinzhao
 */

import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import Tools from './netTools';
export default class HttpUtils extends Component {
  static queryParams (params) {
    return Object.keys (params)
      .map (k => encodeURIComponent (k) + '=' + encodeURIComponent (params[k]))
      .join ('&');
  }
  /** 
     * http网络请求封装
     * @param 请求方法x-www-form-urlencoded
     * @param 请求URL
     * @param 请求参数（字符串拼接）
     */
  static async fetchData (reqMethod, reqUrl, reqParams) {
    try {
      let headers = JSON.parse (await AsyncStorage.getItem ('headers')) || {};
      let postBody = null;
      if (reqMethod == 'POST') {
        postBody = JSON.stringify (reqParams);
        // console.warn ('reqParams:' + postBody)
      }
      if (reqMethod == 'GET') {
        if(reqParams){
          reqUrl +=
          (reqUrl.indexOf ('?') === -1 ? '?' : '&') +
          HttpUtils.queryParams (reqParams);
        }
        //console.warn ('reqParams:' + reqParams)
      }

      let response = await fetch (reqUrl, {
        method: reqMethod,
        headers: Object.assign (headers, {
          //"accesstoken":token  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
          //'Content-Type': 'application/json',//根据Content-Type类型选择方式
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: postBody,
      });
      let responseJson = await response.json ();
      let result = JSON.parse (JSON.stringify (responseJson));
      // console.warn ('responseJson:' + JSON.stringify (responseJson));
      //是否解析成功
     /* if (result && result.retCode == '0') {
        //TODO: 是否统一处理
      } else {
        console.warn ('请求失败：' + reqUrl);
      }*/
      return {
        result: result,
        json: responseJson,
        resp: response,
      };
    } catch (error) {
      console.warn ('error:' + error);
      alert (error);
      //console.error(error);
    }
  }
  /**
     * 异步获取或写入本地存储
     * @param inputKey
     * @param inputData 可选 没有inputData则为读取方法 有则为写入存储
     */
  static async getOrsetData (inputKey, inputData, callback) {
    let data = await AsyncStorage.getItem (inputKey);
    let original = JSON.parse (data) || {};
    if (inputData) {
      Object.assign (original, inputData);
      for (var key in original) {
        if (original[key] === null) delete original[key];
      }
      await AsyncStorage.setItem (
        inputKey,
        JSON.stringify (original),
        callback
      );
    } else {
      return await original;
    }
  }
}
