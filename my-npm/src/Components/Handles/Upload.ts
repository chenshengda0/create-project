import uploadPng from "./statics/upload.png"

export default class Upload{
    private width:number = 0;
    private height:number = 0;
    private cwidth:number = 30;
    private cheight:number = 30;
    private static img:any;
    private offset:any;
    private matrix:number[][] = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ]

    constructor(props:any){
        Object.assign( this, props );
        this.matrix = getAxis( this.matrix, [
            [1, 0, 0, this.width - this.cwidth],
            [0, 1, 0, this.height - this.cheight],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ] )
        Upload.img = new Image();
        Upload.img.src = uploadPng;
        return this;
    }

    draw(ctx:any){
        ctx.save()
        ctx.setTransform( ...matrix2D( this.matrix ) )
        ctx.drawImage( Upload.img, 0, 0, Upload.img.width, Upload.img.height, 0, 0, this.cwidth, this.cheight )
        ctx.restore()
        return this;
    }

    inArea(x:number, y:number){
        const currentX = x - this.offset.left;
        const currentY = y - this.offset.top;
        return currentX >= (this.width - this.cwidth) && currentX <= this.width && currentY >= (this.height - this.cheight) && currentY <= this.height;
    }
}