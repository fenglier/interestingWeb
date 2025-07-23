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
import { set } from "lodash";

const initialItems = [
  { id: "home", icon: <Home />, label: "首页" },
  { id: "cart", icon: <ShoppingCart />, label: "购物车" },
  { id: "me", icon: <User />, label: "我的" },
  { id: "tv", icon: <Tv />, label: "视频" },
];

let offsetX = 0; // 鼠标点击时的偏移量
let offsetY = 0; // 鼠标点击时的偏移量

const BottomMenu = () => {
  const [items, setItems] = useState(initialItems);
  const itemsRef = useRef(items);
  const dragIndexRef = useRef<number | null>(null);

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleHover = (index: number) => (e: React.MouseEvent) => {
    if (dragIndexRef.current !== null) return; // 如果正在拖动，禁止hover
    setHoverIndex(index);
  };

  const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
    dragIndexRef.current = index;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    if (!menuRef.current) return;
    const children = Array.from(menuRef.current.children) as HTMLElement[];
    const clonedElement = children[index].cloneNode(true);

    clonedElement.style.position = "fixed";
    clonedElement.style.zIndex = "1000"; // 确保克隆元素在最上层
    let rect = children[index].getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    console.log(rect.left, rect.top, rect.width, rect.height);
    offsetX = x - rect.left;
    offsetY = y - rect.top;

    // TODO:位置不对，似乎向右移动了一小段距离
    clonedElement.style.top = `${children[index].offsetTop}px`;
    clonedElement.style.left = `${children[index].offsetLeft}px`;

    menuRef.current.insertAdjacentElement("afterend", clonedElement);
    children[index].style.opacity = "0.2"; // 设置拖动时的透明度
    //children[index].style.visibility = "hidden"; // 隐藏原元素
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragIndexRef.current === null || !menuRef.current) return;

    const draggingIndex = dragIndexRef.current;

    const children = Array.from(menuRef.current.children) as HTMLElement[];
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const menuLeft = menuRef.current.getBoundingClientRect().left;

    // 克隆元素的位置
    const clonedElement = menuRef.current.nextSibling as HTMLElement;
    if (clonedElement) {
      // TODO: 处理克隆元素的位置
      const dragHiddenRect = children[draggingIndex].getBoundingClientRect();
      clonedElement.style.transform = `translate(${
        mouseX - offsetX - dragHiddenRect.left
      }px,${mouseY - offsetY - dragHiddenRect.top}px)`;
    }

    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      //const midX = rect.left + rect.width / 2;

      const midX = menuLeft + children[i].offsetLeft + rect.width / 2; // 元素的中线位置
      console.log("offsetLeft:", children[i].offsetLeft);

      if (i < draggingIndex) {
        // 如果是拖动元素的左边
        if (mouseX < midX) {
          // 和后面元素'交换'位置
          const nextRect = children[i + 1].getBoundingClientRect();
          const nextRectMidX =
            menuLeft + children[i + 1].offsetLeft + nextRect.width / 2;
          children[i].style.transform = `translateX(${nextRectMidX - midX}px)`;

/*           let temp = itemsRef.current[i];
          itemsRef.current[i] = itemsRef.current[i + 1];
          itemsRef.current[i + 1] = temp; */
        } else {
          children[i].style.transform = "translateX(0px)"; // 恢复位置
        }
      }
      if (i > draggingIndex) {
        // 如果是拖动元素的右边。
        if (mouseX > midX) {
          console.log("mouseX:", mouseX, "midX:", midX);
          // 和前面元素'交换'位置
          const prevRect = children[i - 1].getBoundingClientRect();
          const prevRectMidX =
            menuLeft + children[i - 1].offsetLeft + prevRect.width / 2;
          console.log(
            "preRect.left:",
            prevRect.left,
            "prevRect.width:",
            prevRect.width
          );
          console.log("prevRectMidX:", prevRectMidX);

          children[i].style.transform = `translateX(${-(
            midX - prevRectMidX
          )}px)`;
/* 
          let temp = itemsRef.current[i];
          itemsRef.current[i] = itemsRef.current[i - 1];
          itemsRef.current[i - 1] = temp; */
        } else {
          children[i].style.transform = "translateX(0px)"; // 恢复位置
        }
      }
    }
  };

  const handleMouseUp = () => {
    // 判断clone元素以及之前的菜单项的视口位置（不含因此元素），从而获取到排序后的元素顺序。
    const getNewOrder = () => {
      const clonedElement = menuRef.current.nextSibling as HTMLElement;
      const children = Array.from(menuRef.current.children) as HTMLElement[];
      // 构建一个数组，将因此的元素替换为克隆元素，然后使用冒泡排序
      children.splice(dragIndexRef.current!, 1, clonedElement);
      const preOrder = children.map((child, index) => {
        return { el: child, order: index };
      });
      preOrder.sort((a, b) => {
        const aRect = a.el.getBoundingClientRect();
        const bRect = b.el.getBoundingClientRect();
        return aRect.left - bRect.left; // 按照左边界位置排序
      });
      const newOrderIndex = preOrder.map((item) => item.order);
      return newOrderIndex;
    };
    const newOrder = getNewOrder();

    dragIndexRef.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

   
    const children = Array.from(
      menuRef.current?.children || []
    ) as HTMLElement[];
    // 恢复原元素的样式
    children.forEach((child) => {
      child.style = ""; // 恢复所有样式
    });

    // 重新渲染排序后的节点
    const newItems = newOrder.map((index) => itemsRef.current[index]);
    setItems(newItems);
    itemsRef.current = newItems; // 更新引用
    setHoverIndex(null); // 清除hover状态

     // 清理克隆元素
    menuRef.current?.nextSibling?.remove(); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.bottomMenu} ref={menuRef}>
        {items?.map((item, index) => {
          let hoverCss;
          if (dragIndexRef.current) {
            // TODO: 处理拖动时的hover样式
            hoverCss = "";
            /*    hoverCss =
            hoverIndex == dragIndexRef.current ? styles.menuItemHover : ""; */
          } else {
            hoverCss = hoverIndex == index ? styles.menuItemHover : "";
          }
          return (
            <div
              key={item.id}
              className={`${styles.menuItem} ${
                dragIndexRef.current === index ? styles.dragging : ""
              }  ${hoverCss} `}
              onMouseDown={handleMouseDown(index)}
              onMouseEnter={handleHover(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {item.icon}
              <span className={styles.label}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomMenu;
