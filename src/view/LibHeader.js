import React, { Component } from 'react';
import PropTypes from 'prop-types';//used by react version >1.5 

import '../App.css';
import Utils from '../Utils';
import AppConfig from '../AppConfig';

var _HelpPageUrl = "";
class LibHeader extends Component{
    constructor(props){
        super(props);
        _HelpPageUrl = AppConfig.getHelpPage();
    }

    static get defaultPropsType(){
        return {
            username : " ",
            title: "星云·图书管理",
            isHomeHeader: false,
            exitBtnListener: ()=>{},
            registerBtnListener: ()=>{},
            registerBtnName: "注册",
        };
    }
    static propsType = {
        username: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        isHomeHeader: PropTypes.bool.isRequired,
        registerBtnName: PropTypes.string.isRequired,
        exitBtnListener: PropTypes.func.isRequired,
        registerBtnListener: PropTypes.func.isRequired,
    }

    homeHeader() {
        return (
            <div className="css_App-header">
                <div className="css_header_l">
                    <img src={require("../book_icon.png")}  height="80" width="150" />
                    <h1 className="css_App-title">{this.props.title}</h1>
                </div>
                {/* 右边按钮 */}
                <div className="css_header_r">
                    <button className="css_header_button" onClick={()=>{
                            window.open(_HelpPageUrl);
                        }}>帮助中心</button>
                    <button className="css_header_button" onClick={this.props.exitBtnListener}>退出</button>
                </div>

                <div className="css_right css_header_username" >
                    <h5 style = {{margin: 5}}>{this.props.username}</h5>
                </div>

            </div>
        

        );
    }
    loginHeader() {
        return (
            <div className="css_App-header">

                <div className="css_header_l">
                    <img src={require("../book_icon.png")}  height="80" width="150" />
                    <h1 className="css_App-title">{this.props.title}</h1>
                </div>
                {/* 右边按钮 */}
                <div className="css_header_r">
                        <button className="css_header_button" onClick={()=>{
                            window.open(_HelpPageUrl);
                        }}>帮助中心</button>
                        <button className="css_header_button" onClick={this.props.registerBtnListener}>{this.props.registerBtnName}</button>
                </div>

                {/* 中间文字 */}
                <div className="ver_hor_center">
                        <h3 style={{margin:0}}>基于区块链的图书管理系统</h3>
                        <hr className="css_hr_color_to_transparent"></hr>
                        <h4 style={{margin:0, marginLeft: 35}}>分布式数据库、去中心化的数据存储、防丢失、防篡改。</h4>
                </div>
            </div>
        );
    }

    render(){ 
        const {
            username,
            title,
            isHomeHeader,
            exitBtnListener,
            registerBtnName,
            registerBtnListener,
            
        }=this.props;
        return (
            this.props.isHomeHeader ? this.homeHeader() : this.loginHeader()
        )
    }
}
export default LibHeader;