/**
 * 动态绘制曲线
 */
import React, { useEffect, useRef } from 'react';
// import styles from './index.less';
import './index.less'

const SimpleDraw: React.FC = () =>{
  const simleRef = useRef<HTMLCanvasElement>(null);
    /**
   * 绘制一条曲线路径
   * @param  {Object} ctx canvas渲染上下文
   * @param  {Array<number>} start 起点
   * @param  {Array<number>} end 终点
   * @param  {number} curveness 曲度(0-1)
   * @param  {number} percent 绘制百分比(0-100)
   */
  function drawCurvePath( ctx:CanvasRenderingContext2D, start:Array<number>, end:Array<number>, curveness:number, percent:number ) {

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
  const drawSimle = () =>{
    if (simleRef.current) {
      const simle = simleRef.current;
      const ctx = simle.getContext('2d');
      
      if (ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000';
        
        var percent = 0;
        
        function animate(): void {
            if(!ctx) return;
            ctx.clearRect( 0, 0, 800, 800 );
            ctx.beginPath();
            drawCurvePath( 
                ctx,
                [ 100, 100 ],
                [ 200, 300 ],
                0.2,
                percent
            );
            ctx.stroke();
            percent = ( percent + 1 ) % 100;
            requestAnimationFrame( animate );
            // @Tips requestAnimationFrame: 每秒钟屏幕刷新60次（基准刷新率），在每次刷新的间隙执行一次回调函数，由系统决定执行时机。
        }
        animate();
      }
    }
  }

  useEffect(() => {
    drawSimle();

  }, []);

  return <div className="container">
    <canvas ref={simleRef} width="800" height="800"></canvas>
  </div>
}

export default SimpleDraw
