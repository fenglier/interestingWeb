/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-09-19 08:45:44
 * @lastEditors: fengli
 * @lastEditTime:
 */
import React, { useState } from "react";

const Test = () => {
  console.log("ChildWithoutState render");
  return (
    <>
      输入框1<input></input>
    </>
  );
};

export default React.memo(Test);
