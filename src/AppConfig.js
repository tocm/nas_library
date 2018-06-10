import React, {
    Component
} from 'react';


/**
 * ----------------- Testnet Library contract -----------------
TX Hash	d49c7509da4395f6e5727510d70f80a8b22d0fb883f0ddd0702eaeda8810c471
Contract address	n1eNhAZKhEUdJCxdcdB6WvUT43CEbDwjY8s
TxReceipt Status	success
来自地址	n1YRK3SRPxCsJx3z3hvugyMonQZuKYx3n6Z
目的地址	n1YRK3SRPxCsJx3z3hvugyMonQZuKYx3n6Z
Nonce	21


TX Hash	b0c4829260668c34b1e593e8415eb69e503673b2382a4f32c04f42012ac6cbf9
Contract address	n1naK6fKGufE7iMxZrS2bNnkqBemex6Wst1
TxReceipt Status	success
Nonce	25



TX Hash	2b9c57bb165582f548f16945bc7fe99827b74653ccc44129183c9ba0938e3114
Contract address	n1pzchcCV87PiJa4UDjpaPzKActFxv7fhzE
Nonce	27


TX Hash	39afc17854dbe39d4d37efc52610cc8663b1cc0788d08f3b24abae7996ade7f9
Contract address	n1wnccVF1kptJWvYuD2dU5C5xkxiAYAbF1M


TX Hash	26237e1d97352989e78f2803cfc99facdacb71a1771333ba45e40ed95a7605ec
Contract address	n1umsPbDB2Y4vTQbaTLfP4vxsT7V2LCcNf4



TX Hash	39a8fe2b9b997f04998a8a4f0ef13670970b501433c701707a520ea86e4334e9
Contract address	n1hUNNmFxdyQzT2YAiemVcGs1xzE54FwrH8
TxReceipt Status	success
来自地址	n1YRK3SRPxCsJx3z3hvugyMonQZuKYx3n6Z
Nonce	40


TX Hash	0f9ea2bc54232fd8f1b80b6c741424cada97ad1071f99aaed96e864fbc829ebf
Contract address	n1fD9qnfhkHm73cHUipnjM8NaU8wehEqP5z
Nonce	57

TX Hash	f365778d36e3ee41a79706a63071ce60a7fdeb245968ef986fd07e64c6452482
Contract address	n1s8FadRzQbs7ZWbXqAQGGivv8NidMmWuXi



//----------mainnet nas library contract--------------

TX Hash	127beb4bb5e92aed86ddca57da1e6b4440c3773d9e6e1a0d9ac5900def12d69c
Contract address	n1yT499zuwvAU4yLLHJ9d4M8WcmqjfCWEUf
TxReceipt Status	success
来自地址	n1YRK3SRPxCsJx3z3hvugyMonQZuKYx3n6Z
目的地址	n1YRK3SRPxCsJx3z3hvugyMonQZuKYx3n6Z

 */


/** 
 * *********** Testnetwork User contract **************

TX Hash	1f38527ceb53eede24fcfcc3e458fc7198771d347d4bb65af350de8cb0f1ebf2
Contract address	n1pW8xuSD4QzBNx7L7v9hjyPSphv18MeLPZ


//--------------mainnet user contract ----------

TX Hash	e06746c55a5845ae3e218bda495a14092cab3c315994dc045e3491209936b4d8
Contract address	n1naK6fKGufE7iMxZrS2bNnkqBemex6Wst1
TxReceipt Status	success
来自地址	n1YRK3SRPxCsJx3z3hvugyMonQZuKYx3n6Z
目的地址	n1YRK3SRPxCsJx3z3hvugyMonQZuKYx3n6Z
金额	

0
≈ 0 Wei
Nonce	25

*/



 /**
  * 部署合约 host
  */
const DAPP_HTTPREQUEST_HOST_LOCAL_NET = "http://localhost:8086";
const DAPP_HTTPREQUEST_HOST_TEST_NET = "https://testnet.nebulas.io";
const DAPP_HTTPREQUEST_HOST_MAIN_NET = "https://mainnet.nebulas.io";


/**
 * Dapp [数据模块] contract address 对应合约 “HomeLibraryContract.js”
 */
const LOCALNET_DAPP_LIBRARY_CONTRACT_ADDRESS = "";
const TESTNET_DAPP_LIBRARY_CONTRACT_ADDRESS = "n1s8FadRzQbs7ZWbXqAQGGivv8NidMmWuXi";
const MAINNET_DAPP_LIBRARY_CONTRACT_ADDRESS = "n1yT499zuwvAU4yLLHJ9d4M8WcmqjfCWEUf";

/**
 * Dapp [用户模块] contract address 对应合约 "UserContract.js"
 */
const LOCALNET_DAPP_USER_CONTRACT_ADDRESS  = "";
const TESTNET_DAPP_USER_CONTRACT_ADDRESS  = "n1pW8xuSD4QzBNx7L7v9hjyPSphv18MeLPZ";
const MAINNET_DAPP_USER_CONTRACT_ADDRESS = "n1naK6fKGufE7iMxZrS2bNnkqBemex6Wst1";

/**
 * 账本地址
 */
const ACCOUNT_ADDRESS = "n1YRK3SRPxCsJx3z3hvugyMonQZuKYx3n6Z";

class AppConfig extends Component{

    /**
     * return 0 is mainnet, 1 is testnet, 2 is localnet
     */
    static getNetType(){
        return 0; //1;
    }

    /**
     * 获取host
     * @param {*} applyNetType 0 is mainnet, 1 is testnet, 2 is localnet
     */
    static getDappHttpRequestHost() {
        var applyNetType = this.getNetType();
        console.log("getDappHttpRequestHost applyNetType ? "+applyNetType);
        if(applyNetType === 1) {
            return DAPP_HTTPREQUEST_HOST_TEST_NET;
        } else if(applyNetType === 2) {
            return DAPP_HTTPREQUEST_HOST_LOCAL_NET;
        } else {
            return DAPP_HTTPREQUEST_HOST_MAIN_NET;
        }
    }

    /**
     * 合约地址
     * Dapp [用户模块] contract address 对应合约 "UserContract.js"
     * @param {*} applyNetType 0 is mainnet, 1 is testnet, 2 is localnet
     */
    static getDappUserContractAddress() {
        var applyNetType = this.getNetType();
        console.log("getDappUserContractAddress applyNetType ? "+applyNetType);
        if(applyNetType === 1) {
            return TESTNET_DAPP_USER_CONTRACT_ADDRESS;
        } else if(applyNetType === 2) {
            return LOCALNET_DAPP_USER_CONTRACT_ADDRESS;
        } else {
            return MAINNET_DAPP_USER_CONTRACT_ADDRESS;
        }
    }


    /**
     * 合约地址
     * * Dapp [数据模块] contract address 对应合约 “HomeLibraryContract.js”
     * @param {*} applyNetType 0 is mainnet, 1 is testnet, 2 is localnet
     */
    static getDappLibraryContractAddress() {
        var applyNetType = this.getNetType();
        console.log("getDappLibraryContractAddress applyNetType ? "+applyNetType);
        if(applyNetType === 1) {
            return TESTNET_DAPP_LIBRARY_CONTRACT_ADDRESS;
        } else if(applyNetType === 2) {
            return LOCALNET_DAPP_LIBRARY_CONTRACT_ADDRESS;
        } else {
            return MAINNET_DAPP_LIBRARY_CONTRACT_ADDRESS;
        }
    }



    /**
     * 账本地址
     * User account address
     */
    static getAccountAddress() {
        return ACCOUNT_ADDRESS;
    }


    render(){
        return;
    }
}

export default AppConfig;