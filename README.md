# canvasDraw

基于umi： https://umijs.org/docs/guides/getting-started


webgl概念：
- canvas
- 着色器语言
GLSL ES 是 OpenGL Shading Language for Embedded Systems（嵌入式系统的 OpenGL 着色语言）的缩写
- GPU硬件
图形处理用到可编程GPU
GPU硬件(渲染管线)、显卡驱动、操作系统、浏览器、WebGL API是逐层抽象的。每一层都会为上一层提供一个接口，这里可以看出WebGL API是 首先通过浏览器的的解析，才能够经过一系列层驱动GPU工作，生成像素缓存，显示器会按照一定的频率扫描像素缓存，最终显示出来。

