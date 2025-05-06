/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-06 15:59:29
 * @lastEditors: fengli
 * @lastEditTime:
 */
import style from "./index.module.scss";

import React, { useState, useEffect, useLayoutEffect } from "react";
interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ children, autoPlay = false }) => {
  const [index, setIndex] = useState(0);

  const moveSlide = (direction: number) => {
    const totalSlides = children.length;
    setIndex((prevIndex) => {
      return (prevIndex + direction + totalSlides) % totalSlides;
    });
  };

  useLayoutEffect(() => {
    const track = document.getElementById("track");
    if (!track) return;
    track.style.transform = `translateX(-${index * 100}%)`;
  }, [index]);

  useEffect(() => {
    // 自动轮播
    if (!autoPlay) return;
    let i = setInterval(() => {
      moveSlide(1);
    }, 3000);
    return () => {
      clearInterval(i);
    };
  }, []);

  return (
    <div className={style.carousel}>
      <div className={style.carouselTrack} id="track">
        {children.map((child: any, index: number) => (
          <div className={`${style.carouselSlide}`} key={index}>
            {child}
          </div>
        ))}
      </div>

      <div className={style.carouselControls}>
        <button className={style.btn} onClick={() => moveSlide(-1)}>
          ‹
        </button>
        <button className={style.btn} onClick={() => moveSlide(1)}>
          ›
        </button>
      </div>
    </div>
  );
};

export default Carousel;
