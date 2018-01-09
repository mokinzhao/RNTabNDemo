/**
 * http网络请求工具类
 * @flow
 * @Create date 20170301
 * @Create by mokinzhao
 */

import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';

export default class HttpUtils extends Component {
  static queryParams (params) {
    return Object.keys (params)
      .map (k => encodeURIComponent (k) + '=' + encodeURIComponent (params[k]))
      .join ('&');
  }
  /** 
     * 网络请求封装方法
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
      }
      if (reqMethod == 'GET') {
        reqUrl +=
          (reqUrl.indexOf ('?') === -1 ? '?' : '&') +
          HttpUtils.queryParams (reqParams);
      }
      // console.warn ('reqParams:' + reqParams)
      let response = await fetch (reqUrl, {
        method: reqMethod,
        headers: Object.assign (headers, {
          //根据后台约定调整Content-Type和body
          //'Content-Type': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: reqParams,
        //body = postBody;
      });
      let responseJson = await response.json ();
      // console.warn ('responseJson:' + JSON.stringify (responseJson))
      return {
        json: responseJson,
        resp: response,
      };
    } catch (error) {
      console.warn ('error:' + error);
      //console.error(error);
    }
  }
  /** 
     * 网络请求封装方法
     * @param 请求方法json
     * @param 请求URL
     * @param 请求参数（字典形式）
     */
  static async fetchDataJson (reqMethod, reqUrl, reqParams) {
    try {
      let headers = JSON.parse (await AsyncStorage.getItem ('headers')) || {};
      let postBody = null;
      if (reqMethod == 'POST') {
        postBody = JSON.stringify (reqParams);
      }
      if (reqMethod == 'GET') {
        reqUrl +=
          (reqUrl.indexOf ('?') === -1 ? '?' : '&') +
          HttpUtils.queryParams (reqParams);
      }
      // console.warn ('reqParams:' + postBody)
      let response = await fetch (reqUrl, {
        method: reqMethod,
        headers: Object.assign (headers, {
          'Content-Type': 'application/json',
        }),
        body: postBody,
      });
      let responseJson = await response.json ();
      // console.warn ('responseJson:' + JSON.stringify (responseJson))
      return {
        json: responseJson,
        resp: response,
      };
    } catch (error) {
      console.warn ('error:' + error);
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
