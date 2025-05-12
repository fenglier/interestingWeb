/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-12 11:04:28
 * @lastEditors: fengli
 * @lastEditTime:
 */
import style from "./index.module.scss";
interface ShakeProps {
  children: React.ReactNode;
}
const Shake: React.FC<ShakeProps> = ({ children }) => {
  return <div className={style.shakeContainer}>{children}</div>;
};

export default Shake;
