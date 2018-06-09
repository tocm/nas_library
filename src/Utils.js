import React, {
    Component
} from 'react';


class Utils extends Component{

    /**
     * 获取当前时间
     */
    static getCurrentTimes() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
        return currentdate;
    }

    /**
     * 设置表格样式
     * @param {} id 
     */
    static tableAltRows(id){
        if(document.getElementsByTagName){
            var table = document.getElementById(id);  
            var rows = table.getElementsByTagName("tr"); 
            for(var i = 0; i < rows.length; i++){        
                if(i % 2 == 0){
                    rows[i].className = "evenrowcolor";
                }else{
                    rows[i].className = "oddrowcolor";
                }      
            }
        }
    } 
    render(){
        return;
    }
}

export default Utils;