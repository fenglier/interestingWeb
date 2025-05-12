/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-12 16:01:56
 * @lastEditors: fengli
 * @lastEditTime:
 */

import style from "./index.module.scss";
interface PacmanProps {}
const Pacman: React.FC<PacmanProps> = () => {
  return (

      <div className={style.pacMan}>
        <div className={style.eyeCenter}>
          <div className={style.eye}></div>
        </div>
        <div className={style.mouth1}></div>
        <div className={style.mouth2}></div>
        <div className={style.bean1}></div>
        <div className={style.bean2}></div>
      </div>
  
  );
};

export default Pacman;
