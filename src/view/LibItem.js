import React, { Component} from 'react';
import PropTypes from 'prop-types';//used by react version >1.5 
import LibInputBox from './LibInputBox';
import '../home.css';

// var tr_style ={
//     "backgroundColor" : "lightgrey",
//     "border" : "1",
//     "width" : "100%", 
//     "border" : "0", 
//     "cellspacing" : "1", 
//     "cellpadding" : "0",
//     color : "#FFFFFF",
// }

class LibItem extends Component{
    
    //构造函数
    constructor(props){
        super(props);
        this.state = {
            isEidtMode: false
        }
    }

    /**
    * 设置默认值
    */
    static get defaultProps(){
        return {
            bookItem: null,
            isChecked: false,
            aid: 100,
            toggleItem: (params) => { console.log("toggle item ",params)},
            deleteItem: (bookName) => {},
            editItem: (tid) => {},
            isEnableEditMode: false,
        }
    }
    /**
    * 指定属性类型
    */
   static propTypes = {
        bookItem: PropTypes.object.isRequired,
        isChecked: PropTypes.bool.isRequired,
        aid: PropTypes.number.isRequired,
        toggleItem: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        editItem: PropTypes.func.isRequired,
        isEnableEditMode: PropTypes.bool.isRequired,
    }

    /**
     * 刷新状态
     */
    refreshState = () =>{
        this.state.isEidtMode = !this.state.isEidtMode;
        return this.setState({ isEditMode: this.state.isEidtMode});
    }

    /**
     * 只读模式
     */
    readMode = () =>{
        return(
           <td>
            <span style={{margin: 5}} 
                //通过双击键来切换显示/修改 模式
                onDoubleClick= {() =>{
                    //控制是否允许修改
                    if(this.props.isEnableEditMode) {
                        this.refreshState();
                    }
            }}>
            {this.props.bookItem.bookName}
            </span>
            </td>
        )
    };


    drawUI(trStyle){
        return(
            <tr key={'tr_' +this.props.bookItem.id}  className={trStyle}>
                <td align="center">{this.props.bookItem.id}</td>
                {/* 加载不同控件 */}
                {this.readMode()}
                <td>{this.props.bookItem.bookAuthor}</td>
                <td>{this.props.bookItem.bookDate}</td>
                <td>{this.props.bookItem.location}</td>
                <td>{this.props.bookItem.description}</td>
                <td>{this.props.bookItem.time}</td>
            </tr>
        );
    }

    /**
     *    this.userName = "";
        this.userNasAddress = "";
        this.id = "";
		this.bookName = "";
		this.location = "";
        this.bookAuthor = "";
        this.bookDate = "";
     */

    //渲染
    render(){
         //定义属性
         const{
            isChecked,
            bookItem,
            aid,
            toggleItem,
            deleteItem,
            editItem,         
        } = this.props;

        return(
            // 定义不同的tr 色
            this.props.aid % 2 === 0 ? this.drawUI("css_home_evenrowcolor") : this.drawUI("css_home_oddrowcolor")
        )

       
    }
}

export default LibItem;