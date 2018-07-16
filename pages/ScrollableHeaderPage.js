import React from "react";
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import ScrollableHeader from '../components/ScrollableHeader'
export default class ScrollableHeaderPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>


                <ScrollableHeader
                    renderHeaderContent={()=><TouchableOpacity
                        onPress={()=>this.props.navigation.goBack()}
                        style={{
                        position:'absolute',
                        top:4,
                        left:10,
                    }}>
                        <Text style={{color:"#fff",fontSize:16}}>返回</Text>
                    </TouchableOpacity>}
                    renderScrollViewContent={() => {
                        return (
                            <View style={styles.scrollViewContent}>
                                {
                                    Array.from(new Array(100)).map((item,i)=>(
                                        <Text key={i} style={{textAlign:'center',paddingVertical:8}}>{i+''}</Text>
                                    ))
                                }
                            </View>
                        );
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
   container:{
       flex:1
   },
    scrollViewContent:{
       flex:1,
    }
});