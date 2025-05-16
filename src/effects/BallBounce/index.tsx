/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-15 14:54:54
 * @lastEditors: fengli
 * @lastEditTime:
 */

import style from "./index.module.scss";

import { useEffect, useRef } from "react";

const BallBounce = () => {
  const ballRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ballRef.current || !containerRef.current) return;
    const ball = ballRef.current;
    const container = containerRef.current;

    let x = 0;
    let vx = 2; // 初始速度
    const ballWidth = ball.getBoundingClientRect().width;

    const animate = () => {
      x += vx;

      const maxX = container.clientWidth - ballWidth;
      if (x <= 0 || x >= maxX) {
        vx = -vx; // 反弹
      }

      ball.style.transform = `translate(${x}px,-50%)`;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className={style.container} ref={containerRef}>
      <div className={style.ball} ref={ballRef}></div>
    </div>
  );
};

export default BallBounce;
