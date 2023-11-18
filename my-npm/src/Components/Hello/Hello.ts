class ShowImage{
    private width:number = 0;
    private height:number = 0;

    private r:number = 100;
    private fillStyle = "red"

    private matrix:number[][] = [ [1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1] ];

    constructor(props:any){
        Object.assign( this, props )
        this.matrix = getAxis( [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ], [
            [1, 0, 0, this.width >> 1],
            [0, 1, 0, this.height >> 1],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ] )
        return this;
    }

    draw(ctx:any){
        ctx.save()
        ctx.fillStyle = this.fillStyle;
        ctx.setTransform( ...matrix2D( this.matrix ) )
        ctx.rotate( 1/3 * Math.PI )
        ctx.beginPath()
        ctx.arc( 0, 0, this.r, 0, Math.PI * 2 )
        ctx.closePath()
        ctx.fill()
        ctx.restore();
    }
}

export default class Hello{
    private static container:any;
    private static offset:any;

    constructor(domID:string){
        Hello.container = document.getElementById( domID )
        Hello.offset = Hello.container.getBoundingClientRect()
    }

    render(){
        const canvas = document.createElement( "canvas" )
        const ctx:any = canvas.getContext( "2d" )
        const W = canvas.width = Hello.container.clientWidth;
        const H = canvas.height = Hello.container.clientHeight;

        console.log( process.env.MATRIX )

        const show = new ShowImage({
            width: W,
            height: H,
            fillStyle: "green",
            r: 80,
        })

        ;( function move(){
            ctx.clearRect( 0, 0, W, H )
            show.draw( ctx )
            window.requestAnimationFrame( move )
        } )()

        Hello.container.appendChild( canvas )
    }
}