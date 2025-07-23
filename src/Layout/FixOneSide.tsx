/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-07-23 13:55:21
 * @lastEditors: fengli
 * @lastEditTime:
 */
import style from "./FixOneSide.module.scss";
const fixOneSide = () => {
  return (
    <>
      <h2>左侧固定，右侧自适应（flex实现）</h2>
      <div className={style.BFC5}>
        <div className={style.fixLeft}>左侧固定</div>
        <div className={style.autoAdapt}>右侧自适应</div>
      </div>
      <h2 >右侧固定，左侧自适应（float实现）</h2>
      <div className={style.BFC6}>
        <div className={style.rightFloat}>右侧固定</div>
        <div className={style.autoLeft}>左侧自适应</div>
      </div>
      <h2 >左侧固定，右侧自适应（float实现）</h2>
      <div className={style.BFC7}>
        <div className={style.leftFloat}>左侧固定</div>
        <div className={style.autoRight}>右侧自适应</div>
      </div>
    </>
  );
};

export default fixOneSide;
