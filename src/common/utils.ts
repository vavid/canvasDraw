// 圆角矩形
export function roundedRect(ctx:CanvasRenderingContext2D, x:number, y:number, width:number, height:number, radius:number) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.stroke();
}

// 画辅助点
export function drawPoint(ctx:CanvasRenderingContext2D, [x, y]:Array<number>, text:string) {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000';
    
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.stroke();
  
    const OFFSET_X = 6;
    ctx.fillText(text, x + OFFSET_X, y);
  
    ctx.restore();
}
// 打印当前鼠标点击位置的坐标
export function getCanvasOffset(canvas:HTMLCanvasElement) {
    canvas.addEventListener('mousedown', (e:MouseEvent)=>{
        const {left, top} = canvas.getBoundingClientRect();
        console.log('相对于Canvas的坐标:', e.clientX - left, e.clientY - top)
    }, false)
}
  

/**
   * 绘制一条二次贝塞尔曲线
   * @param  {Object} ctx canvas渲染上下文
   * @param  {Array<number>} start 起点
   * @param  {Array<number>} end 终点
   * @param  {number} curveness 曲度(0-1)
   * @param  {number} percent 绘制百分比(0-100)
   */
export function drawQadraticBezierPath( ctx:CanvasRenderingContext2D, start:Array<number>, end:Array<number>, curveness:number, percent:number ) {
    var cp = [
        ( start[ 0 ] + end[ 0 ] ) / 2 - ( start[ 1 ] - end[ 1 ] ) * curveness,
        ( start[ 1 ] + end[ 1 ] ) / 2 - ( end[ 0 ] - start[ 0 ] ) * curveness
    ];
    
    ctx.moveTo( start[ 0 ], start[ 1 ] );
    
    for ( var t = 0; t <= percent / 100; t += 0.01 ) {

        var x = quadraticBezier( start[ 0 ], cp[ 0 ], end[ 0 ], t );
        var y = quadraticBezier( start[ 1 ], cp[ 1 ], end[ 1 ], t );
        
        ctx.lineTo( x, y );
    }
}

function quadraticBezier( p0:number, p1:number, p2:number, t:number ) {
    var k = 1 - t;
    return k * k * p0 + 2 * ( 1 - t ) * t * p1 + t * t * p2;    // 这个方程就是二次贝赛尔曲线方程
}