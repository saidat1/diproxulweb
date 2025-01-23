import React, { useEffect, useRef, RefObject } from 'react';

interface Props {
  containerRef: RefObject<HTMLDivElement>;
  fromRef: RefObject<HTMLDivElement>;
  toRef: RefObject<HTMLDivElement>;
  duration: number;
}

export default function AnimatedBeam({ containerRef, fromRef, toRef, duration }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const container = containerRef.current;
    const from = fromRef.current;
    const to = toRef.current;

    if (!canvas || !context || !container || !from || !to) return;

    const animate = () => {
      if (!canvas || !context || !container || !from || !to) return;

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      const fromRect = from.getBoundingClientRect();
      const toRect = to.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const startX = fromRect.left + fromRect.width / 2 - containerRect.left;
      const startY = fromRect.top + fromRect.height / 2 - containerRect.top;
      const endX = toRect.left + toRect.width / 2 - containerRect.left;
      const endY = toRect.top + toRect.height / 2 - containerRect.top;

      const currentDate = new Date();
      const progress = (currentDate.getTime() % duration) / duration;

      context.beginPath();
      context.moveTo(startX, startY);
      
      const controlX = startX + (endX - startX) / 2;
      const controlY = startY + (endY - startY) / 2 - 50;
      
      context.quadraticCurveTo(controlX, controlY, endX, endY);

      context.strokeStyle = 'rgba(59, 130, 246, 0.5)';
      context.lineWidth = 2;
      context.lineCap = 'round';
      context.setLineDash([5, 5]);
      context.lineDashOffset = progress * -30;
      context.stroke();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Clean up if necessary
    };
  }, [containerRef, fromRef, toRef, duration]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}

