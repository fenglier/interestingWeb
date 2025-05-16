/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-16 11:34:37
 * @lastEditors: fengli
 * @lastEditTime:
 */
import { useEffect, useRef } from "react";
import style from "./index.module.scss";
const Trail = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const moveHandle = (e) => {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const trail = document.createElement("div");
    trail.className = style.trail;
    trail.style.left = `${e.clientX - container.left}px`;
    trail.style.top = `${e.clientY - container.top}px`;
    trail.style.transform = "translate(-50%,-50%)";
    containerRef.current.appendChild(trail);

    // 0.5秒后移除这个小元素
    setTimeout(() => {
      trail.remove();
    }, 500);
  };
  return (
    <div
      className={style.container}
      onMouseMove={moveHandle}
      ref={containerRef}
    ></div>
  );
};

export default Trail;
