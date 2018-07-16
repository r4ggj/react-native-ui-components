import React,{Component} from 'react'
import {
    ScrollView,
    Text,
} from 'react-native'

import ScrollingMenu from '../components/ScrollingMenu'

export default class ScrollingMenuPage extends Component{
    render(){
        return (
            <ScrollView>
                <ScrollingMenu
                    items={Array.from(new Array(10),(item,i)=>i)}
                     onItemPress={()=>null}
                    renderItem={(item,index,selected)=>{
                       return  <Text key={index} style={{color:index===selected?'red':'#333',paddingHorizontal:10}}>{'Menu '+item}</Text>
                    }}
                />

                <ScrollingMenu
                    style={{height:300,marginTop:10}}
                    isVertical={true}
                    items={Array.from(new Array(20),(item,i)=>i)}
                    onItemPress={()=>null}
                    renderItem={(item,index,selected)=>{
                        return  <Text key={index} style={{color:index===selected?'red':'#333',paddingHorizontal:10,paddingVertical:10}}>{'Menu '+item}</Text>
                    }}
                />
            </ScrollView>
        );
    }
}
