/*
 * @Author: fengli
 * @Description: TODO:元素水平拖动改变位置
 * @Date: 2025-06-25 15:14:54
 * @lastEditors: fengli
 * @lastEditTime:
 */

import React, { useRef, useState } from "react";
import styles from "./Menu.module.scss";

// 图片素材从lucide-react库中引入
import { Home, User, ShoppingCart, Tv } from "lucide-react";

const initialItems = [
  { id: "home", icon: <Home />, label: "首页" },
  { id: "cart", icon: <ShoppingCart />, label: "购物车" },
  { id: "me", icon: <User />, label: "我的" },
  { id: "tv", icon: <Tv />, label: "视频" },
];

const BottomMenu = () => {
  const [items, setItems] = useState(initialItems);
  const itemsRef = useRef(items);
  const dragIndexRef = useRef<number | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
    dragIndexRef.current = index;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragIndexRef.current === null || !menuRef.current) return;

    const draggingIndex = dragIndexRef.current;

    const children = Array.from(menuRef.current.children) as HTMLElement[];
    const mouseX = e.clientX;

    let newIndex = draggingIndex;
    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      const midX = rect.left + rect.width / 2;

      if (mouseX < midX) {
        newIndex = i;
        break;
      } else {
        newIndex = i + 1;
      }
    }

    if (newIndex !== draggingIndex) {
      const newItems = [...itemsRef.current];
      const [draggedItem] = newItems.splice(draggingIndex, 1);
      newItems.splice(
        newIndex > draggingIndex ? newIndex - 1 : newIndex,
        0,
        draggedItem
      );
      // 触发更新
      setItems(newItems);
      // 避免闭包陷阱
      itemsRef.current = newItems;
      dragIndexRef.current = newIndex > draggingIndex ? newIndex - 1 : newIndex;
    }
  };

  const handleMouseUp = () => {
    dragIndexRef.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className={styles.bottomMenu} ref={menuRef}>
      {itemsRef.current?.map((item, index) => (
        <div
          key={item.id}
          className={`${styles.menuItem} ${
            dragIndexRef.current === index ? styles.dragging : ""
          }`}
          onMouseDown={handleMouseDown(index)}
        >
          {item.icon}
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomMenu;
