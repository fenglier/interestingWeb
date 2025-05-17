/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-17 15:05:01
 * @lastEditors: fengli
 * @lastEditTime:
 */
// BarrageItem.tsx
import React, { useEffect, useRef } from "react";
import style from "./index.module.scss";

const BarrageItem = ({ barrage, containerRef, onOutScreen }) => {
  const elRef = useRef<HTMLDivElement>(null);

  /* ref={fn} 形式的回调函数，每次渲染时都会被调用一次，即使 DOM 元素没变 */
  useEffect(() => {
    const el = elRef.current;
    if (!el || !containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const elWidth = el.offsetWidth;

    const animation = el.animate(
      [
        { transform: `translateX(0px)` },
        { transform: `translateX(-${elWidth + containerWidth}px)` },
      ],
      {
        duration: 8000,
        easing: "linear",
        fill: "forwards",
      }
    );

    // 存动画引用
    el._barrageAnim = animation;

    const checkIfOutOfScreen = () => {
      const rect = el.getBoundingClientRect();
      const parentRect = containerRef.current!.getBoundingClientRect();
      if (rect.right < parentRect.left) {
        onOutScreen(barrage.id);
      } else {
        requestAnimationFrame(checkIfOutOfScreen);
      }
    };
    requestAnimationFrame(checkIfOutOfScreen);
  }, [barrage.id, containerRef]);

  return (
    <div
      ref={elRef}
      className={style.barrage}
      style={{ top: `${barrage.top}px` }}
      onMouseEnter={(e) => e.currentTarget._barrageAnim?.pause()}
      onMouseLeave={(e) => e.currentTarget._barrageAnim?.play()}
    >
      <span className={style.text}>{barrage.text}</span>
      <button
        className={style.likeBtn}
        onClick={(e) => {
          e.stopPropagation();
          alert(`你点赞了：${barrage.text}`);
        }}
      >
        ❤️
      </button>
    </div>
  );
};

export default BarrageItem;
