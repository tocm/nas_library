import React, { Component } from 'react';
import PropTypes from 'prop-types';//used by react version >1.5 
import LibHeader from "./LibHeader"

import '../App.css';
import '../unite_button.css'
import LibInputBox from './LibInputBox';
import LibFooter from './LibFooter';

var style_container= {margin: 200};

var _titleName = "用户登录";
var _sumbitBtnName = "登录";
var _headerRegisterBtnName = "注册";

class LoginPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            isRegister: false,
        };
    }

    static get defaultProps(){
        return {
            submitListener: {},
        }
    }
    static propTypes = {
        submitListener: PropTypes.func.isRequired,
    }

    /**
     * 处理注册与登录 button 的切换
     */
    transferLoginOrRegister() {
        var isClickedRegisterBtn = !this.state.isRegister;
        if(isClickedRegisterBtn) {
            //todo register
            _titleName = "用户注册";
            _sumbitBtnName = "注册并登录";
            _headerRegisterBtnName = "登录"
        } else {
            //todo login
            _titleName = "用户登录";
            _sumbitBtnName = "登录";
            _headerRegisterBtnName = "注册"
        }
        this.refs.input_username.value = "";
        this.refs.input_userpassword.value = "";
        this.setState({isRegister : isClickedRegisterBtn});

    }
    render() {
        const{
            submitListener,
        }=this.props;

        return (
            <div>
            <LibHeader title="星云·图书管理" 
            registerBtnName={_headerRegisterBtnName}
            registerBtnListener= {()=>{
                //todo go to register ui
               this.transferLoginOrRegister();
            }}/>

            <div className="css_div_login_container" style={{height: 380}}> 
                {/* 左边log */}
                <div className="css_div_login_content_l" >
                    <img src={require("../img/library_ic.png")}/>
                </div>

                {/* 登录信息 */}
                <div className="css_div_login_content_r">
                    <h3 className="css_login_title">{_titleName}</h3>
                    <h5 className="css_login_text">用户名:</h5>
                    <input ref="input_username" className="css_input css_login_input"  placeholder="Enter user name here"/>
                    <h5 className="css_login_text" style={{marginTop: 25}}>密码:</h5>
                    <input ref="input_userpassword" className="css_input css_login_input"  placeholder="Enter user password here"/>

                    <button className="css_button css_login_button"  
                        onClick={() => {
                            var userName = this.refs.input_username.value;
                            var password = this.refs.input_userpassword.value;
                            console.log("the input value is ", userName);
                            
                            if(userName === "" || password === "")
                            {
                                alert("Input username or password incorrect");
                            } else {
                                this.props.submitListener(this.state.isRegister, userName, password)}
                            }

                            
                        }> {_sumbitBtnName} </button>
                </div>
            </div>
            <div style={{marginTop: 10}}>
                <LibFooter />
            </div>
        </div>
        );
    }
}

export default LoginPage;