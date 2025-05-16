/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-16 10:19:44
 * @lastEditors: fengli
 * @lastEditTime:
 */
import { useEffect, useRef } from "react";

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const BallCollision = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 400;

    const BALL_COUNT: number = 10;
    const BALL_RADIUS: number = 20;
    const balls: Ball[] = [];

    // 初始化小球
    for (let i = 0; i < BALL_COUNT; i++) {
      balls.push({
        x: Math.random() * (canvas.width - 2 * BALL_RADIUS) + BALL_RADIUS,
        y: Math.random() * (canvas.height - 2 * BALL_RADIUS) + BALL_RADIUS,
        vx: Math.random() * 4 ,
        vy: Math.random() * 4 ,
        radius: BALL_RADIUS,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      });
    }

    const distance = (b1: Ball, b2: Ball): number => {
      return Math.hypot(b1.x - b2.x, b1.y - b2.y);
    };

    const resolveCollision = (b1: Ball, b2: Ball): void => {
      // 简化：交换速度
      const tempVx = b1.vx;
      const tempVy = b1.vy;
      b1.vx = b2.vx;
      b1.vy = b2.vy;
      b2.vx = tempVx;
      b2.vy = tempVy;
    };

    const update = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 遍历小球
      balls.forEach((b, i) => {
        // 更新位置
        b.x += b.vx;
        b.y += b.vy;

        // 边界反弹
        if (b.x - b.radius <= 0 || b.x + b.radius >= canvas.width) b.vx *= -1;
        if (b.y - b.radius <= 0 || b.y + b.radius >= canvas.height) b.vy *= -1;

        // 与其他球检测碰撞
        for (let j = i + 1; j < balls.length; j++) {
          const other = balls[j];
          const d = distance(b, other);
          if (d < b.radius + other.radius) {
            resolveCollision(b, other);
          }
        }

        // 画球
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
        ctx.closePath();
      });

      requestAnimationFrame(update);
    };

    update();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ border: "0.1rem solid var(--color-bg-secondary)" }}
    />
  );
};

export default BallCollision;
