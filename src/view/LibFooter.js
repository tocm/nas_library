import React, { Component } from 'react';
import PropTypes from 'prop-types';//used by react version >1.5 

import '../App.css';

class LibFooter extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="css_footer_bar" >
                <span className="css_text_margin_0">基于星云链的<a href="../../public/index.html">用户图书管理</a>区块链平台</span>
            
                <div className="css_footer_img">
                <a href="https://incentive.nebulas.io/cn/dappstore.html" target="_blank"><img src={require("../img/nebulas.png")} width="50" height="50"/></a>
                </div>
            </div>
        )
    }
}

export default LibFooter;