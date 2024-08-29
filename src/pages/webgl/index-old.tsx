/**
 * 1. 刷底色和动态刷底色 drawBg()
 */
import React, { useEffect, useRef } from 'react';
// import styles from './index.less';
import './index.less'

import { Color } from 'three' 
// Color https://threejs.org/docs/?q=color#api/zh/math/Color

const SimpleDraw: React.FC = () =>{
  const webglRef = useRef<HTMLCanvasElement>(null);

  // 1. 刷底色和动态刷底色
  const drawBg = () => {
    if (webglRef.current) {
      const webgl = webglRef.current;
      // 三维画笔
      const gl = webgl.getContext('webgl');
      if(gl){
        // 声明颜色
        gl.clearColor(1, 0, 0, 1) // 黄颜色
        // 刷底色
        gl.clear(gl.COLOR_BUFFER_BIT);

        // 建立color对象
        const color = new Color('rgba(255,0,0,1)'); // 红颜色

        // 声明颜色
        gl.clearColor(color.r, color.g, color.b, 1) 
        // 刷底色
        gl.clear(gl.COLOR_BUFFER_BIT);

        const changeColor = () =>{
          color.offsetHSL(0.005, 0, 0);  // SHL 色相、饱和度、亮度；这里只偏移了色相
          
          // 声明颜色
          gl.clearColor(color.r, color.g, color.b, 1) 
          // 刷底色
          gl.clear(gl.COLOR_BUFFER_BIT);
      
          requestAnimationFrame(changeColor); // requestAnimationFrame 它利用浏览器的刷新率来调度动画帧，创建流畅、高效的动画效果，其回调时机是由浏览器控制的，通常在浏览器的下一次重绘之前。这意味着动画的帧率更匹配浏览器的刷新率，通常是每秒60帧，比setTimeout和setInterval更适用于动画。
        }

        changeColor();
        
      }
      
    }
  }

  const drawTriangle = () => {
    if (webglRef.current) {
      const webgl = webglRef.current;
      // 三维画笔
      const gl = webgl.getContext('webgl');
      if(gl){
        // 设置 webgl 视口，将 -1 到 1 映射为 canvas 上的坐标
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

        // 创建一个顶点着色器
        const vertextShader = gl.createShader(gl.VERTEX_SHADER) 
        if(vertextShader){
          // 编写顶点着色器代码
          // 顶点着色器的主要任务是对输入的顶点数据进行变换，以准备它们在光栅化阶段（即转换为像素）的使用。这个变换通常包括模型、视图和投影变换，将顶点从其原始空间（通常是模型空间）转换到裁剪空间
          // gl_Position 就是用来存储这个裁剪空间位置的。它是一个四维向量（vec4），其中前三个分量（x, y, z）表示裁剪空间中的位置，而第四个分量（通常称为w）用于透视除法。在裁剪阶段，x、y和z分量会除以w，得到标准化设备坐标（Normalized Device Coordinates, NDC），这些坐标的范围是[-1, 1]。
          gl.shaderSource(vertextShader, `
            attribute vec4 a_position;
            void main(){
              gl_Position = a_position;
            }
          `)
          // 编译着色器
          gl.compileShader(vertextShader)
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
            uniform vec4 u_color;

            void main(){
              gl_FragColor = u_color; 
            }
          `)
          // 编译着色器
          gl.compileShader(fragmentShader)

          // 创建一个程序
          const program = gl.createProgram();
          if(program){
            if(vertextShader) gl.attachShader(program, vertextShader);
            if(fragmentShader) gl.attachShader(program, fragmentShader);
            // 连接程序中的着色器
            gl.linkProgram(program);
            // 设置webgl渲染这个程序
            gl.useProgram(program);

            // 获取u_color变量位置并赋值
            const colorLocation = gl.getUniformLocation(program, 'u_color')
            gl.uniform4f(colorLocation, 0.93,0, 0.56,1)

            // 获取a_position位置
            const positionLocation = gl.getAttribLocation(program, 'a_position');

            // 创建一个顶点缓冲区，返回其ID，用来存放三角形顶点数据
            const positionBuffer = gl.createBuffer();

            // 将顶点缓冲区对象绑定到 gl.ARRAY_BUFFER
            // 后续对 gl.ARRAY_BUFFER 的操作都会映射到这个缓存
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

            // 将顶点数据加入的刚刚创建的缓存对象
            // 参数二：三角形的单个顶点
            // 因为会将数据发送到 GPU，为了省去数据解析，这里使用 Float32Array 直接传送数据
            // 参数三：表示缓冲区的内容不会经常更改
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
              0, 0.5,
              0.5, 0,
              -0.5, -0.5
            ]), gl.STATIC_DRAW)

            // 开启 attribute 变量，使顶点着色器能够访问缓冲区数据
            gl.enableVertexAttribArray(positionLocation)

            gl.vertexAttribPointer( // 告诉 OpenGL 如何从 Buffer 中获取数据
                positionLocation, // 顶点属性的索引
                2, // 组成数量，必须是1，2，3或4。我们只提供了 x 和 y
                gl.FLOAT, // 每个元素的数据类型
                false, // 是否归一化到特定的范围，对 FLOAT 类型数据设置无效
                0, // stride 步长 数组中一行长度，0 表示数据是紧密的没有空隙，让OpenGL决定具体步长
                0 // offset 字节偏移量，必须是类型的字节长度的倍数。
            )

            gl.clearColor(0, 1, 1, 1) // 设置清空颜色缓冲时的颜色值
            gl.clear(gl.COLOR_BUFFER_BIT) // 清空颜色缓冲区，也就是清空画布

            gl.drawArrays( // 从数组中绘制图元
                gl.TRIANGLES, // 渲染三角形
                0,  // 从数组中哪个点开始渲染
                3   // 需要用到多少个点，三角形的三个顶点
            )
          }


        }
        
      }
    }
  }
  

  
  useEffect(() => {
    // drawBg();
    drawTriangle();

  }, []);

  return <div className="container">
    <canvas ref={webglRef} className='canvas'></canvas>
  </div>
}

export default SimpleDraw
