import { Hello as CLS } from "./Hello"
import {
    getRandom,
    T,
    getAxis,
    matrix3D,
    matrix2D,
    matrixCss,
    determinant,
    adjoint,
    perspectiveNO,
    runtimeDecorator, 
} from "./Common"

const matrix = [
    [1, 1, 0],
    [2, 4, 0],
    [0, 0, 1],
]
const amatrix = adjoint( matrix )
const res = getAxis( matrix, amatrix )
const data = getAxis( amatrix, [ [10, 28, 1] ], true )
console.log( "矩阵: ", matrix )
console.log( "伴随矩阵: ", amatrix )
console.log( "矩阵乘积: ", res )
console.log( "结果: ", data )
console.log( matrixCss( [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
] ) )


console.log( process.env )

new CLS("canvas" ).render();