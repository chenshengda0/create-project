import { UploadsPdfPage as CLS } from "Pages"
const [...args] = Object.setPrototypeOf( {name: "张三", age: 23}, {
    sex: "男",
    *[Symbol.iterator](){
        console.log( Reflect )
        yield* Object.values( Reflect )
    }
} )


console.log( args )
// new CLS( "canvas" ).render();
