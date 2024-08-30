import React, { useEffect, useRef, useState } from 'react';
import Compose from './jsm/Compose.js'
import Track from './jsm/Track.js'
import './stars.less'


const SimpleDraw: React.FC = () =>{
  const webglRef = useRef<HTMLCanvasElement>(null);
  
 
  const drawStars = () => {
    const webgl = webglRef.current;
    const gl = webgl?.getContext('webgl');
      if(gl && webgl){
        webgl.width = window.innerWidth;
        webgl.height = window.innerHeight;
        
        // 设置 webgl 视口，将 -1 到 1 映射为 canvas 上的坐标
        gl.viewport(0, 0, webgl.clientWidth, webgl.clientHeight)
        
        const program = gl.createProgram();
        // 创建一个顶点着色器
        const vertexShader = gl.createShader(gl.VERTEX_SHADER) 
        if(vertexShader){
          // 编写顶点着色器代码
          // 顶点着色器的主要任务是对输入的顶点数据进行变换，以准备它们在光栅化阶段（即转换为像素）的使用。这个变换通常包括模型、视图和投影变换，将顶点从其原始空间（通常是模型空间）转换到裁剪空间
          // gl_Position 就是用来存储这个裁剪空间位置的。它是一个四维向量（vec4），其中前三个分量（x, y, z）表示裁剪空间中的位置，而第四个分量（通常称为w）用于透视除法。在裁剪阶段，x、y和z分量会除以w，得到标准化设备坐标（Normalized Device Coordinates, NDC），这些坐标的范围是[-1, 1]。
          gl.shaderSource(vertexShader, `
            attribute vec4 a_Position; 
            attribute float a_PointSize;
            void main(){
                gl_Position = a_Position; 
                gl_PointSize = a_PointSize; 
            }
          `)
          // 编译着色器
          gl.compileShader(vertexShader)
        }
        

        // 创建一个片元着色器
        // 片段着色器的主要任务是计算每个像素的颜色值，而gl_FragColor就是用来存储和传递这个颜色值的。
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); 
        if(fragmentShader){
          // 编写片元着色器代码
          // gl_FragColor 当前片段（或像素）的最终颜色
          // gl_FragColor的颜色值是在片段着色器的最后确定的，之前的所有操作（如纹理采样、光照计算等）都是为了得到这个最终的颜色值。因此，gl_FragColor的值直接影响到片段最终在屏幕上的显示内容（颜色）
          gl.shaderSource(fragmentShader, `
            precision mediump float;
            uniform vec4 u_FragColor;
            void main(){
                float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
                if(dist < 0.5){
                    gl_FragColor = u_FragColor;
                }else{
                    discard;
                }
            }
          `)
          // 编译着色器
          gl.compileShader(fragmentShader)
        }
         // 创建一个程序
         if(program){
           if(vertexShader) gl.attachShader(program, vertexShader);
           if(fragmentShader) gl.attachShader(program, fragmentShader);
           // 连接程序中的着色器
           gl.linkProgram(program);
           // 设置webgl渲染这个程序
           gl.useProgram(program);

           // 透明度生效的重要设置：开启片元颜色合成功能，BLEND：颜色合成
           gl.enable(gl.BLEND)
           // 透明度生效的重要设置：设置片元合成方式
           gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

           // 在js中获取attribute变量 
           const a_Position = gl.getAttribLocation(program, 'a_Position');
           const a_PointSize = gl.getAttribLocation(program, 'a_PointSize');

           // 获取uniform变量
           const u_FragColor = gl.getUniformLocation(program, 'u_FragColor');

           
           const stars:any = []
           const compose = new Compose()

           gl.vertexAttrib1f(a_Position, 0.1);
           gl.vertexAttrib1f(a_PointSize, 100);

           gl.uniform4f(u_FragColor, 1,0,1,1);
           gl.clearColor(0,0,0,0);
           gl.clear(gl.COLOR_BUFFER_BIT);


           webgl.addEventListener('click', ({clientX, clientY})=>{
               
               const {left, top, width, height} = webgl.getBoundingClientRect();
               const [cssX, cssY] = [
                   clientX - left,
                   clientY - top
               ]
               // 1、解决坐标原点位置的差异
               const [halfWidth, halfHeight] = [width/2, height/2];
   
               // [xBaseCenter, yBaseCenter]是鼠标位减去canbas画布的中心位，得到鼠标基于画布中心的位置
               const [xBaseCenter, yBaseCenter] = [cssX-halfWidth, cssY-halfHeight]
   
               // 解决y方向的差异，因为webgl里面y轴方向和canvas里的y轴方向相反
               const yBaseCenterTop = -yBaseCenter
   
               // 2、解决坐标基地的差异
               const [x, y] = [xBaseCenter / halfWidth, yBaseCenterTop / halfHeight];
               const size = Math.random() * 5 + 2
               const a = 1 //Math.random();
               // const color = {r: n, g: 1-n, b: 1, a: 1}
               const obj = {x, y, size, a}
               stars.push(obj)
   
               // 建立轨道对象
               const track = new Track(obj)
               track.start = new Date()
               track.timeLen = 2000
               track.loop = true
               track.keyMap = new Map([
                   [
                       'a',
                       [
                           [500, a],
                           [1000, 0],
                           [1500, a],
                       ]
                   ]
               ])
               compose.add(track)
               
           })
           function step(){                
               compose.update(new Date())
               render()
               requestAnimationFrame(step) // requestAnimationFrame 提供了高效的方式处理动画，它只在浏览器需要重绘时才运行代码，避免了再不需要动画帧时的不必要运行，其执行频率依赖屏幕刷新率，通常是60HZ（每秒60次）
           }
           step()
           function render(){
                if(!gl) return
               gl.clear(gl.COLOR_BUFFER_BIT);
               stars.forEach(({x, y, size, a}:any)=>{
                   gl.vertexAttrib2f(a_Position, x, y)
                   gl.vertexAttrib1f(a_PointSize, size)
                   // 写法一 uniform4f:
                   // webgl.uniform4f(u_FragColor, color.r, color.g, color.b, color.a)

                   // 写法二 uniform4fv：
                   const arr = new Float32Array([0.87, 0.91, 1, a])
                   gl.uniform4fv(u_FragColor, arr)
                   gl.drawArrays(gl.POINTS, 0, 1);
               })
           }

         }

        
      }
  }

  
    useEffect(() => {
        drawStars()
    }, []);

    return <div className="container">
    <canvas ref={webglRef} className='canvas'></canvas>
  </div>
}

export default SimpleDraw
