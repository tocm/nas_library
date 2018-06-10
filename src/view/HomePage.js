import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LibInputBox from './LibInputBox';
import LibHeader from './LibHeader';
import LibList from './LibList';
import Utils from '../Utils';
import LibFooteer from './LibFooter';
import '../home.css';
import '../App.css';


class HomePage extends Component{
    constructor(props){
        super(props);
    }

    

    static get defaultProps(){
        return {
            username : "",
            loginEntryTime: Utils.getCurrentTimes(),
            listDataArrays: [],
            submitSaveListener : ()=>{},
            listAllListener : ()=>{},
            delItemListener: ()=>{},
            toggleItemListener: ()=>{},
            isShowAddPage: false,
            addItemListener: ()=>{},
            pageQueryListener: ()=>{},

            exitBtnListener: ()=>{},
            helpBtnListener: ()=>{},
            
        }
    }
    static propTypes(){
        username: PropTypes.string.isRequired;
        loginEntryTime: PropTypes.string.isRequired;
        listDataArrays: PropTypes.arrayOf(PropTypes.object).isRequired;
        submitSaveListener: PropTypes.func.isRequired;
        listAllListener: PropTypes.func.isRequired;
        isShowAddPage: PropTypes.bool.isRequired;
        delItemListener: PropTypes.func.isRequired;
        toggleItemListener: PropTypes.func.isRequired;
        addItemListener: PropTypes.func.isRequired;
        pageQueryListener: PropTypes.func.isRequired;
        exitBtnListener: PropTypes.func.isRequired;
        helpBtnListener: PropTypes.func.isRequired;
    }

    listBookPage(){
        console.log("listBookPage => "+this.props.listDataArrays);
        return(
            <div className="css_div_display_content_container">
                <h1 className="css_allDataList_title css_hor_center" > 书架存放信息</h1>

                <LibList 
                    data_arrays={this.props.listDataArrays} 
                    toggleItemListener={this.props.toggleItemListener}
                    deleteItemListener={this.props.delItemListener}
                    />
                
                <div className="css_right" style={{marginRight: 100}}>
                    <p> 
                    <span className="css_paging_text" onClick={()=>{this.props.pageQueryListener("home")}}> 首页 </span> 
                    | <span className="css_paging_text" onClick={()=>{this.props.pageQueryListener("prev")}}> 上一页 </span> 
                    | <span className="css_paging_text" onClick={()=>{this.props.pageQueryListener("next")}}> 下一页 </span>
                    | <span className="css_paging_text" onClick={()=>{this.props.pageQueryListener("end")}}> 尾页 </span>
                    </p>
                </div>
                <div style={{marginLeft: 150, marginTop: 50, marginBottom: 50}}> 
                    <button className="css_button css_addNewItem_button " onClick={() => {
                        console.log("to add new item todo ");
                        this.props.addItemListener();
                        
                    }}>添加新记录</button>  
                </div>
                    
                
            </div>
        )
    }
    addBookPage() {
      return (
        <div className="css_div_add_content_container"> 
        <h1 className="css_addItem_text_title">添加新记录</h1>
        <table className="css_div_table">
        <tbody>
            <tr>
            <td className="css_div_table_td" ><span className="css_div_text_alert">*</span>书名：</td>
            <td><input className="css_input css_input_addcontent_width" ref="book_name" id={100} type="text" placeholder="请输入书本的名称" autoFocus={true}/></td>
          
            </tr>
            <tr>
            <td className="css_div_table_td"><span className="css_div_text_alert">*</span>作者：</td>
            <td><input className="css_input css_input_addcontent_width"  ref="author" id={101} type="text" placeholder="请输入书本作者名称" autoFocus={false}/></td>
            
            </tr>

            <tr>
            <td className="css_div_table_td" ><span className="css_div_text_alert">*</span>出版社：</td>
            <td> <input className="css_input css_input_addcontent_width"  ref="publishing" id={102} type="text" placeholder="请输入出版社名称" autoFocus={false}/></td>
            </tr>


            <tr>
            <td className="css_div_table_td" ><span className="css_div_text_alert">*</span>出版日期：</td>
            <td> <input className="css_input css_input_addcontent_width"  ref="date" id={103} type="text" placeholder="请输入书本出版日期" autoFocus={false}/></td>
            
            </tr>

            <tr>
            <td className="css_div_table_td" ><span className="css_div_text_alert">*</span>存放位置：</td>
            <td><input className="css_input css_input_addcontent_width"  ref="location" id={104} type="text" placeholder="请输入书本存放位置" autoFocus={false}/></td>
            
            </tr>

            <tr>
            <td> <span className="css_div_table_td" style={{marginLeft: 10}}> 备注：</span> </td>
            <td><textarea className="css_input css_input_addcontent_width" ref="desc" id={105} style={{height: 180}} type="text" placeholder="备注信息" autoFocus={false}/></td>
            </tr>
            <tr>
                {/* 合并单元列 */}
            <td colspan='2'> <span className="css_div_table_td" style={{paddingLeft: 10}}> 注意：带 * 为必填项</span></td>
            </tr>
            <tr>
                <td>
                    <button className="css_button css_addItem_button"
                            onClick={() => {
                                var bookName = this.refs.book_name.value;
                                var bookAuthor = this.refs.author.value;
                                var bookPublishing = this.refs.publishing.value;
                                var bookDate = this.refs.date.value;
                                var location = this.refs.location.value;
                                var description = this.refs.desc.value;
                                if(bookName === "")
                                {
                                    alert("请输入书名！");
                                    return;
                                } 
                                if(bookAuthor === ""){
                                    alert("请输入书名作者");
                                    return;
                                }
                                if(bookPublishing === ""){
                                    alert("请输入出版日期");
                                    return;
                                }
                                if(bookDate === ""){
                                    alert("请输入书出版日期");
                                    return;
                                }
                                if(location === ""){
                                    alert("请输入存放位置");
                                    return;
                                }

                                /**
                                 *  userName : "",
                                    bookName : "",
                                    bookAuthor : "",
                                    bookDate : "",
                                    bookLocation : "",
                                    userNasAddress : "",
                                    id : "",
                                */
                                var jsonData = {"userName": this.props.username, "bookName": bookName, "bookAuthor": bookAuthor, "bookPublishing": bookPublishing, "bookDate": bookDate, "bookLocation": location, "description": description};
                                console.log("the input value is ", jsonData);
                                
                                if(jsonData === "")
                                {
                                    alert("Please input username.");
                                } else {
                                    this.props.submitSaveListener(JSON.stringify(jsonData))}
                                }
                            }> 提交保存 </button>
                </td>
                <td>
                    <button className="css_button css_addItem_button"
                    onClick={() => {
                        this.props.listAllListener()
                    }}> 查询所有记录 </button>
                    
                </td>
            </tr>
        </tbody>
        </table>
       
        </div>)
    }

    render(){
        const{
            username,
            loginEntryTime,
            listDataArrays,
            submitSaveListener,
            listAllListener,
            delItemListener,
            toggleItemListener,
            addItemListener,
            isShowAddPage,
            pageQueryListener,
            exitBtnListener,
            helpBtnListener,
        }=this.props;

        console.log("isShowAddpage = "+this.props.isShowAddPage);
        return (
            <div>
            <LibHeader username={"欢迎您："+this.props.username +"    登入时间为："+this.props.loginEntryTime} title="星云·图书管理"  isHomeHeader={true} 
            exitBtnListener={this.props.exitBtnListener}
            helpBtnListener={this.props.helpBtnListener}/>
            
            {this.props.isShowAddPage ? this.addBookPage() : this.listBookPage()}
            <LibFooteer/>

            </div>

        );
    }
}

export default HomePage;


