/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-07 16:43:04
 * @lastEditors: fengli
 * @lastEditTime:
 */
import Carousel from "../components/Carousel";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";

const CarouselDemo = () => {
  return (
    <>
      <div className="theme">
        轮播图的实现：transform: translateX() + JS 控制索引切换
      </div>
      <div
        className="BFC"
        style={{
          display: "flex",
          width: "100%",
          height: "20rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Carousel>
          <img
            src={img1}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
          <img
            src={img2}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
          <img
            src={img3}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </Carousel>
      </div>
    </>
  );
};

export default CarouselDemo;
