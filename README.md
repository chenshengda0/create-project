# 通用矩阵计算库

## 安装包(前后端通用)

```
    yarn add dreamer-common-def
```

## 包说明

```
    //生成随机数
    declare const getRandom: (arr: number[], isInt?: boolean) => number;

    //数组转置
    declare const T: (source: number[][]) => number[][];

    //矩阵点乘
    declare const getAxis: (left: number[][], right?: number[][], isPoint?: boolean) => number[][];

    //4*4 方阵转matrix2d 数组
    declare const matrix2D: (source: number[][]) => number[];

    //4*4 方阵转matrix3d 数组
    declare const matrix3D: (source: number[][]) => number[];

    //4*4 方阵转css 字符串
    declare const matrixCss: (source: number[][]) => string;

    //计算行列式
    declare const determinant: (source: number[][]) => number;

    //计算伴随矩阵
    declare const adjoint: (param: number[][], tag?: boolean) => number[][];

    //透视矩阵
    declare function perspectiveNO(fovy: number, aspect: number, near: number, far: number): number[][];

    //方法装饰器
    declare const runtimeDecorator: () => MethodDecorator;

    //导出模块
    export { getRandom, T, getAxis, matrix2D, matrix3D, matrixCss, determinant, adjoint, perspectiveNO, runtimeDecorator, };
```