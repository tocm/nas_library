import React, { Component } from 'react';
import PropTypes from 'prop-types';//used by react version >1.5 

class LibInputBox extends Component {
    static get defaultProps() {
        return {
            id: 100,
            ref: "input_box",
            type: "text",
            style: {width:250, height: 35,  margin:0},
            placeholder: "",
            onKeyDown: ()=>{},
            autoFocus: false,

        }
    }

    static propType = {
        id: PropTypes.number.isRequired,
        ref: PropTypes.any.isRequired,
        type: PropTypes.string.isRequired,
        style: PropTypes.object.isRequired,
        placeholder: PropTypes.string.isRequired,
        onKeyDown: PropTypes.func.isRequired,
        autoFocus: PropTypes.bool.isRequired,
    }

    render(){
        const{
            id,
            ref,
            type,
            style,
            placeholder,
            onKeyDown,
            autoFocus,
        }=this.props;

        return (
            <input {...this.props}/>
        );
    }
}

export default LibInputBox;