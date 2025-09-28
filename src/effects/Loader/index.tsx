/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-07-23 14:29:40
 * @lastEditors: fengli
 * @lastEditTime:
 */
import style from "./index.module.scss";
const Loader = () => {
  return (
    <div
      className={style.BFC}
      style={{
        display: "flex",
        width: "100%",
        height: "5rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={style.loader}></div>
    </div>
  );
};

export default Loader;
