import React, { useEffect, useRef } from 'react';
import styles from './index.less';

const RoateDraw: React.FC = () =>{
  const rectRef = useRef<HTMLCanvasElement>(null);

  const drawRect = () => {
    if(rectRef.current){
      const rectDemo = rectRef.current;
      const ctx = rectDemo.getContext('2d');
      if(ctx){
        // 将坐标系的原点移动到矩形的中心
        const centerX = rectDemo.width / 2;
        const centerY = rectDemo.height / 2;
        ctx.translate(centerX, centerY);

        // 旋转 45 度
        ctx.rotate( Math.PI / 4 );

        // 绘制蓝色矩形
        ctx.fillStyle = 'blue';
        ctx.fillRect(-40, -25, 80, 50); // 以中心为原点，长80宽50的矩形的左上角坐标为(-40, -25)

      }
    }
  }

  useEffect(() => {
    drawRect();

  }, []);

  return <div>
      <canvas ref={rectRef}></canvas>
    </div>
  
}
export default RoateDraw
