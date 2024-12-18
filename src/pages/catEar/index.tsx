import React, { useEffect, useRef } from 'react';
import './index.less'
// import {Bezier} from '../../vendor/bezier'
const SimpleDraw: React.FC = () =>{
  const simleRef = useRef<HTMLCanvasElement>(null);
  const bayMaxRef = useRef<HTMLCanvasElement>(null);
  const drawSimle = () =>{
    if (simleRef.current) {
      const simle = simleRef.current;
      const ctx = simle.getContext('2d');
      
      if (ctx) {
        // 设置线条样式
        ctx.lineWidth = 40;        // 设置线宽
        ctx.strokeStyle = '#d4effd'; // 设置描边颜色

        // 绘制字母 "M" 使用贝塞尔曲线
        ctx.beginPath();

        // 左耳朵：三次贝塞尔曲线
        ctx.moveTo(100, 318); // 起点
        ctx.bezierCurveTo(80, 100, 105, 90, 160, 160); // 终点 (160, 160)

        // 中间连接
        ctx.quadraticCurveTo(250, 225, 220, 120); // 终点 (220, 120)

        // 右耳朵：贝塞尔曲线
        ctx.bezierCurveTo(194, 70, 219, 64, 346, 174); // 终点 (346, 174)


        
        ctx.stroke();     // 描边路径
      }
    }
  }
  
  useEffect(() => {
    drawSimle();

  }, []);

  return <div className="container">
    <canvas ref={simleRef} width={400} height={500}></canvas>
  </div>
}

export default SimpleDraw
