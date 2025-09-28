import { useState, useRef } from "react";
import { flushSync } from "react-dom";

function FuncCompWithFlushSync() {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  const handleClick = () => {
    // 第一次同步更新：count 变为 1
    flushSync(() => {
      setCount((prev) => prev + 1);
    });
  
    console.log("第一次更新后 - DOM 内容:", countRef.current?.textContent); // 1（DOM 已更新标记，但尚未渲染）

    // 关键修正：用 setTimeout 将耗时操作放入异步队列，不阻塞主线程
    setTimeout(() => {
      let now = performance.now();
      while (performance.now() - now < 1000) {
        // 模拟耗时操作（此时主线程已空闲，UI 有机会渲染第一次更新）
      }

      // 第二次同步更新：count 变为 2
      flushSync(() => {
        setCount((prev) => prev + 1);
      });

      console.log("第二次更新后 - DOM 内容:", countRef.current?.textContent); // 2
    }, 0);
  };

  return (
    <div style={{ padding: 20, marginTop: 20, borderTop: "1px solid #eee" }}>
      <h4>修复：避免主线程阻塞</h4>
      <p ref={countRef}>当前 count：{count}</p>
      <button onClick={handleClick}>分步更新并观察 UI</button>
    </div>
  );
}

export default FuncCompWithFlushSync;
