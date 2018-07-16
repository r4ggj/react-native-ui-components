import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import ScrollableHeader from './components/ScrollableHeader'
import ScrollingMenu from './components/ScrollingMenu'

let items = Array.from(new Array(8), (item, i) => 'Menu Item ' + i);


export default class App extends React.Component {

    render() {
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
                                            return <View style={{justifyContent:'center',borderBottomWidth:1,height:64}}>
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
