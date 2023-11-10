export const getRandom = function(arr:number[], isInt:boolean = false ){
    const min = Math.min( ...arr )
    const max = Math.max( ...arr )
    const num = Math.random() * ( max - min ) + min;
    return isInt ? Math.round( num ) : num;
}

//二维数组转置
export const T = function(source:number[][]){
    const row = source.length;
    const col = source[0].length;
    const target = Array.from( {length: col}, ()=> Array.from( {length:row}, ()=>0 ) )
    for( let i = 0; i < source.length; ++i ){
        for( let j = 0; j < source[i].length; ++j ){
            target[j][i] = source[i][j]
        }
    }
    return target;
}

//矩阵乘积
export const getAxis = function(left:number[][], right:number[][] = [[0],[0],[0],[1]], isPoint:boolean = false):number[][]{
    const tright = isPoint ? right : T( right );
    if( left[0].length !== tright[0].length) throw new Error("矩阵长度不匹配");
    return new Proxy( function*(){
        for( let n = 0; n < tright.length; ++n ){
            const target = []
            for( let m = 0; m < left.length; ++m ){
                target.push( (function( source:number[], center:number[] ){
                    return source.reduce( (prev:number, cur:number, index:number) => prev + source[index] * center[index], 0 )
                })( left[m], tright[n] ) )
            }
            yield target;
        }
    }, {
        apply(...args){
            const GEN = Reflect.apply( ...args )
            return isPoint ?  [...GEN] : T( [...GEN] );
        }
    } )() as unknown as number[][];
}

//获取4*4方阵
export const matrix3D = function(source:number[][]){
    if( source.length !== 4 || source[0].length !== 4 ) throw new Error("请输入4*4矩阵")
    const tSource = T( source )
    //二维坐标转一维坐标
    const target = new Proxy( function*(){
        for( let i = 0 ; i < tSource.length; ++i ){
            for( let j = 0; j < tSource[i].length; ++j ){
                yield tSource[i][j]
            }
        }
    }, {
        apply(...args){
            return [...Reflect.apply(...args)]
        }
    } )() as unknown as number[];
    return target;
}

//4*4方阵转css
export const matrix2css = function(source:number[][]){
    if( source.length !== 4 || source[0].length !== 4 ) throw new Error("请输入4*4矩阵")
    const tSource = T( source )
    //二维坐标转一维坐标
    const target = new Proxy( function*(){
        for( let i = 0 ; i < tSource.length; ++i ){
            for( let j = 0; j < tSource[i].length; ++j ){
                yield tSource[i][j]
            }
        }
    }, {
        apply(...args){
            const ANS = [...Reflect.apply(...args)]
            return `transform: matrix3d(${ANS.join(",")});`
        }
    } )() as unknown as string;
    return target;
}

//计算n*n方阵行列式值(拉普拉斯展开)
export const determinant = function(source:number[][]){
    if( source.length !== source[0].length || source.length <= 0) throw new Error( "请输入n*n矩阵" )
    const n = source.length;
    switch( true ){
        case n <= 0:
            throw new Error( "请输入n*n方阵" )
        case n === 1:
            return source[0][0];
        case n === 2:
            return source[0][0] * source[1][1] - source[1][0] * source[0][1];
        case n === 3:
            let three = 0;
            const one = Array.from( {length: n}, ()=>Array.from({length: n<<1}, ()=>0) )
            for( let i = 0; i < n; ++i ){
                for( let j = 0; j < (n<<1); ++j ){
                    if( j < n ){
                        one[i][j] = source[i][j]
                    }else{
                        one[i][j] = source[i][j % n]
                    }
                }
            }
            //console.log( one )
            for( let col = 0; col < n; ++col ){
                const DFS = function(c:number = 0, r:number = 0, current:number = 1):number{
                    switch( true ){
                        case r >= n:
                            return current;
                        default:
                            return DFS( c + 1, r + 1, current * one[r][c] )
                    }
                }
                const current = DFS( col )
                three += current;
                //console.log( current, three )
            }

            for( let col = n; col < n<<1; ++col ){
                const DFS = function(c:number = 0, r:number = 0, current:number = 1):number{
                    switch( true ){
                        case r >= n:
                            return current;
                        default:
                            return DFS( c - 1, r + 1, current * one[r][c] )
                    }
                }
                const current = DFS( col )
                three -= current;
                
            }
            //console.log( source, three )
            return three;
        default:
            let four = 0;
            const first = [ ...source[0] ]
            for( let i = 0; i < first.length; ++i ){
                if( (i&1) === 1 ){
                    four -= new Proxy( function*(index:number){
                        for( let r = 1; r < n; ++r ){
                            const current = []
                            for( let c = 0; c < n; ++c ){
                                if( c !== index ) current.push( source[r][c] )
                            }
                            yield current;
                        }
                    }, {apply: (...args)=>{
                        const result = [...Reflect.apply(...args)]
                        return determinant( result );
                    }} )( i ) as unknown as number * first[i];
                }else{
                    four += new Proxy( function*(index:number){
                        for( let r = 1; r < n; ++r ){
                            const current = []
                            for( let c = 0; c < n; ++c ){
                                if( c !== index ) current.push( source[r][c] )
                            }
                            yield current;
                        }
                    }, {apply: (...args)=>{
                        const result = [...Reflect.apply(...args)]
                        return determinant( result );
                    }} )( i ) as unknown as number * first[i];
                }
            }
            //console.log( source, four )
            return four;
    }
}

//计算伴随矩阵
/*
    param: number[][] 方阵
    tag: 是否需要转齐次矩阵
    return: 伴随矩阵
*/
export const adjoint = function(param:number[][], tag:boolean = false){
    let source:number[][];
    let n:number = 0;
    if( tag ){
        if( param.length !== param[0].length && param.length < 1 ) throw new Error( "请输入n*n矩阵" )
        source = new Proxy( function(){
            const target = Array.from( {length: param.length + 1}, ()=> Array.from( {length: param.length + 1}, ()=>0 ) )
            for( let i = 0; i < param.length; ++i ){
                for( let j = 0; j < param.length; ++j ){
                    target[i][j] = param[i][j]
                }
            }
            target[param.length][param.length] = 1;
            return target;
        }, {apply:(...args)=>Reflect.apply(...args)} )() as unknown as number[][];
        n = source.length;
    }else{
        if( param.length !== param[0].length && param.length < 2 ) throw new Error( "请输入n*n矩阵" )
        source = param;
        n = source.length; 
    }
    switch( true ){
        case n === 2:
            //主对调，副取反
            const two = Array.from( {length:n}, ()=>Array.from( {length:n}, ()=>0 ) )
            two[0][0] = source[1][1];
            two[0][1] = -source[0][1];
            two[1][0] = -source[1][0];
            two[1][1] = source[0][0];
            return two;
        default:
            const target = Array.from( {length: n}, ()=> Array.from( {length: n}, ()=>0 ) )
            for( let i = 0; i < n; ++i ){
                for( let j = 0; j < n; ++j ){
                    target[i][j] = new Proxy( function(row:number , col:number){
                        const temp = []
                        //移除当前行
                        for( let r = 0; r < n; ++r ){
                            if( r !== row ){
                                temp.push( [...source[r]] )
                            }
                        }
                        //转置数组
                        const ttemp = T( temp );
                        const tans = [];
                        for( let c = 0; c < n; ++c ){
                            if( c !== col ){
                                tans.push( [...ttemp[c]] )
                            }
                        }
                        const ans = T( tans ) as unknown as number[][];
                        //返回数组
                        return (-1) ** (row + col) * determinant( ans );
                    }, {apply:(...args)=>Reflect.apply(...args)} )( i, j ) as unknown as number;
                }
            }
            const res = T( target )
            return res;
    }

}

//透视矩阵
export function perspectiveNO(fovy:number, aspect:number, near:number, far:number) {
    const f = 1.0 / Math.tan(fovy / 2);
    const out = Array.from( {length:16}, ()=>0 )
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
      const nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }
    //转二维矩阵
    return new Proxy( function*(){
        //翻转
        out.reverse()
        while( out.length > 0 ){
            const current = []
            for( let i = 0; i < 4; ++i ){
                current.push( out.pop() )
            }
            yield current;
        }
    }, {
        apply(...args){
            const GEN = Reflect.apply( ...args )
            const ANS = [...GEN]
            return T(ANS);
        }
    } )() as unknown as number[][]
}

export const runtimeDecorator = function():MethodDecorator{
    return ( target:any, method:any, descriptor:any )=>{
        descriptor.value = new Proxy( descriptor.value, {
            apply: function(...args){
                console.log(`============================================================START: ${method} ============================================================`)
                try{
                    console.log( "email: ", "chen_shengda@yeah.net" )
                    console.log( "time: ", new Date() );
                    console.log( "args: ", args )
                    return Reflect.apply( ...args )
                }catch(err:any){
                    console.error( err )
                }finally{
                    console.log(`==============================================================END: ${method} ============================================================`)
                }

            }
        } )
    }
} 