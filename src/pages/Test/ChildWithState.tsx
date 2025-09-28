/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-09-19 08:45:44
 * @lastEditors: fengli
 * @lastEditTime:
 */
import React, { useEffect, useState } from "react";

const Test = ({outer}) => {
  console.log("ChildWithState render");
//   const [outer, setOuter] = useState("你好");
//   const handleValue = (input) => {
//     setOuter(input?.currentTarget?.value);
//   };

  return (
    <>
      输入框2<input value={outer}></input>
    </>
  );
};

export default Test;
