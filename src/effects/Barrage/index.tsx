/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-16 14:08:16
 * @lastEditors: fengli
 * @lastEditTime:
 */
import React, { useEffect, useRef, useState } from "react";
import style from "./index.module.scss";
import BarrageItem from "./BarrageItem";

let idCounter = 0;

const Barrage = () => {
  const [barrages, setBarrages] = useState([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const addBarrage = (text: string) => {
    const id = idCounter++;
    const top = Math.random() * 80 + 10;
    const newBarrage = {
      id,
      text,
      top,
    };
    setBarrages((prev) => [...prev, newBarrage]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.barrageText;
    const text = input.value.trim();
    if (text) {
      addBarrage(text);
      input.value = "";
    }
  };

  // 控制每个弹幕动画
  const handleAnimation = (el: HTMLDivElement | null, barrageId: number) => {
    if (!el || !containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const elWidth = el.offsetWidth;

    const animation = el.animate(
      [
        { transform: `translateX(${0}px)` },
        { transform: `translateX(-${elWidth + containerWidth}px)` },
      ],
      {
        duration: 8000,
        easing: "linear",
        fill: "forwards", // 保持最终位置
      }
    );

    // 存引用
    el._barrageAnim = animation;

    // 手动监听动画是否真正移出屏幕
    const checkIfOutOfScreen = () => {
      const rect = el.getBoundingClientRect();
      const parentRect = containerRef.current!.getBoundingClientRect();

      if (rect.right < parentRect.left) {
        setBarrages((prev) => prev.filter((b) => b.id !== barrageId));
      } else {
        requestAnimationFrame(checkIfOutOfScreen);
      }
    };

    requestAnimationFrame(checkIfOutOfScreen);
  };

  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit} className={style.inputBar}>
        <input name="barrageText" placeholder="发送弹幕..." />
        <button type="submit">发送</button>
      </form>

      <div className={style.barrageContainer} ref={containerRef}>
        {barrages.map((barrage) => (
          <BarrageItem
            key={barrage.id}
            barrage={barrage}
            containerRef={containerRef}
            onOutScreen={(id) =>
              setBarrages((prev) => prev.filter((b) => b.id !== id))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Barrage;
