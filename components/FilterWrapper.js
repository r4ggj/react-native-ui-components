/**
 * 列条筛选组件外壳
 * 实现：
 * 1.筛选项由属性自定义；
 * 2.列表内容作为children属性传入；
 * 3.点击筛选项下拉弹出筛选框；
 * 4.筛选框的内容由外部传入
 * write by peter gan
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Keyboard,
    ViewPropTypes,
    Platform,
    Dimensions
} from 'react-native'

import PropTypes from 'prop-types'

const  {width, height} =Dimensions.get('window');

const FILTER_BAR_HEIGHT = 44;
const FOOTER_DISTANCE = 120;

export default class FilterWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            top: new Animated.Value(0),
            bottom: new Animated.Value(0),
            active: null,
        };
    }

    static propTypes = {
        data:PropTypes.array.isRequired,
        renderFilterItems: PropTypes.func,
        renderFilterItem:PropTypes.func,
        renderDropdown: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        children: PropTypes.element,
        wrapperStyle: ViewPropTypes.style,
        filterBarStyle: ViewPropTypes.style
    };
    static defaultProps = {
        renderDropdown: () => null,
        onCancel: () => null,
        data:[],
    };

    componentWillMount() {
        //监听键盘事件（必须）决定this.state.bottom的值；
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = (e) => {
        /**
         * 两个平台的返回值，表现都不一致。。。
         */
        if (Platform.OS === 'android') {
            this.state.bottom.setValue(0)
        }
        else{
            this.state.bottom.setValue(e.endCoordinates.height)
        }
    }

    _keyboardDidHide = () => {
        if (Platform.OS === 'android') {
            this.state.bottom.setValue(FOOTER_DISTANCE)
        }
        else{
            this.state.bottom.setValue(FOOTER_DISTANCE)
        }
    }

    handleItemPress = (active) => {
        /**
         * 判断是不是上一次点的那个筛选项，
         * 如果是，隐藏
         * 如果不是，显示下拉动画
         */
        this.toggleAnimated(active);
        this.setState({active});
    }
    toggleModal = (callback) => {
        this.setState({modalVisible: !this.state.modalVisible}, () => {
            if (typeof(callback) === 'function') {
                callback();
            }
        });
    }
    toggleAnimated = (active) => {
        //切换动画移除键盘（必须）
        Keyboard.dismiss();
        if (this.state.modalVisible) {
            if (active === this.state.active) {
                this.toggleModal();
            }
            else {
                this.toggleModal(() => this.toggleModal(
                    () => {
                        this.state.top.setValue(-height + FILTER_BAR_HEIGHT + FOOTER_DISTANCE);
                        this.state.bottom.setValue(height - FILTER_BAR_HEIGHT - FOOTER_DISTANCE);
                        Animated.timing(this.state.top, {
                            duration: 250,
                            toValue: 0
                        }).start();
                        Animated.timing(this.state.bottom, {
                            duration: 250,
                            toValue: FOOTER_DISTANCE
                        }).start();
                    }
                ));

            }
        }
        else {
            this.toggleModal(() => {
                this.state.top.setValue(-height + FILTER_BAR_HEIGHT + FOOTER_DISTANCE);
                this.state.bottom.setValue(height - FILTER_BAR_HEIGHT - FOOTER_DISTANCE);
                Animated.timing(this.state.top, {
                    duration: 250,
                    toValue: 0
                }).start();
                Animated.timing(this.state.bottom, {
                    duration: 250,
                    toValue: FOOTER_DISTANCE
                }).start();
            });
        }
    }
    onCancel = () => {
        this.toggleModal();
        this.setState({active:null});
        this.props.onCancel();
    }
    renderModal = () => {
        return (
            <View style={styles.modal}>
                <TouchableOpacity activeOpacity={1} style={StyleSheet.absoluteFill} onPress={this.onCancel}>
                    <View/>
                </TouchableOpacity>

                <Animated.View style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: this.state.bottom,
                    top: this.state.top,
                    backgroundColor: '#fff',
                }}>
                    {this.props.renderDropdown(this)}
                </Animated.View>
            </View>
        );
    }


    renderFilterItems=(data)=>{
        return data.map((item,i)=>{
            return this.props.renderFilterItem(item,i,this);
        });
    };

    render() {
        const {data,renderFilterItems,wrapperStyle,filterBarStyle} = this.props;
        return (
            <View style={[styles.wrapper, wrapperStyle]}>
                <View style={[styles.filterBar,filterBarStyle]}>
                    {renderFilterItems?renderFilterItems(this.handleItemPress):this.renderFilterItems(data)}
                </View>
                {this.props.children}
                {this.state.modalVisible?this.renderModal():null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    filterBar: {
        height: FILTER_BAR_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#ddd',
        backgroundColor:'#fff'
    },
    modal: {
        position: 'absolute',
        top: FILTER_BAR_HEIGHT,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        overflow: 'hidden'
    },
    scroll: {
        flex: 1
    },
});