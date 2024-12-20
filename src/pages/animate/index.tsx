/**
 * 动态绘制曲线
 */
import React, { useEffect, useRef } from 'react';
import './index.less'
import {drawQadraticBezierPath} from '../../common/utils';

const SimpleDraw: React.FC = () =>{
  const translateRef = useRef<HTMLCanvasElement>(null);
  const quadraticBezierRef = useRef<HTMLCanvasElement>(null);
  const clockRef = useRef<HTMLCanvasElement>(null);

  const drawTranslate = () =>{
    if(translateRef.current){
      const translateDemo = translateRef.current;
      const ctx = translateDemo.getContext('2d');
      if(ctx){
        ctx.fillStyle = '#f00';
        // 将坐标系的原点移动到矩形的中心
        const centerX = translateDemo.width / 4;
        const centerY = translateDemo.height / 4;
        
        ctx.save();  // 保存当前画布状态
        ctx.fillRect(10, 10, translateDemo.width/3, translateDemo.height/3)
        ctx.translate(centerX, centerY);
        // 注意：translate() 会影响所有后续的绘图操作，直到画布的坐标系统被重置或再次调整
        ctx.restore();  // 恢复之前保存的画布状态

        // 添加save和restore后可以继续在原始坐标系下绘制
        ctx.fillStyle = 'orange';
        ctx.fillRect(100, 100, 100, 100);  // 绘制一个橙色矩形

        ctx.font = "30px Arial";
        ctx.strokeText("Translate 示例", 50, 100);
      }
    }
  }

  
  
  const drawQadraticBezier = () =>{
    if (quadraticBezierRef.current) {
      const simle = quadraticBezierRef.current;
      const ctx = simle.getContext('2d');
      
      if (ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#f00';
        
        var percent = 0;
        
        function animate(): void {
            if(!ctx) return;
            ctx.clearRect( 0, 0, 800, 800 );
            ctx.beginPath();
            drawQadraticBezierPath( 
                ctx,
                [ 50, 350 ],
                [ 350, 100 ],
                0.7,
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

  const drawClock = () =>{
    const clock = clockRef.current
    if (clock) {
      const ctx = clock.getContext('2d');
      const centerX = clock.width / 2;
      const centerY = clock.height / 2;
      function draw() {
        if(!ctx) return
        const now = new Date();
        const sec = now.getSeconds();
        const min = now.getMinutes();
        const hr = now.getHours() % 12;

        ctx.clearRect(0, 0, 400, 400)

        // 画时针
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec) // 时针角度
        ctx.lineWidth = 3
        ctx.strokeStyle = '#f00'
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -30) // 时针长度
        ctx.stroke()
        ctx.restore()
        
        // 画分针
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec) // 分针角度
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -40) // 分针长度
        ctx.stroke()
        ctx.restore()

        // 画秒针
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(Math.PI * 2 / 60 * sec) // 秒针角度
        ctx.lineWidth = 1
        ctx.lineCap = 'round'
        ctx.strokeStyle = '#00f'
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -80) // 秒针长度
        ctx.stroke()
        ctx.restore()
        requestAnimationFrame(draw)
      }
      draw()
    }
  }

  useEffect(() => {
    drawTranslate();
    drawQadraticBezier();
    drawClock()
  }, []);

  return <div className="container">
    <canvas ref={translateRef}></canvas>
    <canvas ref={quadraticBezierRef}></canvas>
    <canvas ref={clockRef}></canvas>

  </div>
}

export default SimpleDraw
