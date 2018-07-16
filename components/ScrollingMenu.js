/**
 * 可以滚动的tab
 */
import React, {
    Component
} from 'react';

import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    UIManager,
    findNodeHandle
} from 'react-native';

import PropTypes from 'prop-types'

export default class ScrollingMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            widths: new Array(props.items.length),
            contentWidth: 0,
            contentHeight:0,
        }
    }

    static defaultProps = {
        backgroundColor: "#ffffff",
        textColor: "#cccccc",
        selectedTextColor: "#000000",
        itemSpacing: 0,
        onItemPress:()=>null,
        isVertical:false,
    };

    static propTypes = {
        items: PropTypes.array.isRequired,
        onItemPress: PropTypes.func,
        renderItem:PropTypes.func.isRequired,
        backgroundColor: PropTypes.string,
        style:PropTypes.any,
        itemSpacing:PropTypes.number,
        isVertical:PropTypes.bool,
        itemWrapperStyle:PropTypes.any,
    };

    scroll(itemNum) {
        this.getWrapperSize((wrapperSize)=>{
            let widthInFront = 0,
                currentItemWidth = this.state.widths[itemNum],
                screenWidth = this.props.isVertical?wrapperSize.height:wrapperSize.width,
                contentWidth = this.state.contentWidth,
                self = this

            for (let i = 0; i <= itemNum; i++) {
                if (i < itemNum) widthInFront += this.state.widths[i] + this.props.itemSpacing
            }

            requestAnimationFrame(
                () => {
                    let x = (widthInFront + self.props.itemSpacing) - ((screenWidth / 2) - (currentItemWidth / 2))
                    if (x < 0) {
                        x = 0
                    } else if (x > (contentWidth - screenWidth)) {
                        x = contentWidth - screenWidth
                    }
                    if (self.props.noSetState) {
                        if (self.props.noSetState.indexOf(self.props.items[itemNum]) === -1) {
                            self.refs.scrollView.scrollTo(this.props.isVertical?{y:x}:{x})
                            self.setState({selected: itemNum})
                        }
                    } else {
                        self.refs.scrollView.scrollTo(this.props.isVertical?{y:x}:{x})
                        self.setState({selected: itemNum})
                    }
                }
            )

            this.props.onItemPress(itemNum,this.state.selected);
        });
    }


    getWrapperSize(callback){
        if(this._wrapperSize){
            callback(this._wrapperSize);
        }
        else{
            const handle = findNodeHandle(this.refs.scrollView);
            UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                let _wrapperSize={x, y, width, height, pageX, pageY};
                callback(_wrapperSize);
                this._wrapperSize=_wrapperSize;
            });

        }
    }


    onContentSizeChange=(contentWidth, contentHeight) => {
        this.setState({
            contentWidth:this.props.isVertical?contentHeight:contentWidth
        })
    };

    getSpaceStyle(isVertical,index,itemSpacing){
        if(isVertical){
            if(index===0){
                return {
                    marginTop:itemSpacing,
                    marginBottom:itemSpacing,
                };
            }
            else{
                return {
                    marginBottom:itemSpacing,
                }
            }
        }
        else{
            if(index===0){
                return {
                    marginLeft:itemSpacing,
                    marginRight:itemSpacing,
                };
            }
            else{
                return {
                    marginRight:itemSpacing,
                }
            }
        }
    }

    render() {
        const {backgroundColor,style,itemSpacing,isVertical,itemWrapperStyle} =this.props;

        let items = []



        for (let i = 0; i <  this.props.items.length; i++) {
            items.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => {
                        this.scroll(i);
                    }}
                    activeOpacity={0.8}
                    style={[this.getSpaceStyle(isVertical,i,itemSpacing),itemWrapperStyle]}
                    onLayout={(object) => {
                        let {width,height} = object.nativeEvent.layout
                        let newState = this.state
                        newState.widths[i] = isVertical?height:width
                        this.setState(newState)
                    }}
                >
                    {
                        this.props.renderItem(this.props.items[i],i,this.state.selected)
                    }
                </TouchableOpacity>
            )
        }

        return (
            <ScrollView
                ref='scrollView'
                style={[styles.scrollBar,backgroundColor?{backgroundColor}:null,style]}
                horizontal={!isVertical}
                onContentSizeChange={this.onContentSizeChange}
                showsHorizontalScrollIndicator={false}
            >
                {items}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollBar: {
        paddingBottom: 10,
        paddingTop: 8
    },
    button:{
        borderWidth:1
    }
})


