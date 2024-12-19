/**
 * 基础图形
 */
import React, { useEffect, useRef } from 'react';
// import styles from './index.less';
import './index.less'

const SimpleDraw: React.FC = () =>{
  const lineRef = useRef<HTMLCanvasElement>(null);
  const fillRectRef = useRef<HTMLCanvasElement>(null);
  const clearRectRef = useRef<HTMLCanvasElement>(null);
  const ellipseRef = useRef<HTMLCanvasElement>(null);
  const quadraticBezierRef = useRef<HTMLCanvasElement>(null);
  const bezierBezierRef = useRef<HTMLCanvasElement>(null);
  const lineJoinRef = useRef<HTMLCanvasElement>(null);
  const opacityRef = useRef<HTMLCanvasElement>(null);
  const simleRef = useRef<HTMLCanvasElement>(null);
  const drawLine = () =>{
    if(lineRef.current){
      const line = lineRef.current;
      const ctx = line.getContext('2d');
      if (ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000';

        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(100, 100);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(120, 100);
        ctx.lineTo(170, 50);
        ctx.stroke();
      }
    }
  }
  const drawFillRect = () =>{
    const fillRect = fillRectRef.current;
    if(fillRect){
      const ctx = fillRect.getContext('2d');
      if(!ctx) return;
      ctx.fillStyle = '#f00';
      ctx.fillRect(50, 25, 200, 100) 
      //fillRect(x, y, width, height) 绘制一个填充的矩形，x和y 是矩形的起点坐标，width和height 是矩形的宽高
    }
  }
  const drawClearRect = () =>{
    const clearRect = clearRectRef.current;
    if(clearRect){
      const ctx = clearRect.getContext('2d');
      if(!ctx) return;
      ctx.fillStyle = '#f00';
      ctx.fillRect(50, 25, 200, 100) 
      ctx.clearRect(75, 50, 100, 40);
    }
  }
  
  const drawEllipse = () =>{
    const ellipse = ellipseRef.current;
    if(ellipse){
      const ctx = ellipse.getContext('2d');
      if(!ctx) return;
      ctx.beginPath();
      // 语法：ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
      // x、y：椭圆的圆心位置
      // radiusX、radiusY：x轴和y轴的半径
      // rotation：椭圆的旋转角度，以弧度表示
      // startAngle：开始绘制点
      // endAngle：结束绘制点
      // anticlockwise：绘制的方向（默认顺时针），可选参数。

      ctx.ellipse(100, 75, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
     ctx.stroke();
    }
  }
  // 二次贝塞尔曲线
  const drawQuadraticBezier = () =>{
    const quadraticBezier = quadraticBezierRef.current;
    if (quadraticBezier) {
      const ctx = quadraticBezier.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        // 起始点-绿色
        ctx.moveTo(50, 50); 
        ctx.arc(50, 50, 5, 0, Math.PI * 2, true)
        ctx.fillStyle = '#0f0';
        ctx.fill();

        // 控制点-蓝色
        const cp1 = { x: 150, y: 140 };
        ctx.beginPath();
        ctx.arc(cp1.x, cp1.y, 5, 0, Math.PI * 2, true)
        ctx.fillStyle = '#00f';
        ctx.fill();

        // 绘制贝塞尔曲线
        ctx.beginPath();
        ctx.moveTo(50, 50); // 起始点
        // quadraticCurveTo(cp1x, cp1y, x, y)，其中cp1x和cp1y为一个控制点，x和y为结束点。
        ctx.quadraticCurveTo(cp1.x, cp1.y, 250, 50);
        ctx.stroke();

        // 终点-红色
        ctx.beginPath();
        ctx.arc(250, 50, 5, 0, Math.PI * 2, true)
        ctx.fillStyle = '#f00';
        ctx.fill();

      }
    }
  }

  // 三次贝塞尔曲线
  const drawbezierBezier = () =>{
    const bezierBezier = bezierBezierRef.current;
    if (bezierBezier) {
      const ctx = bezierBezier.getContext('2d');
      if (ctx) {
        // ctx.bezierCurveTo(cp1x,cp1y, cp2x,cp2y, x, y)
        // 其中cp1x和cp1y为一个控制点，cp2x和cp2y为第二个控制点，x和y为结束点。
        ctx.beginPath();
        // 起始点-绿色
        ctx.moveTo(50, 50); 
        ctx.arc(50, 50, 5, 0, Math.PI * 2, true)
        ctx.fillStyle = '#0f0';
        ctx.fill();

        // 控制点-蓝色
        const cp1 = { x: 100, y: 10 };
        const cp2 = { x: 200, y: 140 };
        ctx.beginPath();
        ctx.arc(cp1.x, cp1.y, 5, 0, Math.PI * 2, true)
        ctx.fillStyle = '#00f';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cp2.x, cp2.y, 5, 0, Math.PI * 2, true)
        ctx.fillStyle = '#00f';
        ctx.fill();

        // 绘制贝塞尔曲线
        ctx.beginPath();
        ctx.moveTo(50, 50); // 起始点
        // quadraticCurveTo(cp1x, cp1y, x, y)，其中cp1x和cp1y为一个控制点，x和y为结束点。
        ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, 250, 50);
        ctx.stroke();

        // 终点-红色
        ctx.beginPath();
        ctx.arc(250, 50, 5, 0, Math.PI * 2, true)
        ctx.fillStyle = '#f00';
        ctx.fill();


      }
    }
  }

  const drawLineJoin = () =>{
    const lineJoin = lineJoinRef.current;
    if (lineJoin) {
      const ctx = lineJoin.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.lineWidth = 20;
        ctx.strokeStyle = '#f00';
        // 设置两线段连接处所显示的样子。可选值为：round, bevel 和 miter(默认)。
        ctx.lineJoin = 'bevel'; // 斜接
        ctx.moveTo(20, 20);
        ctx.lineTo(75, 100);
        ctx.lineTo(100, 20);
        ctx.lineTo(125, 60);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = '#0f0';
        ctx.lineJoin = 'round'; // 圆角
        ctx.moveTo(125, 60);
        ctx.lineTo(150, 100);
        ctx.lineTo(175, 20);
        ctx.lineTo(200, 60);

        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = '#00f';
        ctx.lineJoin = 'miter'; // 斜面
        ctx.moveTo(200, 60);
        ctx.lineTo(225, 100);
        ctx.lineTo(250, 20);
        ctx.stroke();



      }
    }
  }

  const drawOpacity = () =>{
    const opacity = opacityRef.current;
    if (opacity) {
      const ctx = opacity.getContext('2d');
      if (ctx) {
        // 绘制一个矩形
      ctx.beginPath();
      // 指定透明度的填充样式
      ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
      ctx.fillRect(10,10,100,120);
      // 绘制一个矩形边框
      ctx.beginPath();
      // 指定透明度的描边样式
      ctx.strokeStyle = "rgba(255, 0, 0, 0.7)";
      ctx.strokeRect(150, 20, 100, 50);
      // 绘制一个圆
      ctx.beginPath()
      ctx.fillStyle = "rgba(255, 255, 0, 1)";
      // 设置透明度值
      ctx.globalAlpha = 0.5;
      ctx.arc(200, 100, 30, 0, Math.PI*2, true);
      ctx.fill();
      }
    }
  }

  const drawSimle = () =>{
    if (simleRef.current) {
      const simle = simleRef.current;
      const ctx = simle.getContext('2d');
      
      // arc(x, y, radius, startAngle, endAngle, anticlockwise)。
      // x和Y为圆心的坐标，radius为半径，startAngle为圆弧或圆的开始位置，endAngle为圆弧或圆的结束位置
      if (ctx) {
        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
        ctx.moveTo(110, 75); 
        // 这里用了.moveTo(); 也可以为每一条路径都设置开启和闭合，如 ctx.beginPath() // 开启路径  ctx.closePath() // 闭合路径
        ctx.arc(75, 75, 35, 0, Math.PI, false); // 口 (顺时针)
        ctx.moveTo(65, 65);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼
        ctx.stroke();

        
      }
    }
  }
  useEffect(() => {
    drawLine();
    drawFillRect()
    drawClearRect()
    drawEllipse();
    drawQuadraticBezier()
    drawbezierBezier()
    drawLineJoin()
    drawOpacity()
    drawSimle();
    

  }, []);

  return <div className="container">
    {/* canvas画布大小，不设置时，默认300*150 */}
    <canvas ref={lineRef}></canvas>
    <canvas ref={fillRectRef}></canvas>
    <canvas ref={clearRectRef}></canvas>
    <canvas ref={ellipseRef}></canvas>
    <canvas ref={quadraticBezierRef}></canvas>
    <canvas ref={bezierBezierRef}></canvas>
    <canvas ref={lineJoinRef}></canvas>
    <canvas ref={opacityRef}></canvas>
    <canvas ref={simleRef}></canvas>
  </div>
}

export default SimpleDraw
