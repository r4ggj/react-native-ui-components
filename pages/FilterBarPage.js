import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import FilterWrapper from "../components/FilterWrapper";
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class FilterBarPage extends Component{


    render(){
        return <FilterWrapper
            data={[1,2,3,4,5]}
            renderDropdown={(filterBar)=>{
                return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text>{'DropDown'+filterBar.state.active}</Text>
                </View>
            }}
            renderFilterItem={(item,index,filterBar)=>{
                return <TouchableOpacity
                    style={{
                        flex:1,
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                    key={index}
                    onPress={()=>filterBar.handleItemPress(index)}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',}}>
                        <Text style={{color:filterBar.state.active===index?'red':'#333',marginRight:4}}>{'Menu '+index}</Text>
                        <Ionicons name={filterBar.state.active===index?"ios-arrow-up":"ios-arrow-down"} color={filterBar.state.active===index?'red':'#333'}/>
                    </View>
                </TouchableOpacity>
            }}
        >

        </FilterWrapper>
    }
}

