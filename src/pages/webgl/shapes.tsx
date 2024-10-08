import React, { useEffect, useRef, useState } from 'react';


const SimpleDraw: React.FC = () =>{
  const webglRef = useRef<HTMLCanvasElement>(null);
  
 
  const drawInit = () => {
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
            void main(){
                gl_Position = a_Position; 
                gl_PointSize = 20.0; 
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
            void main(){
              gl_FragColor = vec4(1,1,0,1);
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
           

          //一、 设置顶点点位
          //二、 设置顶点点位
          // const vertices = new Float32Array([
          //   // x  y
          //   0.0, 0.2, // 顶点
          //   -0.2, -0.1,
          //   0.2, -0.1
          // ])
          // 三、 设置顶点点位
          // 四、 设置顶点点位
          // 五、 设置顶点点位
          // const vertices = new Float32Array([
          //   // x  y
          //   0.0, 0.3, // v1
          //   -0.2, -0.1, // v2
          //   0.2, -0.1, // v3
          //   0.4, 0.3 // v4
          // ])
          // 六、 设置顶点点位-三角形
          // const vertices = new Float32Array([
          //   // x  y
          //   0.0, 0.3, // v1
          //   -0.2, -0.1, // v2
          //   0.2, -0.1, // v3

          //   0.4, 0.3, // v4
          //   0.2, -0.1, // v5
          //   0.6, -0.1 // v6
          // ])
          // // 七、设置顶点点位-三角带
          // const vertices = new Float32Array([
          //   // x  y
          //   0.0, 0.3, // v1
          //   -0.2, -0.1, // v2
          //   0.2, -0.1, // v3
          //   0.4, 0.3, // v4
          //   0.2, -0.1 // v5
          // ])
          // const vertices = new Float32Array([
          //   -0.2, 0.2,
          //   -0.2, -0.2,
          //   0.2, 0.2,
          //   0.2, -0.2,
          // ])
          // 八、设置顶点点位-三角扇
          const vertices = new Float32Array([
            // x  y
            0.0, 0.3, // v1
            -0.2, -0.1, // v2
            0.2, -0.1, // v3
            0.4, 0.3, // v4
            0.6, -0.1 // v5
          ])
          const vertextBuffer = gl.createBuffer();
          // 绑定缓冲对象
          gl.bindBuffer(gl.ARRAY_BUFFER, vertextBuffer);
          // 写入数据
          gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
          
           // 在js中获取attribute变量 
          const a_Position = gl.getAttribLocation(program, 'a_Position');
          //  修改attribute变量
          gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
          // 开启顶点数据的批处理功能
          gl.enableVertexAttribArray(a_Position)
          

           gl.clearColor(0,0,0,1);
           gl.clear(gl.COLOR_BUFFER_BIT);


           render()
           function render(){
              if(!gl) return
                /**
               * gl.drawArrays可以绘制：
               * POINTS： 点
               * LINES 单独线段
               * LINE_STRIP 线条
               * LINE_LOOP 闭合线条
               * TRIANGLES 单独三角形
               * TRIANGLE_STRIP 三角带
               * TRANGLE_FAN 三角扇
               */

              //  gl.drawArrays(gl.POINTS, 0, 3); // 一、三个点
              //  gl.drawArrays(gl.TRIANGLES, 0, 3); // 二、三角形
              // gl.drawArrays(gl.LINES, 0, 4); // 三、线条：第一个点对应左边线条上，第二个点对应左下；第三个点对应右下，第四个点对应右上
              // gl.drawArrays(gl.LINE_STRIP, 0, 4); // 四、线条：v1->v2->v3->v4
              // gl.drawArrays(gl.LINE_LOOP, 0, 4); // 五、线条：v1->v2->v3->v4->v1
              // gl.drawArrays(gl.TRIANGLES, 0, 6); // 六、三角形

              // gl.drawArrays(gl.TRIANGLE_STRIP, 0, 5); // 七、三角带 v1->v2->v3 v3->v2->v4 v3->v4->v5 
              // 规律：第三个三角形v1-v2-v3
              // 偶数个三角形：以上一个三角形的第二条边+下一个点为基础，以和第二条边相反的方向绘制三角形
              // 奇数个三角形：以上一个三角形的第三条边+下一个点为基础，以和第二条边相反的方向绘制三角形

              gl.drawArrays(gl.TRIANGLE_FAN, 0, 5); // 八、三角扇：v1->v2->v3->v4->v5
           }

         }

        
      }
  }

  
    useEffect(() => {
        drawInit()
    }, []);

    return <div className="container">
    <canvas ref={webglRef} className='canvas'></canvas>
  </div>
}

export default SimpleDraw
