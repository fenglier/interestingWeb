/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-07 16:43:04
 * @lastEditors: fengli
 * @lastEditTime:
 */
import Carousel from "../components/Carousel";
import Carousel2 from "../components/Carousel";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";

const CarouselDemo = () => {
  return (
    <>
      <div className="theme">
        采用“克隆首尾元素 + translateX + transition” 的方式
        <h2>核心思路</h2>
        <ol>
          <li>
            添加首尾克隆元素：
            <ul>
              <li>
                比如轮播内容是 [A, B, C]，那么实际渲染内容为 [C, A, B, C, A]。
              </li>
              <li>初始展示的是索引 1 的位置（也就是真实的 A）。</li>
              <li>
                当你向左滑动到C（索引0）
                或向右滑动到A（索引4）时，等动画结束后立即跳转到对应的真实位置
                C（索引3） 或 A（索引1），无过渡跳转。
              </li>
            </ul>
          </li>
          <li>
            使用 translateX + transition
            实现过渡，在过渡结束后执行无动画的跳转，保证用户感知不到跳动。
          </li>
        </ol>
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
        <Carousel2 autoPlay={false}>
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
        </Carousel2>
      </div>
    </>
  );
};

export default CarouselDemo;
