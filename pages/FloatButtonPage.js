import React,{Component} from 'react'
import {
    View,
    Button,
} from 'react-native'

export default class FloatButtonPage extends Component{

    render(){
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Button title={'Show Float Button'} onPress={()=>this.props.navigation.state.params.toggleFloatButton(true)}/>
                <Button title={'Destroy Float Button'} onPress={()=>this.props.navigation.state.params.toggleFloatButton(false)}/>
            </View>
        );
    }
}