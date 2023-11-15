#!/usr/bin/env node
const mysql = require("mysql");

class WithMysql{

    private static Instance:any;

    static getInstance(){
        if( !WithMysql.Instance ){
            WithMysql.Instance = mysql.createPool( {
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                port: process.env.MYSQL_PORT,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                charset: process.env.MYSQL_CHARSET,
                multipleStatements: true,
            } )
        }
        return  WithMysql.Instance;
    }
    
}


export default WithMysql;