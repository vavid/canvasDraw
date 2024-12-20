import React, { useEffect, useRef } from 'react';
import './index.less'
// import {Bezier} from '../../vendor/bezier'
const SimpleDraw: React.FC = () =>{
  const simleRef = useRef<HTMLCanvasElement>(null);
  const drawSimle = () =>{
    if (simleRef.current) {
      const simle = simleRef.current;
      const ctx = simle.getContext('2d');
      
      if (ctx) {
        // 画布背景渐变色
        const gradient = ctx.createLinearGradient(0, 0, 0, 500);
        gradient.addColorStop(0, '#C9E0FC');
        gradient.addColorStop(1, '#FFF');
        ctx.beginPath()
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 500);


        // 设置线条样式
        ctx.lineWidth = 2;        // 设置线宽
        ctx.strokeStyle = 'rgba(255,255,255,0.3)'; // 设置描边颜色
        ctx.beginPath();

        // 耳朵-上轮廓-左
        const top_l1_begain = { x: 10, y: 320 };
        const top_l1_end = { x: 190, y: 210 };
        ctx.moveTo(top_l1_begain.x, top_l1_begain.y); 
        const top_l1_cp1 = { x: 25, y: 33 };
        const top_l1_cp2 = { x: 100, y: 66 };
        ctx.bezierCurveTo(top_l1_cp1.x, top_l1_cp1.y, top_l1_cp2.x, top_l1_cp2.y, top_l1_end.x, top_l1_end.y); 

        // 耳朵-上轮廓-右
        const top_l2_begain = top_l1_end;
        const top_l2_end = { x: 400, y: 300 };
        ctx.moveTo(top_l2_begain.x, top_l2_begain.y); 
        const top_l2_cp1 = { x: 220, y: 30 };
        const top_l2_cp2 = { x: 320, y: 24 };
        ctx.bezierCurveTo(top_l2_cp1.x, top_l2_cp1.y, top_l2_cp2.x, top_l2_cp2.y, top_l2_end.x, top_l2_end.y); 

        
        // 耳朵-下轮廓-左
        const bottom_l1_begain = { x: 50, y: 320 };
        const bottom_l1_end = { x: 140, y: 200 };
        ctx.moveTo(bottom_l1_begain.x, bottom_l1_begain.y); 
        const bottom_l1_cp1 = { x: 40, y: 150 };
        const bottom_l1_cp2 = { x: 100, y: 120 };
        ctx.bezierCurveTo(bottom_l1_cp1.x, bottom_l1_cp1.y, bottom_l1_cp2.x, bottom_l1_cp2.y, bottom_l1_end.x, bottom_l1_end.y);
        
        // 耳朵-下轮廓-中间
        const bottom_l2_begain = bottom_l1_end;
        const bottom_l2_end = { x: 230, y: 200 };
        ctx.moveTo(bottom_l2_begain.x, bottom_l2_begain.y); 
        const bottom_l2_cp = { x: 210, y: 300 };
        ctx.quadraticCurveTo(bottom_l2_cp.x, bottom_l2_cp.y, bottom_l2_end.x, bottom_l2_end.y)

        // 耳朵-下轮廓-右
        const bottom_l3_begain = bottom_l2_end;
        const bottom_l3_end = { x: 350, y: 300 };
        ctx.moveTo(bottom_l3_begain.x, bottom_l3_begain.y); 
        const bottom_l3_cp1 = { x: 240, y: 80 };
        const bottom_l3_cp2 = { x: 320, y: 120 };
        ctx.bezierCurveTo(bottom_l3_cp1.x, bottom_l3_cp1.y, bottom_l3_cp2.x, bottom_l3_cp2.y, bottom_l3_end.x, bottom_l3_end.y);
        
        // 关闭路径
        // ctx.closePath();
       
        
        // const gradient_separate = ctx.createRadialGradient(160, 80, 200, 280, 140, 10);
        // gradient_separate.addColorStop(0, '#00f');
        // gradient_separate.addColorStop(1, '#fff');

        // ctx.fillStyle = gradient_separate;
        // ctx.fill();

        ctx.stroke();     // 描边路径
      }
    }
  }
  
  useEffect(() => {
    drawSimle();

  }, []);

  return <div className="container">
    <canvas ref={simleRef} width="400" height="500"></canvas>
  </div>
}

export default SimpleDraw
