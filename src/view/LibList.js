import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LibItem from './LibItem';
import Utils from '../Utils';

var table_style ={
    "backgroundColor" : "#d0e4fe",
    "border" : "1",
    "width" : "100%", 
    "cellspacing" : "1", 
    "cellpadding" : "0",
    "color" : "orange",

}
class LibList extends Component{

    componentDidMount() {
        console.log("libList---componentDidMount---");
        
    }
    shouldComponentUpdate(NEXTPROPS , NEXTSTATE ){
        console.log("libList---shouldComponentUpdate---NEXTPROPS="+NEXTPROPS+", NEXTSTATE="+NEXTSTATE);
        return true;
    }

    static get defaultProps(){
        return {
            data_arrays : [],
            toggleItemListener: ()=>{},
            deleteItemListener: ()=>{},
            editItmeListener: ()=>{},
        }
    }
    static propsTypes={
        data_arrays: PropTypes.arrayOf(PropTypes.object).isRequired,
        toggleItemListener: PropTypes.func.isRequired,
        deleteItemListener: PropTypes.func.isRequired,
        editItmeListener: PropTypes.func.isRequired,
    }
    render() {
        const {
            data_arrays,
            toggleItemListener,
            deleteItemListener,
            editItmeListener,
        }= this.props;

        console.log("==> arrays data =  "+data_arrays);
        return (
            <table id="table_all_data_id" className="altrowstable css_hor_center" >
            <tbody>
                <tr>
                    <th>ID</th>
                    <th>书名</th>
                    <th>书本作者</th>
                    <th>出版社</th>
                    <th>出版日期</th>
                    <th>存放位置</th>
                    <th>备注</th>
                    <th>添加日期</th>
                </tr>
               
                {
                    
                    data_arrays.map((itemObj)=>{
                        console.log("--------test ---itemObj = ",itemObj);
                        return (
                            <LibItem key={itemObj.id}
                                aid={itemObj.id} 
                                isChecked={itemObj.checked} 
                                bookItem={itemObj} 
                                toggleItem={toggleItemListener} 
                                deleteItem={deleteItemListener}
                                editItem={editItmeListener}/>
                            );
                    })
                }
                </tbody>
             </table>
      
        )
    }
}
export default LibList;