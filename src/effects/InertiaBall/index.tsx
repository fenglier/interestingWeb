/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-15 16:15:39
 * @lastEditors: fengli
 * @lastEditTime:
 */
import { useEffect, useRef } from "react";
import style from "./index.module.scss";

/* 移动方向 */
enum Direction {
  left = "left",
  right = "right",
  static = "static",
}

const InertiaBall = () => {
  const ballRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let lastX = 0;
  let velocity = 0;
  let animationFrame: number;
  // 小球惯性运动的时候是否碰撞到边界
  let direction: Direction;
  let hitBorder: boolean = false;

  const friction = 0.98;

  const onMouseDown = (e: MouseEvent) => {
    isDragging = true;
    startX = e.clientX;
    lastX = e.clientX;
    cancelAnimationFrame(animationFrame);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!ballRef.current || !containerRef.current) return;
    if (!isDragging) return;

    // 拖动边界
    let dx = e.clientX - startX;
    let container = containerRef.current.getBoundingClientRect();
    let ball = ballRef.current.getBoundingClientRect();
    if (dx > 0) {
      direction = Direction.right;
      if (container.right - ball.right < 0) {
        dx = 0;
      }
    } else {
      direction = Direction.left;
      if (ball.left - container.left < 0) {
        dx = 0;
      }
    }
    currentX += dx;
    ballRef.current.style.transform = `translateX(${currentX}px)`;
    velocity = e.clientX - lastX;
    lastX = e.clientX;
    startX = e.clientX;
  };

  const onMouseUp = () => {
    isDragging = false;
    inertia();
  };

  const inertia = () => {
    if (!ballRef.current || !containerRef.current) return;
    velocity *= friction;
    currentX += velocity;
    // 惯性移动边界
    let container = containerRef.current.getBoundingClientRect();
    let ball = ballRef.current.getBoundingClientRect();
    /* NOTE:请注意，getBoundingClientRect的left和right是元素左/右边缘到视口左侧的距离。不要和css中那个left，right混淆，它是相对于父容器的坐边缘和右边缘的距离 */
    if (direction === Direction.right) {
      // 向右移动判断右边界
      if (container.right - ball.right < 0) {
        currentX = currentX - -(container.right - ball.right);
        hitBorder = true;
        direction = Direction.left;
        velocity = -velocity;
      }
    } else if (direction === Direction.left) {
      // 向左移动判断左边界
      if (ball.left - container.left < 0) {
        currentX = currentX - (ball.left - container.left);
        hitBorder = true;
        direction = Direction.right;
        velocity = -velocity;
      }
    }

    ballRef.current.style.transform = `translateX(${currentX}px)`;

    if (Math.abs(velocity) > 0.1) {
      animationFrame = requestAnimationFrame(inertia);
    } else {
      hitBorder = false;
      direction = Direction.static;
    }
  };

  useEffect(() => {
    if (!ballRef.current) return;
    const ball = ballRef.current;
    ball.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      ball.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className={style.container} ref={containerRef}>
      <div ref={ballRef} className={style.ball}></div>
    </div>
  );
};

export default InertiaBall;
