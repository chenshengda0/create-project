import { Hello as CLS } from "Components"
const stream = require( "stream" )

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

console.log( Buffer.from( "hello world" ) )

console.log( process.env )

console.log( process )

console.log( window )
const blob = new Blob( ["hello world"], {type: "text/plain"} )
const str = new Response( blob.stream().pipeThrough( new TransformStream({
    async transform(chunk, controller){
        try{
            const str = Buffer.from( chunk ).toString()
            const param = {
                code: 200,
                message: "SUCCESS",
                data: str.toLocaleUpperCase(),
            }
            throw new Error( "test" )
            return controller.enqueue( Buffer.from( JSON.stringify(param) ) )
        }catch(err:any){
            const param = {
                code: 500,
                message: err.message,
                data: [],
            }
            return controller.enqueue( Buffer.from( JSON.stringify(param) ) )
        }

    }
}) ) ).json().then( console.log )

console.log( T( [
    [1, 1, 0],
    [2, 4, 0],
    [0, 0, 1],
] ) )
const user:UserName =  "Bob"

console.log( user )


new CLS("canvas" ).render();
