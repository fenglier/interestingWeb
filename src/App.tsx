/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-04-24 11:03:44
 * @lastEditors: fengli
 * @lastEditTime:
 */
import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { flushSync } from "react-dom";
import "./App.scss";
import Masonry from "./Cards/Masonry";
import Masonry2 from "./Cards2/Masonry2";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

// 防抖函数：n秒后执行，如果n秒内又触发，则重新计时
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 节流函数：规定n秒内只触发一次
function throttle(fn, delay) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime > delay) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// 要执行的函数
function handleClickDebounce() {
  console.log("防抖按钮点击了", new Date().toLocaleTimeString());
}

function handleClickThrottle() {
  console.log("节流按钮点击了", new Date().toLocaleTimeString());
}

function fakeArray() {
  console.log(arguments);
  console.log(Array.isArray(arguments));
  console.log(Array.isArray(Array.prototype.slice(arguments)));
}

// 子组件：使用 React.memo 包裹，避免不必要更新
const Child = memo(({ label }) => {
  console.log("👶 子组件渲染: ", label);
  return <div>子组件：{label}</div>;
});

const useUserGuide = (initialValue) => {
  const [firstVisit, setFirstVisit] = useState(initialValue);
  const setFirst = () => {
    setFirstVisit(true);
  };
  useEffect(() => {
    if (firstVisit) {
      const driverObj = driver({
        showProgress: true,
        nextBtnText: "下一步",
        prevBtnText: "上一步",
        doneBtnText: "完成",
        steps: [
          {
            element: "#themeSwitch",
            popover: { title: "模块主题", description: "模块主题" },
          },
          {
            element: "#implement",
            popover: {
              title: "具体实现",
              description:
                "为了避免不同功能之间相互干扰，每个功能实现，都采用的是块级格式化上下文（BFC）",
            },
          },
        ],
      });
      driverObj.drive();
      setFirstVisit(false);
    }
  }, [firstVisit]);

  return [setFirst];
};

const ScreenshotDemo = () => {
  const [setFirstVisit] = useUserGuide(false);
  // 用 useCallback 包一层，防止每次渲染重新生成
  const debounceClick = useCallback(debounce(handleClickDebounce, 2000), []);
  const throttleClick = useCallback(throttle(handleClickThrottle, 2000), []);
  const fruits = [
    "apple",
    "banna",
    "watermalen",
    "strawbarry",
    "apple",
    "race",
    "blueburry",
    "charry",
  ];

  let set = new Set(fruits);
  const fruits2 = [...set];

  const inputRef = useRef(null); // 创建一个ref，初始值为null

  const [count, setCount] = useState(0);

  const handleSyncClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    console.log("同步更新后的 count（立即打印）:", count); // 旧值，因为更新是异步的
  };

  const handleAsyncClick = () => {
    setTimeout(() => {
      setCount(count + 1); // 第一次更新
    }, 0);

    setTimeout(() => {
      setCount(count + 1); // 第二次更新
    }, 0);
  };

  const handleImmidiateUpdate = () => {
    flushSync(() => {
      setCount((prev) => prev + 1);
    });

    requestAnimationFrame(() => {
      flushSync(() => {
        setCount((prev) => prev + 1);
      });
    });

    /*     setTimeout(() => {
      flushSync(() => {
        setCount((prev) => prev + 1);
      });
    },0); */
  };

  const switchTheme = (themeName) => {
    document.body.setAttribute("data-theme", themeName);
  };

  useEffect(() => {
    console.log(count);
    return () => console.log(count);
  }, [count]);

  useEffect(() => {
    // 页面渲染完成后执行
    inputRef.current.focus(); // 调用DOM元素的focus方法
  }, []); // 空依赖数组，表示组件挂载完成后执行一次

  return (
    <>
      <div className="theme">使用driver.js实现用户引导</div>
      <div className="BFC3">
        <button className="btn" onClick={setFirstVisit}>
          第一次访问本网站
        </button>
      </div>
      <div className="theme" id="themeSwitch">
        风格切换
      </div>
      <div className="BFC12" id="implement">
        <div className="theme-container">
          <div className="light" onClick={() => switchTheme("light")}></div>
          <div className="dark" onClick={() => switchTheme("dark")}></div>
          <div className="blue" onClick={() => switchTheme("blue")}></div>
        </div>
      </div>
      <div className="theme">九宫格布局</div>
      <div className="flex">
        <div className="item">1</div>
        <div className="item">2</div>
        <div className="item">3</div>
        <div className="item">4</div>
        <div className="item">5</div>
        <div className="item">6</div>
        <div className="item">7</div>
        <div className="item">8</div>
        {/*  <div className="item">9</div> */}
      </div>
      <div className="theme">float实现两段对齐</div>
      <div className="BFC1">
        <div className="left">logo</div>
        <div className="right">menu</div>
      </div>
      <div className="theme">BFC里面子元素margin重叠</div>
      <div className="BFC2">
        <div className="box1"></div>
        <div className="box2"></div>
      </div>
      <div className="theme">防抖或节流函数</div>
      <div className="BFC3">
        <button className="btn" id="debounceBtn" onClick={debounceClick}>
          点我防抖
        </button>
        <button className="btn" id="throttleBtn" onClick={throttleClick}>
          点我节流
        </button>
      </div>
      <div className="theme">数组使用Set去重</div>
      <div className="BFC4">
        {fruits.map((item) => {
          return <div className="fruit">{item}</div>;
        })}
      </div>
      <div className="BFC4">
        {fruits2.map((item) => {
          return <div className="fruit">{item}</div>;
        })}
      </div>
      <div className="theme">使用UseRef实现页面加载后自动聚焦</div>
      <div>
        <input ref={inputRef} type="text" placeholder="页面加载后自动聚焦" />
      </div>
      <div>
        <button onClick={fakeArray}>点击</button>
      </div>
      <div className="theme">左侧固定，右侧自适应（flex实现）</div>
      <div className="BFC5">
        <div className="fix-left">左侧固定</div>
        <div className="auto-adapt">右侧自适应</div>
      </div>
      <div className="theme">右侧固定，左侧自适应（float实现）</div>
      <div className="BFC6">
        <div className="right-float">右侧固定</div>
        <div className="auto-left">左侧自适应</div>
      </div>
      <div className="theme">左侧固定，右侧自适应（float实现）</div>
      <div className="BFC7">
        <div className="left-float">左侧固定</div>
        <div className="auto-right">右侧自适应</div>
      </div>
      <div className="theme">左侧固定，右侧固定，中间自适应（float实现）</div>
      <div className="BFC8">
        <div className="left2">左侧固定</div>
        <div className="right2">右侧固定</div>
        <div className="middle">中间自适应</div>
      </div>
      <div className="theme">左侧固定，右侧固定，中间自适应（flex实现）</div>
      <div className="BFC9">
        <div className="item-left">左侧固定</div>
        <div className="item-middle">中间自适应</div>
        <div className="item-right">右侧固定</div>
      </div>
      <div className="theme">
        浮动脱离文本流和position：absolute脱离文本流的区别
      </div>
      <div className="BFC10">
        <div className="float3">左侧固定</div>
        <div className="right3">
          右侧自适应。亲爱的同学们，我们的实践课（会加成绩的）开始了，在有效时间期间均可参与（11.18-11.24）。是一个关于人们在人际交往过程中的行为反应的研究，时长在10-15分钟，实验地点在特教A101（进门右转，走到头即是）。来参与研究的同学，请加微信17708193612预约时间。
          我会先分一个 被试编号
          给你，如果是基数编号，先做股票任务；如果是偶数编号，先做相亲任务。用电脑浏览器打开下面链接（微信的默认浏览器会出错）。密码是3434。
          奇数股票任务：https://www.credamo.com/s/7ziqY3ano/
          偶数相亲任务：https://www.credamo.com/s/BVFVBvano/
          注意，相亲任务里面有个链接，需要点击去填写一些信息，然后根据指导语指示，回到原问卷作答
          ### 总结：机器人与人类服务者的责任归因及服务提供者与公司的区分 ####
          **1. 研究问题的核心：** 本研究关注以下两个关键问题： 1.
          消费者是否将机器人视为与人类员工同等的独立服务提供者？ 2.
          消费者在归因时是否会区分服务提供者和服务公司？ --- #### **2.
          消费者对机器人的归因：** - **机器人作为社会实体：**
          根据“计算机是社会行为者”（CASA）理论（Nass & Moon,
          2000），消费者倾向于将机器人视为具备信念、计划和互动能力的社会实体，并与其互动时表现出类似人际交往的行为（ˇCai´c
          et al., 2019; van Doorn et al., 2017）。 -
          例如，老年人在与机器人互动时，报告了孤独感减少、情绪改善和社交互动增加（Birks
          et al., 2016）。 - **责任归因：**
          消费者会下意识地将机器人行为的偏差归因于违反道德或社会规范的责任（Hong
          & Williams,
          2019）。因此，研究消费者如何对机器人归因，具有与人类服务者类似的意义（Leo
          & Huh, 2020）。 --- #### **3. 服务提供者与服务公司的区分：** -
          **关联观点：**
          服务提供者是企业与客户之间的重要桥梁，其表现通常被认为代表企业整体质量（Hartline
          & Ferrell,
          1996）。在这种观点下，对服务提供者的不满会自动延伸到对企业的负面评价（Berry,
          1995）。 - **区分观点：**
          另一种观点认为，消费者会区分服务企业和其员工的责任，将问题归因于个人行为者的意图或心理状态，而非企业整体（Hess
          et al., 2007）。 - **行为结果：** -
          当服务失败归因于服务提供者时，消费者可能会愤怒并对员工实施攻击（Bougie
          et al., 2003）。 -
          当归因于公司时，消费者可能选择更激烈的措施，如换用其他公司、传播负面口碑或抵制企业（DeWitt
          & Brady, 2003）。 --- #### **4. 本研究的目标：** -
          本研究重点探讨在酒店或餐厅情境中，当服务失败（如互动失败或任务执行不力）发生时，消费者如何对责任进行归因：
          - 消费者是否将服务提供者视为责任的直接来源？ -
          当失败来自机器人而非人类时，消费者如何评估企业责任？ ---
          本研究旨在填补消费者归因过程中服务提供者与公司责任区分的空白，同时比较机器人和人类服务者的差异，为机器人服务整合和企业应对措施提供洞见。
          重要、紧急领域 作战态势、实时调度、核电。 工业化、信息化 工业设计
          生产提质增效； 研究方向：人机协同决策优化。
          研究问题：通过可视化技术展示机器的运行情况，提升用户的决策效率。
          自我介绍： 可能用英文（） 开放性问题： 目标期刊： International
          Journal of Social Robotics 4.7 二区 Q2 SCIE International Journal of
          Human–Computer Interaction 4.7 无 SCIE Computers in Human Behavior 9.9
          一区 Q1 SSCI（考虑） Scientific Reports 4.6 三区 Q1 SCIE Journal of
          Product & Brand Management 5.6 二区 Q1 SSCI（考虑） Communications
          Psychology Computers in Human Behavior Reports 二区 JCR: Q1 ESCI
          Psychology & Marketing 6.7 二区 Q1 SSCI（考虑） Marketing Letters 3.6
          四区 Q3 SSCI Journal of Service Management 10.6 三区 JCR: Q1 SSCI
          （考虑） The Service Industries Journal 9.4 二区 JCR: Q1 SSCI （考虑）
          Journal of Retailing and Consumer Services 10.4 一区 JCR: Q1 SSCI
          （学生样本不考虑）
          面试官您好，我叫冯利，毕业于成都理工大学，专业是软件工程。
          毕业后，我首先从事的是 Java 开发相关的工作，主要使用的技术包括 Spring
          Boot、MySQL、Redis 等，这段经历让我对后端开发有了系统性的理解。
          之后出于对人的行为与心理的兴趣，我攻读了心理学硕士研究生。在这个过程中，提升了自己的人文素养和研究能力，也意识到用户体验在人机交互中的重要性。
          硕士毕业后，我选择回归软件开发领域，加入了公司，专注于前端开发方向，主要技术栈是
          React、Ant Design Pro 和 TypeScript。在这个岗位上，我进一步完善了对
          Web 应用整体开发流程的认知，并积累了实际项目经验。
          总的来说，我具备扎实的编程基础，同时也有跨学科的背景，能从用户角度去理解前端开发的需求。我热爱前端，也希望能在这个领域持续成长。
        </div>
      </div>
      <div className="BFC11">
        <div className="float4">左侧固定</div>
        <div className="right4">
          右侧自适应。亲爱的同学们，我们的实践课（会加成绩的）开始了，在有效时间期间均可参与（11.18-11.24）。是一个关于人们在人际交往过程中的行为反应的研究，时长在10-15分钟，实验地点在特教A101（进门右转，走到头即是）。来参与研究的同学，请加微信17708193612预约时间。
          我会先分一个 被试编号
          给你，如果是基数编号，先做股票任务；如果是偶数编号，先做相亲任务。用电脑浏览器打开下面链接（微信的默认浏览器会出错）。密码是3434。
          奇数股票任务：https://www.credamo.com/s/7ziqY3ano/
          偶数相亲任务：https://www.credamo.com/s/BVFVBvano/
          注意，相亲任务里面有个链接，需要点击去填写一些信息，然后根据指导语指示，回到原问卷作答
          ### 总结：机器人与人类服务者的责任归因及服务提供者与公司的区分 ####
          **1. 研究问题的核心：** 本研究关注以下两个关键问题： 1.
          消费者是否将机器人视为与人类员工同等的独立服务提供者？ 2.
          消费者在归因时是否会区分服务提供者和服务公司？ --- #### **2.
          消费者对机器人的归因：** - **机器人作为社会实体：**
          根据“计算机是社会行为者”（CASA）理论（Nass & Moon,
          2000），消费者倾向于将机器人视为具备信念、计划和互动能力的社会实体，并与其互动时表现出类似人际交往的行为（ˇCai´c
          et al., 2019; van Doorn et al., 2017）。 -
          例如，老年人在与机器人互动时，报告了孤独感减少、情绪改善和社交互动增加（Birks
          et al., 2016）。 - **责任归因：**
          消费者会下意识地将机器人行为的偏差归因于违反道德或社会规范的责任（Hong
          & Williams,
          2019）。因此，研究消费者如何对机器人归因，具有与人类服务者类似的意义（Leo
          & Huh, 2020）。 --- #### **3. 服务提供者与服务公司的区分：** -
          **关联观点：**
          服务提供者是企业与客户之间的重要桥梁，其表现通常被认为代表企业整体质量（Hartline
          & Ferrell,
          1996）。在这种观点下，对服务提供者的不满会自动延伸到对企业的负面评价（Berry,
          1995）。 - **区分观点：**
          另一种观点认为，消费者会区分服务企业和其员工的责任，将问题归因于个人行为者的意图或心理状态，而非企业整体（Hess
          et al., 2007）。 - **行为结果：** -
          当服务失败归因于服务提供者时，消费者可能会愤怒并对员工实施攻击（Bougie
          et al., 2003）。 -
          当归因于公司时，消费者可能选择更激烈的措施，如换用其他公司、传播负面口碑或抵制企业（DeWitt
          & Brady, 2003）。 --- #### **4. 本研究的目标：** -
          本研究重点探讨在酒店或餐厅情境中，当服务失败（如互动失败或任务执行不力）发生时，消费者如何对责任进行归因：
          - 消费者是否将服务提供者视为责任的直接来源？ -
          当失败来自机器人而非人类时，消费者如何评估企业责任？ ---
          本研究旨在填补消费者归因过程中服务提供者与公司责任区分的空白，同时比较机器人和人类服务者的差异，为机器人服务整合和企业应对措施提供洞见。
          重要、紧急领域 作战态势、实时调度、核电。 工业化、信息化 工业设计
          生产提质增效； 研究方向：人机协同决策优化。
          研究问题：通过可视化技术展示机器的运行情况，提升用户的决策效率。
          自我介绍： 可能用英文（） 开放性问题： 目标期刊： International
          Journal of Social Robotics 4.7 二区 Q2 SCIE International Journal of
          Human–Computer Interaction 4.7 无 SCIE Computers in Human Behavior 9.9
          一区 Q1 SSCI（考虑） Scientific Reports 4.6 三区 Q1 SCIE Journal of
          Product & Brand Management 5.6 二区 Q1 SSCI（考虑） Communications
          Psychology Computers in Human Behavior Reports 二区 JCR: Q1 ESCI
          Psychology & Marketing 6.7 二区 Q1 SSCI（考虑） Marketing Letters 3.6
          四区 Q3 SSCI Journal of Service Management 10.6 三区 JCR: Q1 SSCI
          （考虑） The Service Industries Journal 9.4 二区 JCR: Q1 SSCI （考虑）
          Journal of Retailing and Consumer Services 10.4 一区 JCR: Q1 SSCI
          （学生样本不考虑）
          面试官您好，我叫冯利，毕业于成都理工大学，专业是软件工程。
          毕业后，我首先从事的是 Java 开发相关的工作，主要使用的技术包括 Spring
          Boot、MySQL、Redis 等，这段经历让我对后端开发有了系统性的理解。
          之后出于对人的行为与心理的兴趣，我攻读了心理学硕士研究生。在这个过程中，提升了自己的人文素养和研究能力，也意识到用户体验在人机交互中的重要性。
          硕士毕业后，我选择回归软件开发领域，加入了公司，专注于前端开发方向，主要技术栈是
          React、Ant Design Pro 和 TypeScript。在这个岗位上，我进一步完善了对
          Web 应用整体开发流程的认知，并积累了实际项目经验。
          总的来说，我具备扎实的编程基础，同时也有跨学科的背景，能从用户角度去理解前端开发的需求。我热爱前端，也希望能在这个领域持续成长。
        </div>
      </div>
      <h2 className="theme">响应式布局卡片列表（Flex）</h2>
      <div className="card-container">
        <div className="card">卡片1</div>
        <div className="card">卡片2</div>
        <div className="card">卡片3</div>
        <div className="card">卡片4</div>
      </div>
      <h2 className="theme">响应式布局图文展示（Grid）</h2>
      <div className="grid-box">
        <img
          src="https://fenglier.github.io/date-light/static/picture/team-2.png"
          alt="图片"
        />
        <div>
          <h3>标题</h3>
          <p>这是图文展示的文字内容，展示产品、服务或其他介绍文字。</p>
        </div>
      </div>
      <div style={{ overflow: "hidden" }}>
        <div style={{ fontFamily: "sans-serif" }}>
          <h2 className="theme">React 18 批处理演示</h2>
          <p>当前 count: {count}</p>
          <button onClick={handleSyncClick}>同步更新（setState 两次）</button>
          <button onClick={handleAsyncClick}>异步更新（setTimeout 中）</button>
          <button onClick={handleImmidiateUpdate}>强制立即更新</button>
        </div>
      </div>
      <div style={{ overflow: "hidden" }}>
        <div className="theme">
          React.Memo虽然是高价组件，但没有像自定义组件那样在组件外面包一层
        </div>
        父组件 Count: {count}
        <button onClick={() => setCount(count + 1)}>更新 Count</button>
        {/* 子组件的 props 没变，所以不会重新渲染 */}
        <Child label="静态内容" />
      </div>
      <div className="theme">使用Masonry,left top实现瀑布流</div>
      <div className="BFC">
        <Masonry />
      </div>
      <div className="theme">
        使用Masonry,left top实现瀑布流，通过获取真实dom，确定left和top
      </div>
      <div className="BFC">
        <Masonry2 />
      </div>
    </>
  );
};

export default ScreenshotDemo;
