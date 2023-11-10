// @ts-nocheck
import bs58 from "bs58"
import CryptoJS from 'crypto-js'
//防抖函数
export const debounce = function(fn, sleep=3000){
    window.timer = null;
    return (...args:any[])=>{
        if( !window.timer ){
            fn.apply( this, args )
        }
        clearTimeout( window.timer );
        window.timer = setTimeout( ()=>{
            console.error( "～防抖函数～" )
            window.timer = null;
        }, sleep )
    }
}

export const debounceBak = (fn, ms=3000)=>{
    let timeoutId
    return function () {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        fn.apply(this, arguments)
      }, ms)
    }
}

//sleep函數
export const sleep = ( wait:number ) => new Promise( (resolve,reject)=> setTimeout( resolve, wait ) )

//加密函数
export const createAesEnPrivateKey = (privateKey:string, AesKey:string, AesIV:string) => {
    // 私钥加密存储本地 ---1.先base58编码，2.再base64编码 3.对称加密
    // const base58address = bs58.encode(Buffer.from(privateKey.value)).toString();
    // // base58编码
    const base58address = bs58.encode(Buffer.from(privateKey)).toString();

    // base64编码
    const base64address = btoa(base58address);
    // 对称加密
    return AesEncode(base64address, JSON.parse( AesKey ), JSON.parse( AesIV ))

    // const aesencode = AesEncode(base58address, getAesKey(), getAesIv())

    // const base64address = btoa(aesencode);
    // return base64address
}

const AesEncode = function(word, key, iv) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    // 对称加密算法主要有AES、DES、3DES / 非对称加密算法主要有RSA、DSA、RCC
    // iv(初始变量)
    // key(加密密钥)
    // mode(加密模式 主要有CBC(默认)、CFB、CTR、OFB、ECB)
    // padding(填充方式 主要有Pkcs7(默认)、Iso97971、AnsiX923、Iso10126、ZeroPadding)
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    let encryptedBase64Data = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    return encodeURIComponent(encryptedBase64Data);
}

//解密函数
// 解密方法
export const createAesDePrivateKey = (privateKey:string, AesKey:string, AesIV:string) => {
    // 私钥加密存储本地 ---1.先对称解密 2.再base64解码   3.base58解码

    // 调用-解密方法
    const aesdecodeaddress = AesDecode(privateKey, JSON.parse( AesKey ), JSON.parse(AesIV) )

    // base64解码
    const decodedbase64address = atob(aesdecodeaddress);

    // base64解码
    // const decodedbase64address = atob(privateKey);
    // 调用-解密方法
    // const aesdecodeaddress = AesDecode(decodedbase64address, getAesKey(), getAesIv())

    // base58解码
    const decodedbase58address = bs58.decode(decodedbase64address);
    return Buffer.from(decodedbase58address).toString();
}

// 解密方法
const AesDecode = function(word, key, iv) {
    word = decodeURIComponent(word)
    let encryptedHexStr = CryptoJS.enc.Base64.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}
