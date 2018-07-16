import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {StackNavigator,SwitchNavigator,TabNavigator,createStackNavigator,createSwitchNavigator,createTabNavigator,createBottomTabNavigator,createNavigator} from 'react-navigation'

import IndexPage from './pages/IndexPage'
import ScrollableHeaderPage from './pages/ScrollableHeaderPage'
import ScrollingMenuPage from "./pages/ScrollingMenuPage";
import FilterBarPage from "./pages/FilterBarPage";


const mainNav = createStackNavigator({
    IndexPage:{screen:IndexPage},
    ScrollableHeaderPage:{screen:ScrollableHeaderPage,navigationOptions:{header:null}},
    ScrollingMenuPage:{screen:ScrollingMenuPage},
    FilterBarPage:{screen:FilterBarPage},
});

const loginNav = createStackNavigator({
    ScrollableHeaderPage:{screen:ScrollableHeaderPage}
});

const AppNav = createSwitchNavigator({
    mainNav:mainNav,
    loginNav:loginNav,
});




let items = Array.from(new Array(8), (item, i) => 'Menu Item ' + i);


export default class App extends React.Component {

    render() {
        return <AppNav/>;
        return (
            <View style={styles.container}>


                <ScrollableHeader
                    renderScrollViewContent={() => {
                        const data = Array.from({length: 6});
                        return (
                            <View style={styles.scrollViewContent}>
                                <View style={{height: 200,}}>
                                    <ScrollingMenu
                                        items={items}
                                        backgroundColor="#fff"
                                        // isVertical={true}
                                        itemSpacing={20}
                                        itemWrapperStyle={{}}
                                        renderItem={(item, i, selected) => {
                                            return <View style={{justifyContent:'center',borderBottomWidth:1,height:64,alignItems:'center'}}>
                                                <Text style={{color: selected === i ? 'red' : '#333'}}>{item}</Text>
                                            </View>
                                        }}
                                        onItemPress={(item, i, selected) => {
                                            // alert(item)
                                        }}
                                    />
                                </View>
                            </View>
                        );
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        // iOS uses content inset, which acts like padding.
        // paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
