import React, {Component} from 'react'
import {
    ScrollView,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'

import RootSibling from 'react-native-root-siblings'

import SuspentionWindow from './SuspentionWindow'
import FloatButtonPage from "./FloatButtonPage";

const data = [
    {
        title: 'ScrollableHeaderPage',
        page: 'ScrollableHeaderPage',
        description: '滚动页面导航条从透明变为不透明',
    },
    {
        title: 'ScrollingMenuPage',
        page: 'ScrollingMenuPage',
        description: '可以滚动的tabbar',
    },
    {
        title: 'FilterBarPage',
        page: 'FilterBarPage',
        description: '条件过滤条',
    },
    {
        title: 'FloatButtonPage',
        page: 'FloatButtonPage',
        description: '悬浮按钮',
    },

];


export default class IndexPage extends Component {
    static navigationOptions = {
        headerTitle: '首页'
    };

    componentDidMount() {
        this.toggleSibling(true);
    }

    close = () => {
        this.sibling && this.sibling.destroy();
        this.sibling = undefined;
    };

    toggleSibling = (show) => {
        if (show===true) {
            if(this.sibling){
                return;
            }
            this.sibling = new RootSibling(<SuspentionWindow close={this.close} toFloat initialOpened={false}/>);
        }
        else {
            this.close();
        }
    };
    renderItem = (item, index) => {
        return <TouchableOpacity
            key={index}
            onPress={() => this.props.navigation.navigate(item.page, {
                toggleFloatButton: this.toggleSibling,
            })}
            style={{
                height: 50,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor: "#ddd",
                justifyContent: 'center',
                paddingHorizontal: 10
            }}
        >
            <Text style={{fontSize: 16}}>{item.title}</Text>
            <Text style={{fontSize: 14}}>{item.description}</Text>
        </TouchableOpacity>
    }

    render() {
        return (
            <ScrollView>
                {
                    data.map(this.renderItem)
                }
            </ScrollView>
        );
    }
}