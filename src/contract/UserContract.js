"use strict";


/**
 * mode
 * UserItem 数据结构对象 
 * @param {*} text 
 */
var UserItem = function(text) {
	if (text) {
        var obj = JSON.parse(text);
        this.userName = obj.userName;
        this.userPassword = obj.userPassword;
        this.userCreateDate = obj.userCreateDate;
        this.userNasAddress = obj.userNasAddress;
        
        
	} else {
        this.userName = "";
        this.userPassword = "";
        this.userCreateDate="";
        this.userNasAddress = "";
	}
};

UserItem.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};
/**
 * Control
 * UserItem object
 * 合约对象，一个合约部署只对应一个合约对象
 */
var UserContractObj = function () {
    LocalContractStorage.defineMapProperty(this, "resp_user", {
        parse: function (text) {
            return new UserItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

UserContractObj.prototype = {
    init: function () {
        // todo
    },

    /**
     * 上传数据到链
     */
    saveUser: function(user_name, user_password, user_createDate) {
        user_name = user_name.trim();
        user_password = user_password.trim();
        user_createDate = user_createDate.trim();
        
        if (user_name === "" || user_password === "" ){
            throw new Error("Sorry, User name or password is null");
        }

        var from_nasAddress = Blockchain.transaction.from;
        var userObject = this.resp_user.get(user_name);
        if (userObject){
            throw new Error("the user has been occupied");
        }

        var userItem = new UserItem();
        userItem.userName = user_name;
        userItem.userPassword = user_password;
        userItem.userCreateDate = user_createDate;
        userItem.userNasAddress = from_nasAddress;
        this.resp_user.put(user_name, userItem);
        
    },

    /**
     * 获得数据 by user_name
     */
    getUser: function(user_name) {
        user_name = user_name.trim();
        if (user_name === "") {
            throw new Error("Sorry, Not exist user name.")
        }
        
        return this.resp_user.get(user_name);
    },

};
module.exports = UserContractObj;