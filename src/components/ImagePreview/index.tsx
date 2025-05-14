/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-13 11:39:02
 * @lastEditors: fengli
 * @lastEditTime:
 */
import { useRef, useState } from "react";
import style from "./index.module.scss";
import { flushSync } from "react-dom";

interface ImagePreviewProps {
  src: string;
  alt?: string;
  width?: string;
}

// 动画时长
const ANIMATION_TIME = 0.3;

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, width }) => {
  const [zoomed, setZoomed] = useState(false);
  const [transform, setTransform] = useState("");
  const preTransfromRef = useRef("");

  const imageRef = useRef<HTMLImageElement>(null);
  const zoomedRef = useRef<HTMLImageElement>(null);

  const handleClick = () => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();

    // 计算thumbnail相比于原图的缩放比率。FIXME:当图片过小的时候，放大后的尺寸不一定为window.innerHeight*0.9
    let scale;
    if (window.innerWidth > window.innerHeight) {
      scale = rect.height / (window.innerHeight * 0.9);
    } else {
      scale = rect.width / (window.innerWidth * 0.9);
    }

    const translateX = rect.left;
    const translateY = rect.top;

    const startTransform = `translate(${translateX}px, ${translateY}px) scale(${scale}, ${scale})`;

    flushSync(() => {
      setTransform(startTransform);
      setZoomed(true);
    });
    // 通过transition控制动画
    const endTransform = `translate(50vw, 50vh) translate(-50%, -50%) scale(1, 1)`;
    // NOTE:同步执行js代码，是不会有动画的。orgin → end 这一变化被当作一次性完成，没有触发动画。
    setTimeout(() => {
      preTransfromRef.current = startTransform;

      setTransform(endTransform);
    }, 50);
    /*  flushSync(() => {}); */
  };

  const handleClose = () => {
    // 动画关闭效果
    setTransform(preTransfromRef.current);
    setTimeout(() => {
      setZoomed(false);
    }, ANIMATION_TIME * 1000);
  };

  const handleZoomImgClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <img
        ref={imageRef}
        width={`${width ? width : 200}`}
        src={src || alt}
        /*     alt={alt} */
        className={style.thumbnail}
        onClick={handleClick}
      />

      {zoomed && (
        <div className={style.overlay} onClick={handleClose}>
          <img
            src={src || alt}
            onClick={handleZoomImgClick}
            className={style.zoomedImage}
            ref={zoomedRef}
            style={{
              transform: transform,
              transition: `transform ${ANIMATION_TIME}s ease`,
              // animation: `${style.scaleUp} 0.3s ease forwards`,
            }}
          />
        </div>
      )}
    </>
  );
};

export default ImagePreview;
