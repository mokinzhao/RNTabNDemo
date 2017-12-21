/**
 * Created by mokinzhao on 2017/12/15.
 */

//import liraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'

import { Heading1, Heading2, Paragraph } from '../../widget/Text'
import { screen, system, tool } from '../../common'
import { color, DetailCell, NavigationItem, SpacingView } from '../../widget'

// create a component
class relyPage extends PureComponent {

    static navigationOptions = ({ navigation }) => ({
        title: '云车之家',
       
        headerRight: (
            
            <View style={{ flexDirection: 'row' }}>
                <NavigationItem
                    icon={require('../../res/img/Mine/icon_navigationItem_set_white.png')}
                    onPress={() => {

                    }}
                />
                <NavigationItem
                    icon={require('../../res/img/Home/icon_navigationItem_message_white.png')}
                    onPress={() => {

                    }}
                />
            </View>
        ),
       
        headerStyle: { backgroundColor: color.theme },
    })

    state: {
        isRefreshing: boolean
    }

    constructor(props: Object) {
        super(props)

        this.state = {
            isRefreshing: false
        }
    }

    onHeaderRefresh() {
        this.setState({ isRefreshing: true })

        setTimeout(() => {
            this.setState({ isRefreshing: false })
        }, 2000);
    }

    renderCells() {
        let cells = []
        let dataList = this.getDataList()
        for (let i = 0; i < dataList.length; i++) {
            let sublist = dataList[i]
            for (let j = 0; j < sublist.length; j++) {
                let data = sublist[j]
                let cell = <DetailCell image={data.image} title={data.title} subtitle={data.subtitle} key={data.title} />
                cells.push(cell)
            }
            cells.push(<SpacingView key={i} />)
        }

        return (
            <View style={{ flex: 1 }}>
                {cells}
            </View>
        )
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <View style={styles.userContainer}>
                    <Image style={styles.avatar} source={require('../../res/img/Mine/avatar.png')} />
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Heading1 style={{ color: 'white' }}>素敌</Heading1>
                            <Image style={{ marginLeft: 4 }} source={require('../../res/img/Mine/beauty_technician_v15.png')} />
                        </View>
                        <Paragraph style={{ color: 'white', marginTop: 4 }}>个人信息 ></Paragraph>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: color.background }}>
                <View style={{ position: 'absolute', width: screen.width, height: screen.height / 2, backgroundColor: color.theme }} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onHeaderRefresh()}
                            tintColor='gray'
                        />
                    }>
                    {this.renderHeader()}
                    <SpacingView />
                    {this.renderCells()}
                </ScrollView>
            </View>
        );
    }

    getDataList() {
        return (
            [
                [
                    { title: '我的钱包', subtitle: '办信用卡', image: require('../../res/img/Mine/icon_mine_wallet.png') },
                    { title: '余额', subtitle: '￥95872385', image: require('../../res/img/Mine/icon_mine_balance.png') },
                    { title: '抵用券', subtitle: '63', image: require('../../res/img/Mine/icon_mine_voucher.png') },
                    { title: '会员卡', subtitle: '2', image: require('../../res/img/Mine/icon_mine_membercard.png') }
                ],
                [
                    { title: '好友去哪', image: require('../../res/img/Mine/icon_mine_friends.png') },
                    { title: '我的评价', image: require('../../res/img/Mine/icon_mine_comment.png') },
                    { title: '我的收藏', image: require('../../res/img/Mine/icon_mine_collection.png') },
                    { title: '会员中心', subtitle: 'v15', image: require('../../res/img/Mine/icon_mine_membercenter.png') },
                    { title: '积分商城', subtitle: '好礼已上线', image: require('../../res/img/Mine/icon_mine_member.png') }
                ],
                [
                    { title: '客服中心', image: require('../../res/img/Mine/icon_mine_customerService.png') },
                    { title: '关于美团', subtitle: '我要合作', image: require('../../res/img/Mine/icon_mine_aboutmeituan.png') }
                ]
            ]
        )
    }

}

// define your styles
const styles = StyleSheet.create({
    header: {
        backgroundColor: color.theme,
        paddingBottom: 20
    },
    icon: {
        width: 27,
        height: 27,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#51D3C6'
    }
});

//make this component available to the app
export default relyPage;
