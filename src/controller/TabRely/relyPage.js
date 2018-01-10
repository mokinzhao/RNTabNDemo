/**
 * Created by mokinzhao on 2017/12/15.
 */

//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ListView,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';

import {Heading1, Heading2, Paragraph} from '../../widget/Text';
import {
  color,
  Button,
  NavigationItem,
  SearchBar,
  SpacingView,
} from '../../widget';

import {screen, system} from '../../common';
import api from '../../api';
import HttpUtils from '../../utils/HttpUtils';
import Swiper from 'react-native-swiper';
const loading = require ('../../res/img/Home/loading.gif');
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell';

const Slide = props => {
  return (
    <View style={styles.slide}>
      <Image
        onLoad={props.loadHandle.bind (null, props.i)}
        style={styles.image}
        source={{uri: props.uri}}
      />
      {/* 暂时注释掉没有lodingimg */}
      {/* {!props.loaded &&
        <View style={styles.loadingView}>
          <Image style={styles.loadingImage} source={loading} />
        </View>} */}
    </View>
  );
};
// create a component
class RelyScene extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: (
      <TouchableOpacity style={styles.searchBar}>
        <Image
          source={require ('../../res/img//Home/search_icon.png')}
          style={styles.searchIcon}
        />
        <Paragraph>搜索</Paragraph>
      </TouchableOpacity>
    ),
    // headerRight: (
    //     <NavigationItem
    //         icon={require('../../res/img//Home/icon_navigationItem_message_white.png')}
    //         onPress={() => {

    //         }}
    //     />
    // ),
    headerLeft: (
      <NavigationItem
        title="上海"
        titleStyle={{color: 'black'}}
        onPress={() => {}}
      />
    ),
    headerStyle: {backgroundColor: color.theme},
  });

  state: {
    discounts: Array<Object>,
    dataList: Array<Object>,
    refreshing: boolean,
  };

  constructor (props: Object) {
    super (props);

    this.state = {
      discounts: [],
      dataList: [],
      refreshing: false,
      swiperShow: false,
      imgList: [
        'https://gitlab.pro/yuji/demo/uploads/d6133098b53fe1a5f3c5c00cf3c2d670/DVrj5Hz.jpg_1',
        'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
        'https://gitlab.pro/yuji/demo/uploads/4421f77012d43a0b4e7cfbe1144aac7c/XFVzKhq.jpg',
        'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
      ],
      loadQueue: [0, 0, 0, 0],
    };
    // this.loadHandle = this.loadHandle.bind (this);
    {
       (this: any).loadHandle = this.loadHandle.bind (this);
    }
    {
       (this: any).requestData = this.requestData.bind (this);
    }
    {
       (this: any).renderCell = this.renderCell.bind (this);
    }
    {
       (this: any).onCellSelected = this.onCellSelected.bind (this);
    }
    {
       (this: any).keyExtractor = this.keyExtractor.bind (this);
    }
    {
       (this: any).renderHeader = this.renderHeader.bind (this);
    }
    {
       (this: any).onGridSelected = this.onGridSelected.bind (this);
    }
    {
       (this: any).onMenuSelected = this.onMenuSelected.bind (this);
    }
  }

  componentDidMount () {
    this.requestData ();
    setTimeout (() => {
      this.setState ({
        swiperShow: true,
      });
    }, 0);
  }

  requestData () {
    this.setState ({refreshing: true});
    this.requestRecommend ();
  }

   requestRecommend () {
    HttpUtils.fetchData ('GET', api.recommend).then (v => {
      let dataList = v.result.data.map (info => {
        return {
          id: info.id,
          imageUrl: info.squareimgurl,
          title: info.mname,
          subtitle: `[${info.range}]${info.title}`,
          price: info.price,
        };
      });
      this.setState ({
        dataList: dataList,
        refreshing: false,
      });
    });
  }


  renderCell (info: Object) {
    return <GroupPurchaseCell info={info.item} onPress={this.onCellSelected} />;
  }

  onCellSelected (info: Object) {
    StatusBar.setBarStyle ('default', false);
    this.props.navigation.navigate ('GroupPurchase', {info: info});
  }

  keyExtractor (item: Object, index: number) {
    return item.id;
  }

  renderHeader () {
    if (this.state.swiperShow) {
      return (
        <View>
          <View style={{width: '100%', height: 180}}>
            <Swiper
              loadMinimal={false}
              loadMinimalSize={1}
              style={styles.wrapper}
              autoplay
            >
              {this.state.imgList.map ((item, i) => (
                <Slide
                  loadHandle={this.loadHandle}
                  loaded={!!this.state.loadQueue[i]}
                  uri={item}
                  i={i}
                  key={i}
                />
              ))}
            </Swiper>
          </View>
          <SpacingView />
          <View style={styles.recommendHeader}>
            <Heading2>优质挂靠</Heading2>
          </View>
        </View>
      );
    } else {
      return (
        <View>

          <SpacingView />
          <View style={styles.recommendHeader}>
            <Heading2>优质挂靠</Heading2>
          </View>
        </View>
      );
    }
  }

  onGridSelected (index: number) {
    let discount = this.state.discounts[index];

    if (discount.type == 1) {
      StatusBar.setBarStyle ('default', false);

      let location = discount.tplurl.indexOf ('http');
      let url = discount.tplurl.slice (location);
      this.props.navigation.navigate ('Web', {url: url});
    }
  }

  onMenuSelected (index: number) {
    alert (index);
  }
  loadHandle (i) {
    let loadQueue = this.state.loadQueue;
    loadQueue[i] = 1;
    this.setState ({
      loadQueue,
    });
  }
  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataList}
          keyExtractor={this.keyExtractor}
          onRefresh={this.requestData}
          refreshing={this.state.refreshing}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderCell}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  recommendHeader: {
    height: 35,
    justifyContent: 'center',
    borderWidth: screen.onePixel,
    borderColor: color.border,
    paddingVertical: 8,
    paddingLeft: 20,
    backgroundColor: 'white',
  },
  searchBar: {
    width: screen.width * 0.7,
    height: 30,
    borderRadius: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    margin: 5,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    flex: 1,
    backgroundColor: 'transparent',
  },

  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  loadingImage: {
    width: 60,
    height: 60,
  },
});

//make this component available to the app
export default RelyScene;
