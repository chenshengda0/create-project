import downloadPng from "./statics/download.png"

export default class Save{
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
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ] )
        Save.img = new Image();
        Save.img.src = downloadPng;
        return this;
    }

    draw(ctx:any){
        ctx.save()
        ctx.setTransform( ...matrix2D( this.matrix ) )
        ctx.drawImage( Save.img, 0, 0, Save.img.width, Save.img.height, 0, 0, this.cwidth, this.cheight )
        ctx.restore()
        return this;
    }



    inArea(x:number, y:number){
        const currentX = x - this.offset.left;
        const currentY = y - this.offset.top;
        return currentX >= 0 && currentX <= this.cwidth && currentY >= 0 && currentY <= this.cheight;
    }

}