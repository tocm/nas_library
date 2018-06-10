import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import LoginPage from "./view/LoginPage"
import LibHeader from './view/LibHeader';
import HomePage from './view/HomePage';

// import NebPay from 'nebpay';//[只针对直接使用npm install 方式]
import Nebulas from 'nebulas';
import AppConfig from './AppConfig'
import Utils from './Utils';

let _userName = "";
let _loginEntryTime = "";

var _dapp_host = AppConfig.getDappHttpRequestHost();
var _dapp_userContractAddress = AppConfig.getDappUserContractAddress();
var _dapp_libraryContractAddress = AppConfig.getDappLibraryContractAddress();
var _accountAddress = AppConfig.getAccountAddress();

var serialNumber; //交易序列号
var PAGE_ITEM_MAX_COUNT = 10;
var _currentPageNumber = 0;


//load the nebPay [针对直接使用npm install 方式，由于在es6 中npm run build 会有问题]
// var nebPay = new NebPay();

var NebPay = require("./dist/nebpay");
var nebPay = new NebPay();

console.log(nebPay);
console.log("http host = "+_dapp_host);




//load the Nebulas obj
var Neb = Nebulas.Neb; // Neb
var neb = new Neb(new Nebulas.HttpRequest(_dapp_host));
var Account = Nebulas.Account;
var api = neb.api;


/**
 * 获取当前时间
 */
function getCurrentTimes() {
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


/*
var BookItem = {
    userName : "",
    bookName : "",
    bookAuthor : "",
    bookDate : "",
    bookLocation : "",
    userNasAddress : "",
    id : "",
};
*/
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            isGetDataSuccess: false,
            booksArrays: [],
            isAddItem: false,
            
        }
        _currentPageNumber = -1;

        console.log("dapp user contract address = "+_dapp_userContractAddress);
        console.log("dapp library contract address = "+_dapp_libraryContractAddress);
        console.log("dapp account address = "+_accountAddress);

    }

    cbPush = (resp) => {
        console.log("response of push: " + JSON.stringify(resp))
        var intervalQuery = setInterval(() => {
            api.getTransactionReceipt({
                hash: resp["txhash"]
            }).then((receipt) => {
                console.log("提交到区块链的状态")
                // console.log(receipt)
                if (receipt["status"] === 2) {
                    console.log("pending.....")
                } else if (receipt["status"] === 1) {
                    console.log("交易成功......")
                    //清除定时器
                    clearInterval(intervalQuery)
                } else {
                    console.log("交易失败......")
                    //清除定时器
                    clearInterval(intervalQuery)
                }
            });
        }, 5000);

    }

    cbPushRegister = (resp) => {
        console.log("response of push: " + JSON.stringify(resp))
        var intervalQuery = setInterval(() => {
            api.getTransactionReceipt({
                hash: resp["txhash"]
            }).then((receipt) => {
                console.log("提交到区块链的状态")
                // console.log(receipt)
                if (receipt["status"] === 2) {
                    console.log("pending.....")
                } else if (receipt["status"] === 1) {
                    console.log("交易成功......")
                    var confirm =  window.confirm("注册已成功，需要马上登录?"); 
                    if(confirm) {
                        //go to login success
                        this.func_loginSuccess(_userName);
                    }
                    //清除定时器
                    clearInterval(intervalQuery)
                } else {
                    console.log("交易失败......")
                    alert("注册失败");
                    _userName = "";
                    //清除定时器
                    clearInterval(intervalQuery)
                }
            });
        }, 5000);

    }

    func_exitListener = () =>{
        console.log("user exit.....");
        _userName = "";
        this.setState({isLogin : false});
    }

    func_pageQuery = (whereGoPage) => {
        console.log("where page = "+whereGoPage);
        var offset = 0;
        var limit = 10;
        if(whereGoPage === "home") {
            _currentPageNumber = 0;
            limit = PAGE_ITEM_MAX_COUNT;

            this.func_neb_getAllData(_userName, offset, limit);

        } else if(whereGoPage === "prev") {
            if(_currentPageNumber > 0) {
                _currentPageNumber--;
                offset = _currentPageNumber * PAGE_ITEM_MAX_COUNT;
                if(offset <= 0) {
                    limit = PAGE_ITEM_MAX_COUNT;
                } else {
                    limit = offset + PAGE_ITEM_MAX_COUNT;
                }
            }
            this.func_neb_getAllData(_userName, offset, limit);
        } else if(whereGoPage === "next") {
            /**
             * 由于向区块链中请求数据是非同步的，异步操作，所以【下一页】的分页逻辑要放到回调结果才做
             */
            this.func_neb_getSize(_userName, (size) => {
                console.log("go next page from db data size = "+size);
                if((_currentPageNumber + 1) * PAGE_ITEM_MAX_COUNT > size ) {
                    console.log("data > size");
                    offset = _currentPageNumber * PAGE_ITEM_MAX_COUNT;
                    limit = size;
                } else{
                    _currentPageNumber ++;
                    offset = _currentPageNumber * PAGE_ITEM_MAX_COUNT;
                    limit = _currentPageNumber * PAGE_ITEM_MAX_COUNT + PAGE_ITEM_MAX_COUNT;
                }
                this.func_neb_getAllData(_userName, offset, limit);
            });
            
        } else if(whereGoPage === "end") {
            this.func_neb_getSize(_userName, (size) => {
                console.log("go end page from db data size = "+size);
                _currentPageNumber = parseInt(size / PAGE_ITEM_MAX_COUNT);
                console.log("go end page _currentPageNumber = "+_currentPageNumber);
                offset = _currentPageNumber * PAGE_ITEM_MAX_COUNT; 
                limit = size;

                this.func_neb_getAllData(_userName, offset, limit);
            });
        }

        
    }

    func_addItemListener = () => {
        console.log("add item callback ==>");
        
        return this.setState({isAddItem: true, isLogin: true});
    }

    func_delItemListener = (bookName) => {
        console.log("delete item callback ==>");
        this.func_neb_delItem(bookName);
    }

    func_listAllData = () => {
        console.log("func_listAllData ==>"+_userName);
        this.func_neb_getAllData(_userName, 0, PAGE_ITEM_MAX_COUNT);
        return this.setState({
            isLogin: true,
            isAddItem: false,
        });
    }

    /**
     * login button listener
     */
    func_loginBtnListener = (isRegister, userName, password) => {
        var is_register = isRegister;
        var strUsername = userName.trim();
        var strPassword = password.trim();

        console.log("login button clicked with is register ? "+is_register);
        if(isRegister) {
            // 注册处理
            this.func_neb_userRegister(strUsername, strPassword);
        } else {
            //登录处理
           this.func_neb_userLogin(strUsername, strPassword);
        }
        
    }

    func_loginSuccess = (strUsername) => {
        // 登录成功处理
        _userName = strUsername;
        _loginEntryTime = Utils.getCurrentTimes();
        this.func_neb_getAllData(_userName, 0, PAGE_ITEM_MAX_COUNT);

        this.state.isLogin = !this.state.isLogin;

        return this.setState({
            isLogin: this.state.isLogin
        });
    }


    /**
     * 用户登录处理
     */
    func_neb_userLogin = (username, password) => {
        console.log("------- User login Begin -------");
        var from = _accountAddress;
        var value = "0";
        var nonce = "5"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "getUser";
        var callArgs = "[\"" + username + "\"]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs,
        }

        neb.api.call(from, _dapp_userContractAddress, value, nonce, gas_price, gas_limit, contract).then((resp) => {
            console.log("验证帐户资料返回\n")
            console.log(resp)
            console.log(resp["result"])
            var userObject = null;
            if (resp["result"] !== "null") {
                console.log("============get response============");
                userObject = JSON.parse(resp["result"])
                console.log("parse the user json data = " + userObject);
                if(userObject !== null && userObject !== undefined) {
                    var getUsername = userObject.userName;
                    var getUserPassword = userObject.userPassword;
                    var getUserCreateData = userObject.userCreateDate;

                    if(username === getUsername && password === getUserPassword) {
                        // 登录成功处理
                        this.func_loginSuccess(username);
                    } else {
                        alert("密码输入有不正确！请重试或者先注册。");
                    }
                    
                } else {
                    alert("用户不存在，请先注册！");
                }
                
            } else {
                console.log("-----------get null --------------");
                alert("用户不存在，请先注册！");
            }
        }).catch(function (err) {
            console.log("error:" + err.message);
            alert("登录失败，内部出错！");
        });
       
    }

    /**
     * 用户提交注册
     */
    func_neb_userRegister = (userName, password) => {
        console.log("-------- User register Begin-----------");
        var strUsername = userName.trim();
        var strPassword = password.trim();
        var strCreateDate = Utils.getCurrentTimes();

        _userName = strUsername;

        var to = _dapp_userContractAddress; //Dapp的合约地址
        var value = "0";
        var callFunction = "saveUser";
        var callArgs = "[\"" + strUsername + "\",\"" + strPassword + "\",\"" + strCreateDate + "\"]";  
        console.log("====> register contract address "+to +", callArgs ", callArgs);
        var options = {
            goods: { 
                name: "UserInfo"
            },
            //callback 是交易查询服务器地址,
        //    callback: (AppConfig.getNetType() == 1) ? NebPay.config.testnetUrl : NebPay.config.mainnetUrl, //在测试网查询
            listener: this.cbPushRegister //设置listener, 处理交易返回信息
        }

        //发送交易(发起智能合约调用)
        serialNumber = nebPay.call(to, value, callFunction, callArgs, options);
        console.log("-------- User register End-----------");
    }
    

    /**
     * submit data
     * 提交新书本记录
     */
    func_neb_dataSubmitSaveListener = (submitJsonData) => {
        console.log("submitSaveListener ", submitJsonData);
        var bookItem = JSON.parse(submitJsonData);
        console.log("Json parse => " + bookItem);
        var to = _dapp_libraryContractAddress; //Dapp的合约地址
        var value = "0";
        var callFunction = "save";
        var callArgs = "[\"" + bookItem.userName + "\",\"" + bookItem.bookName + "\",\"" + bookItem.bookLocation + "\",\"" + bookItem.bookAuthor + "\",\"" + bookItem.bookPublishing + "\",\"" + bookItem.bookDate +"\",\"" + bookItem.description +"\",\"" + getCurrentTimes() + "\"]"; //参数格式为参数数组的JSON字符串, 比如'["arg"]','["arg1","arg2]'        
        //var callFunction = "saveBook"; //调用的函数名称
        //var callArgs =  "[\"" + _userName + "\",\"" + bookName + "\",\"" + submitJsonData + "\"]";  //参数格式为参数数组的JSON字符串, 比如'["arg"]','["arg1","arg2]'        
        console.log("callArgs ", callArgs);
        var options = {
            goods: { //商品描述
                name: "book"
            },
            //callback 是交易查询服务器地址,
        //    callback: (AppConfig.getNetType() == 1) ? NebPay.config.testnetUrl : NebPay.config.mainnetUrl, //在测试网查询
            listener: this.cbPush //设置listener, 处理交易返回信息
        }

        //发送交易(发起智能合约调用)
        serialNumber = nebPay.call(to, value, callFunction, callArgs, options);

        console.log("交易序列号 = ", serialNumber);
    }

    func_neb_delItem(bookName){
        var from = "n1YRK3SRPxCsJx3z3hvugyMonQZuKYx3n6Z"
        var value = "0";
        var nonce = "12"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "del";
        var callArgs = "[\"" + bookName + "\"]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs,
        }

        neb.api.call(from, _dapp_libraryContractAddress, value, nonce, gas_price, gas_limit, contract).then((resp) => {
            console.log("数据删除完成\n")
            console.log(resp)
            console.log(resp["result"])
            if (resp["result"] !== "null") {
                console.log("============del response============");

            } else {
                console.log("-----------del null --------------");
            }
        }).catch(function (err) {
            console.log("error:" + err.message);
        });
    }

    /**
     * 获取当前用户总的数据size
     * @param {*} username 用户名
     * @param {*} funcGetSizeAction 从链上取回值后执行的函数
     */
    func_neb_getSize(username, funcGetSizeAction) {
        var from = "n1YRK3SRPxCsJx3z3hvugyMonQZuKYx3n6Z"
        var value = "0";
        var nonce = "12"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "getSize";
        var callArgs = "[\"" + username + "\"]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs,
        }

        neb.api.call(from, _dapp_libraryContractAddress, value, nonce, gas_price, gas_limit, contract).then((resp) => {
            console.log("获得size完成\n")
            console.log(resp)
            console.log(resp["result"])
            if (resp["result"] !== "null") {
                console.log("============get response============");
                funcGetSizeAction(resp["result"]);
            } else {
                console.log("-----------get null --------------");
            }
        }).catch(function (err) {
            console.log("error:" + err.message);
        });
    }

    func_neb_get(bookName) {
        var from = "n1YRK3SRPxCsJx3z3hvugyMonQZuKYx3n6Z"
        var value = "0";
        var nonce = "12"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "get";
        var callArgs = "[\"" + bookName + "\"]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs,
        }

        neb.api.call(from, _dapp_libraryContractAddress, value, nonce, gas_price, gas_limit, contract).then((resp) => {
            console.log("数据查询完成\n")
            console.log(resp)
            console.log(resp["result"])
            if (resp["result"] !== "null") {
                console.log("============get response============");

            } else {
                console.log("-----------get null --------------");
            }
        }).catch(function (err) {
            console.log("error:" + err.message);
        });
    }

    func_neb_getAllData(username, offset, limit) {
        console.log("func_neb_getAllData BEGIN ===> " + username +",offset ="+ offset +",limit ="+ limit);
        var from = "n1YRK3SRPxCsJx3z3hvugyMonQZuKYx3n6Z"
        var value = "0";
        var nonce = "12"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "listUserBooks";
        var callArgs = "[\"" + username + "\",\"" + offset + "\",\"" + limit + "\"]"; //in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs,
        }

        neb.api.call(from, _dapp_libraryContractAddress, value, nonce, gas_price, gas_limit, contract).then((resp) => {
            console.log("已保存的数据查询完成\n")
            console.log(resp)
            console.log(resp["result"])
            var respArrays = [];
            if (resp["result"] !== "null") {
                console.log("========================");
                if (resp["result"] != "Error: empty key") {
                    respArrays = JSON.parse(resp["result"])
                    console.log("parse the json data = " + respArrays);

                    this.setState({
                        booksArrays: respArrays,
                        isGetDataSuccess: true
                    });
                }

            } else {
                console.log("-------------------------");
                this.setState({
                    booksArrays: respArrays,
                    isGetDataSuccess: false
                });
            }
        }).catch(function (err) {
            console.log("error:" + err.message);
        });
    }

    goLoginPage() {
        return ( < LoginPage submitListener = {
                this.func_loginBtnListener
            }/>);
    }
    
    goHomePage() {
        console.log("go home => " + this.state.booksArrays);
        return (
            <HomePage username = {
                _userName
            }
            loginEntryTime = {_loginEntryTime}
            submitSaveListener = {
                this.func_neb_dataSubmitSaveListener
            }
            listAllListener = {
                this.func_listAllData
            }
            listDataArrays = {
                this.state.booksArrays
            }
            delItemListener = { 
                this.func_delItemListener 
            }
            addItemListener = {
                this.func_addItemListener
            }
            pageQueryListener = {
                this.func_pageQuery
            }
            exitBtnListener = {
                this.func_exitListener
            }
            isShowAddPage = {this.state.isAddItem}
            />
        );
    }

    render() {
        return (
            this.state.isLogin ? this.goHomePage() : this.goLoginPage()
        )
    }
    
}
    export default App;