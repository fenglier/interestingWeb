/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-09 16:10:22
 * @lastEditors: fengli
 * @lastEditTime:
 */
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { debounce } from "lodash";

interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  autoPlay = true,
  interval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(1); // 初始显示第一张（实际是第2个元素）
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const total = children.length;

  // 克隆 slides
  const slides = [
    children[children.length - 1], // clone last
    ...children,
    children[0], // clone first
  ];

  // 滑动函数
  const goToSlide = (index: number) => {
    if (!trackRef.current) return;
    if (isAnimating) return; // 避免重复点击
    setIsAnimating(true);
    setCurrentIndex(index);
  };

  const pre = debounce(() => goToSlide(currentIndex - 1), 100);
  const next = debounce(() => goToSlide(currentIndex + 1), 100);

  // 动画结束处理（实现无缝跳转）
  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (currentIndex === 0) {
      setCurrentIndex(total);
    } else if (currentIndex === total + 1) {
      setCurrentIndex(1);
    }
  };

  // 自动轮播
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, interval);
    return () => clearInterval(timer);
  }, [currentIndex, autoPlay]);

  return (
    <div className={styles.carousel}>
      <div className={styles.trackWrapper}>
        <div
          className={styles.track}
          ref={trackRef}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isAnimating ? "transform 0.5s ease" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((slide, i) => (
            <div className={styles.slide} key={i}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.controls}>
        <button onClick={pre}>‹</button>
        <button onClick={next}>›</button>
      </div>
    </div>
  );
};

export default Carousel;
