"use strict";

var ResponseMsg = {
    "is_success" : false,
    "error_code" : "",
    "error_msg" : "",
};

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
		this.bookName = obj.bookName;
		this.location = obj.location;
        this.bookAuthor = obj.bookAuthor;
        this.bookPublishing = obj.bookPublishing;
        this.bookDate = obj.bookDate;
        this.description = obj.description;
        this.time = obj.time;
        
	} else {
        this.userName = "";
        this.userNasAddress = "";
        this.id = "";
		this.bookName = "";
		this.location = "";
        this.bookAuthor = "";
        this.bookPublishing = "";
        this.bookDate = "";
        this.description = "",
        this.time = ""
	}
};

BookItem.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};
/**
 * Control
 * 合约对象，一个合约部署只对应一个合约对象
 */
var LibraryContractObj = function () {
    LocalContractStorage.defineMapProperty(this, "arrayMapsBooks");//存放多个用户
    LocalContractStorage.defineMapProperty(this, "LibContract", {
        parse: function (text) {
            return new BookItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
    LocalContractStorage.defineProperty(this, "book_id");
};

LibraryContractObj.prototype = {
    init: function () {
        // todo
        this.book_id = 0;
    },

    /**
     * 上传数据到链
     */
    save: function(user_name, book_name, book_loc, book_author, book_publishing, book_date, description, add_time) {

        user_name = user_name.trim();
        book_name = book_name.trim();
        book_loc = book_loc.trim();
        book_author = book_author.trim();
        book_publishing = book_publishing.trim();
        book_date = book_date.trim();
        description = description.trim();
        add_time = add_time.trim();
    
        if (user_name === "" || book_name === "" || book_loc === ""){
            
            throw new Error("Sorry, input is null");
        }
        var libItem = null;
        var from_nasAddress = Blockchain.transaction.from;
        // libItem = this.LibContract.get(book_name);
        // if (libItem){
        //     throw new Error("the book has been occupied");
        // }

        this.book_id +=1;
        libItem = new BookItem();
        libItem.userName = user_name;
        libItem.userNasAddress = from_nasAddress;
        libItem.id = this.book_id;
		libItem.bookName = book_name;
		libItem.location = book_loc;
        libItem.bookAuthor = book_author;
        libItem.bookPublishing = book_publishing;
        libItem.bookDate = book_date;
        libItem.description = description;
        libItem.time = add_time;

        this.LibContract.put(book_name, libItem);
        this.arrayMapsBooks.set(libItem.id - 1,libItem);


    },

    getSize: function(userName) {
        var booksArray = [];
        booksArray = this.getCurrentUserBooks(userName);
        return booksArray.length;
    },

    /**
     * 获得数据 by bookName
     */
    get: function(bookName) {
        bookName = bookName.trim();
        if (bookName === "") {
            throw new Error("Sorry, Not exist user name.")
        }
        
        return this.LibContract.get(bookName);
    },

    /**
     * 获得单条记录 by bookId
     */
    getItemById: function(bookId, userName) {
        bookId = bookId.trim();
        userName = userName.trim();
        if (userName === "" || bookId === "") {
            throw new Error("Sorry, Not exist user name.")
        }
        
        var itemBook = this.arrayMapsBooks.get(bookId);
        if(itemBook === null || itemBook === undefined) {
            return -1;
        }
        if(itemBook.userName === userName) {
            return itemBook;
        }
            
    },

    del: function(key) {
        key = key.trim();
        if(key === "") {
            throw new Error("input error ");
        }
        return this.LibContract.del(key);
    },

    getCurrentUserBooks: function(user_name){
        /*
        this.arrayMapsBooks.filter(function (elem) {
            return elem.userName === user_name;
          });
          */

        var bookArrays = [];  
        for(var i=0; i< this.book_id; i++) {
            var itemBook = this.arrayMapsBooks.get(i);
            if(itemBook === null || itemBook === undefined) {
                continue;
            }
            if(itemBook.userName === user_name) {
                bookArrays.push(itemBook);
            }
        } 


        return bookArrays;
    },

    listUserBooks: function(userName, offset, limit) {
        userName = userName.trim();
        if(userName === null || userName === "" || userName === undefined) {
            throw new Error("not any data ");
        }
        var arr = [];
        limit = parseInt(limit);
        offset = parseInt(offset);

        arr = this.getCurrentUserBooks(userName);


        if(arr.length > 0) {
            if(offset>this.size){
                return arr.slice(offset);
            } else {
                return arr.slice(offset, limit);
            }
        }
        console.log("getAllBooks :: return null ");
       // return {"success" : false, "err_message": "没有任何数据" };
   
        return arr;

    }
};
module.exports = LibraryContractObj;