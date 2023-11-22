class Show{
    x:number = 100;
    y:number = 100;
    fillStyle:string = "red"
    vx:number = 5;
    vy:number = 5;
    r:number = 50;
    angel:number = 0;
    width:number = 0;
    height:number = 0;
    matrix:number[][] = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ]
    div:any;

    constructor(props:any, parent:any){
        Object.assign( this, props )
        this.matrix = getAxis( this.matrix, [
            [1, 0, 0, this.x],
            [0, 1, 0, this.y],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ] )
        this.div = document.createElement( "div" ) as any;
        this.div.style.background = this.fillStyle;
        this.div.style.width = (this.r << 1)  + "px";
        this.div.style.height = (this.r << 1) + "px";
        this.div.style.borderRadius = "50%";
        this.div.style.transform = `${matrixCss( this.matrix )}`
        this.div.style.position = "relative";
        this.div.style.top = -this.r + "px";
        this.div.style.left = -this.r + "px";
        parent.appendChild( this.div )
        return this;
    }

    update(){
        this.x +=  this.vx;
        this.y += this.vy;
        //边界检测
        if( this.x - this.r <= 0 ){
            this.x = this.r;
            this.vx *= -1;
        }
        if( this.x + this.r >= this.width ){
            this.x = this.width - this.r;
            this.vx *= -1;
        }
        if( this.y - this.r <= 0 ){
            this.y = this.r;
            this.vy *= -1;
        }
        if( this.y + this.r >= this.height ){
            this.y = this.height - this.r;
            this.vy *= -1;
        }
        this.matrix = [
            [1, 0, 0 ,this.x ],
            [0, 1, 0 ,this.y ],
            [0, 0, 1 ,0 ],
            [0, 0, 0 ,1 ],
        ]
        this.div.style.transform = `${matrixCss( this.matrix )}`
    }


}

class CssAni{

    static container:any;
    static offset:any;
    static W:number;
    static H:number;

    constructor(domID:string){
        CssAni.container = document.getElementById( domID )
        CssAni.offset = CssAni.container.getBoundingClientRect();
        CssAni.W = CssAni.container.clientWidth
        CssAni.H = CssAni.container.clientHeight
    }

    render(){

        const s1 = new Show( {
            width: CssAni.W,
            height: CssAni.H,
        }, CssAni.container );

        // setInterval( function(){
        //     s1.update()
        // }, 50 )

        ;(function move(){
            s1.update()
            window.requestAnimationFrame( move )
        })();
        
    }

}



new CssAni( "canvas" ).render();
