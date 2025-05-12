/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-12 12:58:13
 * @lastEditors: fengli
 * @lastEditTime:
 */
import { useEffect, useState } from "react";
import style from "./index.module.scss";
interface PushProps {
  items: {
    key?: string;
    exist?: React.ReactNode;
    expander: React.ReactNode;
  }[];
  onChange: (activeId: string) => void;
}
const Shake: React.FC<PushProps> = ({ items, onChange }) => {
  if (!Array.isArray(items)) {
    throw Error("items must be an array");
  }
  const [expand, setExpand] = useState<boolean[]>(
    Array(items.length).fill(false)
  );
  const handleClick = (index: number, key?: string) => {
    // 设置当前展开的元素，以及向父组件告知被点击的元素的key
    expand[index] = !expand[index];
    setExpand([...expand]);
    onChange(key || String(index));
  };
  useEffect(() => {
    // TODO:设置当前被展开的元素
  }, []);
  return (
    <div className={style.container}>
      {items.map((item, index) => {
        return (
          <>
            <div
              className={style.exist}
              onClick={() => handleClick(index, item.key)}
            >
              {item.exist}
            </div>
            <div
              className={`${style.expander} ${expand[index] ? style.open : ""}`}
            >
              {item.expander}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Shake;
