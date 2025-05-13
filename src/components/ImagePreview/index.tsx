/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-13 11:39:02
 * @lastEditors: fengli
 * @lastEditTime:
 */
import { useRef, useState } from "react";
import style from "./index.module.scss";

interface ImagePreviewProps {
  src: string;
  alt?: string;
  width?: string;
}
const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, width }) => {
  const [zoomed, setZoomed] = useState(false);
  const [originTransform, setOriginTransform] = useState("");
  const imageRef = useRef<HTMLImageElement>(null);
  const zoomedRef = useRef<HTMLImageElement>(null);

  const handleClick = () => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();

    // 计算thumbnail相比于原图的缩放比率
    let scale;
    if (window.innerWidth > window.innerHeight) {
      scale = rect.height / (window.innerHeight * 0.9);
    } else {
      scale = rect.width / (window.innerWidth * 0.9);
    }

    const translateX = rect.left;
    const translateY = rect.top;

    const startTransform = `translate(${translateX}px, ${translateY}px) scale(${scale}, ${scale})`;
    setOriginTransform(startTransform);

    setZoomed(true);
  };

  const handleClose = () => {
    // TODO:动画关闭效果
    setZoomed(false);
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
              transform: originTransform,
              animation: `${style.scaleUp} 0.3s ease forwards`,
            }}
          />
        </div>
      )}
    </>
  );
};

export default ImagePreview;
