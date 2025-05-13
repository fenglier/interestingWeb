/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-13 17:06:33
 * @lastEditors: fengli
 * @lastEditTime:
 */
import React, { useRef } from "react";
import styles from "./index.module.scss";

const Ripple = ({ children, onClick, ...rest }) => {
  const buttonRef = useRef(null);

  const createRipple = (event) => {
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    // NOTE:水波纹元素是以左上角为原点创建的，所以需要减去半径，让圆心对准点击点。
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.className = styles.ripple;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 6000);
  };

  const handleClick = (e) => {
    createRipple(e);
    onClick?.(e);
  };

  return (
    <div
      ref={buttonRef}
      className={styles.rippleButton}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Ripple;
