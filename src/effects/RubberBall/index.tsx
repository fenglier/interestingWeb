/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-16 09:56:05
 * @lastEditors: fengli
 * @lastEditTime:
 */
import { useRef, useState } from "react";
import style from "./index.module.scss";

const RubberBall = () => {
  const ballRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e) => {
    if (!ballRef.current) return;
    setIsDragging(true);
    setStartX(e.clientX);
    ballRef.current.style.transition = "none";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    if (!ballRef.current) return;
    const deltaX = e.clientX - startX;
    const stretch = 1 + Math.min(Math.abs(deltaX) / 150, 0.5); // 限制最大拉伸
    const direction = deltaX >= 0 ? 1 : -1;

    ballRef.current.style.transform = `translate(${deltaX}px,-50%) scaleX(${stretch})`;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (!ballRef.current) return;
    setIsDragging(false);
    ballRef.current.style.transition =
      "transform 0.4s cubic-bezier(0.25, 1.5, 0.5, 1)";
    ballRef.current.style.transform = "translate(0,-50%) scaleX(1)";
  };

  return (
    <div className={style.container}>
      <div
        ref={ballRef}
        className={style.ball}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export default RubberBall;
