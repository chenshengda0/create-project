#!/usr/bin/env node
const mysql = require("mysql");

class WithMysql{

    private static Instance:any;

    static async getInstance(){
        if( !WithMysql.Instance ){
            WithMysql.Instance = mysql.createPool( {
                // @ts-ignore
                host: address,
                // @ts-ignore
                user: MYSQL_USER,
                // @ts-ignore
                port: MYSQL_PORT as unknown as number,
                // @ts-ignore
                password: MYSQL_PASSWORD,
                // @ts-ignore
                database: MYSQL_DATABASE,
                // @ts-ignore
                charset: MYSQL_CHARSET,
                multipleStatements: true,
            } )
        }
        return  WithMysql.Instance;
    }
    
}


export default WithMysql;