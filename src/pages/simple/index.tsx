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
  const linearGradientRef = useRef<HTMLCanvasElement>(null);
  const radialGradientRef = useRef<HTMLCanvasElement>(null);
  const heartRef = useRef<HTMLCanvasElement>(null);
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
        ctx.lineWidth = 5;  // 设置线条粗细，默认是1.0

        // 贝塞尔曲线渐变颜色
        const gradient = ctx.createLinearGradient(50, 50, 250, 50);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(1, 'blue');
        // 设置渐变为描边样式
        ctx.strokeStyle = gradient;

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
        ctx.lineWidth = 5;  // 设置线条粗细，默认是1.0
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
        ctx.lineCap = 'round'; //设置线段端点显示的样子。可选值为：butt(默认)，round 和 square
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
      ctx.fillStyle = "rgba(0, 255, 255, 1)";
      // 设置透明度值
      ctx.globalAlpha = 0.5;
      ctx.arc(200, 100, 30, 0, Math.PI*2, true);
      ctx.fill();
      }
    }
  }

  const drawLinearGradient = () => {
    const linearGradient = linearGradientRef.current;
    if (linearGradient) {
      const ctx = linearGradient.getContext('2d');
      if (ctx) {
        // 创建线性渐变
        // createLinearGradient(x1, y1, x2, y2)，参数分别为 起点的坐标和终点的坐标。
        const gradient = ctx.createLinearGradient(10, 20, 250, 20);
        // 添加渐变颜色
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.5, 'green');
        gradient.addColorStop(1, 'blue');
        ctx.beginPath()
        ctx.fillStyle = gradient;
        ctx.fillRect(10, 50, 250, 5); // 起点（10,50），宽度250，高度5的容器
      }
    }
  }

  const drawRadialGradient = () => {
    const radialGradient = radialGradientRef.current;
    if (radialGradient) {
      const ctx = radialGradient.getContext('2d');
      if (ctx) {
        // 创建径向渐变
        // createRadialGradient(x0, y0, r0, x1, y1, r1)，参数分别为开始圆和结束圆的 渐变圆心和半径。
        // 1、结束左边为点
        const gradient_dot = ctx.createRadialGradient(75, 35, 40, 75, 35, 0);
        gradient_dot.addColorStop(0, '#f00');
        gradient_dot.addColorStop(1, '#fff');
        // 2、结束坐标为圆
        const gradient_circle = ctx.createRadialGradient(225, 35, 40, 225, 35, 10);
        gradient_circle.addColorStop(0, '#ff770f');
        gradient_circle.addColorStop(1, '#fff');
        // 3、从0.5的位置开始渲染
        const gradient_midway = ctx.createRadialGradient(75, 110, 40, 75, 110, 0);
        gradient_midway.addColorStop(0.5, '#0f0');
        gradient_midway.addColorStop(1, '#fff');
        // 4、开始坐标和结束坐标不一样
        const gradient_separate = ctx.createRadialGradient(155, 80, 200, 280, 140, 10);
        gradient_separate.addColorStop(0, '#00f');
        gradient_separate.addColorStop(1, '#fff');

        ctx.beginPath();
        ctx.fillStyle = gradient_dot;
        ctx.fillRect(5, 5, 140, 60);

        ctx.beginPath();
        ctx.fillStyle = gradient_circle;
        ctx.fillRect(155, 5, 140, 60);

        ctx.beginPath();
        ctx.fillStyle = gradient_midway;
        ctx.fillRect(5, 80, 140, 60);

        ctx.beginPath();
        ctx.fillStyle = gradient_separate;
        ctx.fillRect(155, 80, 140, 60);
      }
    }
  }

  /**
   * 绘制动画的基本步骤
   * 1、清空 canvas：除非接下来要画的内容会完全充满 canvas（例如背景图），否则需要清空所有。最简单的做法就是用 clearRect 方法。
   * 2、保存 canvas 状态：如果要改变 canvas 状态的设置（样式，变形之类的），之后又要在每画一帧之时都是原始状态的情况时，需要先保存一下。
   * 3、绘制动画图形（animated shapes）
   * 4、恢复 canvas 状态：如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。
   */






  const drawHeart = () =>{
    const heart = heartRef.current;
    if(!heart) return;
    const ctx = heart.getContext('2d');
    if(!ctx) return;
    // 画布背景渐变色
    const gradient = ctx.createLinearGradient(0, 0, 0, 150);
    gradient.addColorStop(0, 'pink');
    gradient.addColorStop(0.8, '#FFF');
    ctx.fillStyle = gradient;
    ctx.strokeStyle = '#F00';

    ctx.beginPath()
    ctx.moveTo(75, 40);
    ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
    ctx.fill();
    ctx.stroke();
  }

  const drawSimle = () =>{
    if (simleRef.current) {
      const simle = simleRef.current;
      const ctx = simle.getContext('2d');
      
      // arc(x, y, radius, startAngle, endAngle, anticlockwise)。
      // x和Y为圆心的坐标，radius为半径，startAngle为圆弧或圆的开始位置，endAngle为圆弧或圆的结束位置
      if (ctx) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#0f0';

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
    drawLinearGradient()
    drawRadialGradient()
    drawHeart()
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
    <canvas ref={linearGradientRef}></canvas>
    <canvas ref={radialGradientRef}></canvas>
    <canvas ref={heartRef}></canvas>
    <canvas ref={simleRef}></canvas>
  </div>
}

export default SimpleDraw
