//声明 webpack.resolve.alias 模块别名
declare module "Components";
declare module "Common";
declare module "Pages";
declare module "Reduxs";

//图片
declare module "*.png"
declare module "*.jpg"
declare module "*.webp"
declare module "*.gif"

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

declare interface Window{
    storeData: any
};
