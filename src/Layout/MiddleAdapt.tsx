/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-07-23 14:09:48
 * @lastEditors: fengli
 * @lastEditTime:
 */
import style from "./MiddleAdapt.module.scss";

const MiddleAdapt = () => {
  return (
    <>
      <h2>左侧固定，右侧固定，中间自适应（float实现）</h2>
      <div className={style.BFC8}>
        <div className={style.left2}>左侧固定</div>
        <div className={style.right2}>右侧固定</div>
        <div className={style.middle}>中间自适应</div>
      </div>
      <h2>左侧固定，右侧固定，中间自适应（flex实现）</h2>
      <div className={style.BFC9}>
        <div className={style.itemLeft}>左侧固定</div>
        <div className={style.itemMiddle}>中间自适应</div>
        <div className={style.itemRight}>右侧固定</div>
      </div>
    </>
  );
};

export default MiddleAdapt;
