/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-11 16:53:10
 * @lastEditors: fengli
 * @lastEditTime:
 */
import style from "./index.module.scss";
const Steps = ({ items, current }) => {
  const st = items.map((i, index: number) => {
    if (index < current) {
      // finish
      return (
        <div className={style.item}>
          <div className={`${style.icon} ${style.iconFinish}`}>{index + 1}</div>
          <div className={`${style.content} ${style.finish}`}>{i.title}</div>
        </div>
      );
    } else if (index == current) {
      // active
      return (
        <div className={style.item}>
          <div style={{ position: "relative" }}>
            <div className={`${style.icon} ${style.iconActive}`}></div>
            <div className={`${style.icon}`}>{index + 1}</div>
          </div>

          <div className={`${style.content} ${style.active}`}>{i.title}</div>
        </div>
      );
    } else {
      // wait
      return (
        <div className={style.item}>
          <div className={style.icon}>{index + 1}</div>
          <div className={style.content}>{i.title}</div>
        </div>
      );
    }
  });
  return <div className={style.container}>{st}</div>;
};
export default Steps;
/*    <div className={style.stepper}>
      <div className={`${style.step} ${style.completed}`}>
        <div className={style.circle}>✓</div>
        <div className={style.label}>First</div>
      </div>
      <div className={`${style.step} ${style.active}`}>
        <div className={style.circle}>2</div>
        <div className={style.label}>Second</div>
      </div>
      <div className={style.step}>
        <div className={style.circle}>3</div>
        <div className={style.label}>Last</div>
      </div>
    </div> */
