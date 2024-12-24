import React, { useEffect, useRef } from 'react';
import './index.less'
// import {Bezier} from '../../vendor/bezier'
const CatEarDraw: React.FC = () =>{
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawCatEar = () =>{
    if (canvasRef.current) {
      const $canvas = canvasRef.current;
      const ctx = $canvas.getContext('2d');    
      const width = $canvas.width;  
      const height = $canvas.height;
      
      if (ctx) {
        // 画布背景渐变色
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#C9E0FC');
        gradient.addColorStop(1, '#FFF');
        ctx.beginPath()
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);


        // 设置线条样式
        ctx.lineWidth = 3;        // 设置线宽
        ctx.strokeStyle = 'rgba(255,255,255,0.5)'; // 设置描边颜色

        ctx.beginPath();
        ctx.moveTo(20, 390);
        ctx.bezierCurveTo(60, 90, 113, 84, 220, 166);
        ctx.bezierCurveTo(255, 34, 323, 23, 495, 226);
        ctx.lineTo(452, 270);
        ctx.quadraticCurveTo(398, 180, 300, 135);
        ctx.bezierCurveTo(275, 260, 230, 260, 133, 190);
        ctx.quadraticCurveTo(110, 240, 90, 360);
        ctx.lineTo(23, 390);
        ctx.stroke();

        const gradient_inner = ctx.createLinearGradient(188, 97, 236, 290); 
        gradient_inner.addColorStop(0, '#c5e7f7');
        gradient_inner.addColorStop(1, '#fff');
        ctx.fillStyle = gradient_inner;
        ctx.fill();
      }
    }
  }
  
  useEffect(() => {
    drawCatEar();

  }, []);

  return <div className="container">
    <canvas ref={canvasRef} width={420} height={320}></canvas>
  </div>
}

export default CatEarDraw
