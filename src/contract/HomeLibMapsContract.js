"use strict";

/**
 * mode
 * 项目数据结构对象 
 * @param {*} text 
 */
var BookItem = function(text) {
	if (text) {
        var obj = JSON.parse(text);
        this.userName = obj.userName;
        this.userNasAddress = obj.userNasAddress;
        this.id = obj.id;
		this.bookname = obj.bookname;
		this.location = obj.location;
        this.author = obj.author;
        this.date = obj.date;
        
	} else {
        this.userName = "";
        this.userNasAddress ="";
	    this.id = "";
	    this.bookname = "";
        this.location = "";
        this.author = "";
        this.date = "";

	}
};

BookItem.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};

var HomeLibraryContract = function () {
   LocalContractStorage.defineMapProperty(this, "repo_arrayMapUsers");//存放多个用户
   LocalContractStorage.defineMapProperty(this, "repo_arrayMapBooks");//1个用户对应多条记录
   LocalContractStorage.defineMapProperty(this, "repo_bookItems", {//书本记录
        parse: function (text) {
            return new BookItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
   });
   LocalContractStorage.defineProperty(this, "repo_sizeUsers");//总共有多少用户
   LocalContractStorage.defineProperty(this, "repo_sizeBooks");//一个用户有多少条存放记录
};

HomeLibraryContract.prototype = {
    init: function () {
        this.repo_totalUser = 0;
        this.repo_sizeBooks = 0;
    },
    
    /**
     * 保存书资料，以用户index id 为key
     */
    saveBook: function(userName, bookName, bookData) {

        throw new Error("saveBook :: "+ userName +" bookName = "+ bookName +", data "+bookData);
        console.log("saveBook :: entry ======> ");
        //check is existed
        var bookItem = this.getCurrentUserBookItem(userName, bookName);
        if (bookItem){
            throw new Error("the book has been existed");
            return;
        }

        //当前用户id
        var userIndex = this.repo_sizeUsers;
        console.log("saveBook :: userIndex = "+ userIndex);
        //检查用户是否已经存在
        var checkUserName = this.checkUse(userName);
        console.log("saveBook :: checkUserName = "+ checkUserName);
        if(checkUserName  === false) {
            //保存 用户id 对应 用户名 【1对1】如【1:a, 2:b, 3: c】
            this.repo_arrayMapUsers.set(userIndex, userName);
            this.repo_sizeUsers +=1; //用户数加1
        }


        var bookId = this.repo_sizeBooks;
        console.log("saveBook :: bookId = "+ bookId);
        //保存 bookId映射用户 记录表 [多对1] 如：[b1 : aaa, b2: bbb]
        this.repo_arrayMapBooks.set(bookId, userName);//key 不能重复
        
        var from = Blockchain.transaction.from;
        console.log("saveBook :: dapp address = "+ from);
        bookItem = new BookItem(bookData);
        bookItem.userNasAddress = from;
        bookItem.id = bookId;

        //保存对象数据
        this.repo_bookItems.set(bookId, bookItem);
        this.repo_sizeBooks += 1;
        console.log("saveBook :: end ====== ");
    },

    /**
     * 检查用户是否存在
     */
    checkUse: function(user){
        console.log("checkUse :: Begin ====== ");
        for(var i=0; i<this.repo_sizeUsers; i++){
            if(user === this.repo_arrayMapUsers.get(i)){
                return true;
            }
        }
        return false;
    },
   
    /**
     * 获取当前用户应的所有bookid 以及返回指定的bookitem
     */
    getCurrentUserBookItem: function(user, bookName){
        console.log("getCurrentUserBookItem :: Begin ====== ");
        for(var bid=0; bid<this.repo_sizeBooks; bid++){
            if(user === this.repo_arrayMapBooks.get(bid)){
                var bookItem = getBookItem(bid);
                if(bookItem === null || bookItem === "" || bookItem === undefined) {
                    continue;
                }
                if(bookItem.bookName === bookName){
                    return bookItem;
                }
            }
        }
        return null;
    },

    getBookItem: function(bookId) {
        return this.repo_bookItems.get(bookId);
    },

    userSize: function() {
        return this.repo_sizeUsers;
    },

    bookSize: function(){
      return this.repo_sizeBooks;
    },


    
  
    getAllBooks: function(username, limit, offset){

        var total = 0;
        var arr = [];
        limit = parseInt(limit);
        offset = parseInt(offset);
        console.log("getAllBooks :: username = "+ username);
        for(var bid=0; bid<this.repo_sizeBooks; bid++){
            if(username === this.repo_arrayMapBooks.get(bid)){
                var bookItem = getBookItem(bid);
                if(bookItem === null || bookItem === "" || bookItem === undefined) {
                    continue;
                }
                arr.push(bookItem);
            }
        }
        if(arr.length > 0) {
            if(offset>this.size){
                return arr.slice(offset);
            } else {
                return arr.slice(offset, limit);
            }
        }
        console.log("getAllBooks :: return null ");
        return {"success" : false, "err_message": "没有任何数据" };
    }
};

// export default HomeLibraryContract;
module.exports = HomeLibraryContract;