/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-07 17:27:08
 * @lastEditors: fengli
 * @lastEditTime:
 */

import Masonry2 from "../components/Cards2/Masonry2";

const CarouselDemo = () => {
  return (
    <>
      <div className="theme">
        使用Masonry,left top实现瀑布流，通过获取真实dom，确定left和top
      </div>
      <div className="BFC">
        <Masonry2 />
      </div>
    </>
  );
};

export default CarouselDemo;
