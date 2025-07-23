/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-07-23 10:49:54
 * @lastEditors: fengli
 * @lastEditTime:
 */
import style from "./NineLayout.module.scss";
const NineLayout = () => {
  return (
    <div className={style.flex} >
      <div className={style.item}>1</div>
      <div className={style.item}>2</div>
      <div className={style.item}>3</div>
      <div className={style.item}>4</div>
      <div className={style.item}>5</div>
      <div className={style.item}>6</div>
      <div className={style.item}>7</div>
      <div className={style.item}>8</div>
      {/*  <div className="item">9</div> */}
    </div>
  );
};
export default NineLayout;
