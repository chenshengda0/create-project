import {
    debounce,
    debounceBak,
    sleep,

    createAesEnPrivateKey,
    createAesDePrivateKey,
} from "./common"

import {
    getRandom,
    T,
    getAxis,
    matrix3D,
    matrix2css,
    determinant,
    adjoint, 
    perspectiveNO, 
} from "./utils"

export {
    //防抖函數
    debounce,
    debounceBak,
    
    //休眠函數
    sleep,

    //加解密函數
    createAesEnPrivateKey,
    createAesDePrivateKey,

    getRandom,      //获取随机数
    T,              //矩阵转置
    getAxis,        //矩阵乘积
    matrix3D,       //矩阵转数组
    matrix2css,     //矩阵转css
    determinant,    //矩阵行列式
    adjoint,        //伴随矩阵
    perspectiveNO,  //透视矩阵
}