#!/usr/bin/env node
import Web3 from "web3";
const dns = require('dns');

class WithWeb3{

    private static Instance:WithWeb3;

    private constructor(){

    }

    static async getInstance(){
        if( !WithWeb3.Instance ){
            WithWeb3.Instance = new Web3( "https://bsc-dataseed1.binance.org" );
        }
        return WithWeb3.Instance;
    }

}

export default WithWeb3;