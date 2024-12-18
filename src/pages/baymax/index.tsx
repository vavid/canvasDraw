import React, { useEffect, useRef } from 'react';
// import styles from './index.less';
import './index.less'

const SimpleDraw: React.FC = () =>{
  const simleRef = useRef<HTMLCanvasElement>(null);
  const bayMaxRef = useRef<HTMLCanvasElement>(null);
  const drawSimle = () =>{
    if (simleRef.current) {
      const simle = simleRef.current;
      const ctxDog = simle.getContext('2d');
      
      if (ctxDog) {
        ctxDog.beginPath();
        ctxDog.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
        ctxDog.moveTo(110, 75);
        ctxDog.arc(75, 75, 35, 0, Math.PI, false); // 口 (顺时针)
        ctxDog.moveTo(65, 65);
        ctxDog.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
        ctxDog.moveTo(95, 65);
        ctxDog.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼
        ctxDog.stroke();
      }
    }
  }

  const drawBayMax = () =>{
    if(bayMaxRef.current){
      const bayMax = bayMaxRef.current;
      const ctx = bayMax.getContext('2d');
      if(ctx){
        ctx.beginPath();
        ctx.ellipse(100, 60, 40, 30, 0, 0, 2 * Math.PI); // 头
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(80, 60);
        ctx.arc(80, 60, 6, 0, 2 * Math.PI); // 左眼 
        ctx.lineTo(120, 60);
        ctx.arc(120, 60, 6, 0, 2 * Math.PI); // 右眼
        ctx.fillStyle = 'black'; // 设置填充颜色
        ctx.fill(); 
        ctx.closePath();
        ctx.stroke(); // 鼻梁

        ctx.beginPath(); // 身体轮廓开始
        ctx.moveTo(80, 85);
        ctx.bezierCurveTo(40, 100, 30, 160, 70, 200)  // 左：三次贝塞尔曲线
        ctx.quadraticCurveTo(105, 220, 140, 200); // 下：二次贝塞尔曲线
        ctx.bezierCurveTo(180, 160, 170, 100, 120, 85) // 右
        ctx.stroke(); // 身体轮廓绘制

        ctx.beginPath(); // 左胳膊
        ctx.moveTo(63, 95);
        ctx.bezierCurveTo(45, 110, 20, 150,  50, 168); 
        ctx.stroke(); 

        ctx.beginPath(); // 右胳膊
        ctx.moveTo(160, 168);
        ctx.bezierCurveTo( 185, 150, 170, 110, 140, 95); 
        ctx.stroke(); 

        ctx.beginPath(); // 左腿
        ctx.moveTo(70, 200);
        ctx.bezierCurveTo( 72, 220, 75, 232, 90, 235); 
        ctx.bezierCurveTo( 90, 235, 105, 232, 102, 210); 
        ctx.stroke();

        ctx.beginPath(); // 右腿
        ctx.moveTo(140, 200);
        ctx.bezierCurveTo( 146, 220, 143, 232, 123, 235); 
        ctx.bezierCurveTo( 123, 235, 115, 232, 110, 210);
        ctx.stroke();

        ctx.beginPath(); // 徽章
        ctx.arc(130,120, 12, 0, Math.PI * 2, true); 
        ctx.stroke();
        ctx.beginPath(); 
        ctx.moveTo(118, 123);
        ctx.lineTo(125, 123)
        ctx.lineTo(127, 120)
        ctx.lineTo(133, 120)
        ctx.lineTo(135, 123)
        ctx.lineTo(142, 123)
        ctx.stroke();

      }
      // bayMax.addEventListener('mousemove', (event) => {
      //   const rect = bayMax.getBoundingClientRect();
        
      //   const x = event.clientX - rect.left;
      //   const y = event.clientY - rect.top;
      
      //   console.log('Mouse position on canvas:', x, y);
      // });
    }

  }
  useEffect(() => {
    drawSimle();
    drawBayMax();

  }, []);

  return <div className="container">
    <canvas ref={simleRef}></canvas>
    <canvas ref={bayMaxRef} height={800}></canvas>
  </div>
}

export default SimpleDraw
