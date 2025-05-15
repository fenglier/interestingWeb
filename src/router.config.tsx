/*
 * @Author: fengli
 * @Description: 配置式路由。结合App.tsx和Layout.tsx使用实现的。
 * Layout.tsx先遍历路由配置，获取到一级路由和二级路由，分别在顶部导航和侧边导航，通过监听浏览器的路由判断当前激活的是哪一个一级路由，从而渲染二级路由，然后在Layout.tsx中渲染。
 * @Date: 2025-05-07 12:41:45
 * @lastEditors: fengli
 * @lastEditTime:
 */
import React from "react";
import Welcome from "./pages/Welcome";

const CarouselDemo = React.lazy(() => import("./pages/CarouselDemo.mdx"));
const WaterfallDemo = React.lazy(() => import("./pages/WaterfallDemo.mdx"));
const TreeDemo = React.lazy(() => import("./pages/TreeDemo.mdx"));
const StepsDemo = React.lazy(() => import("./pages/StepsDemo.mdx"));
const MessageDemo = React.lazy(() => import("./pages/MessageDemo.mdx"));
const ImagePreviewDemo = React.lazy(
  () => import("./pages/ImagePreviewDemo.mdx")
);
const ShakeDemo = React.lazy(() => import("./pages/ShakeDemo.mdx"));
const PushDemo = React.lazy(() => import("./pages/PushDemo.mdx"));
const PacmanDemo = React.lazy(() => import("./pages/PacmanDemo.mdx"));
const RippleDemo = React.lazy(() => import("./pages/RippleDemo.mdx"));
const BallFreeDownDemo = React.lazy(
  () => import("./pages/BallFreeDownDemo.mdx")
);
const BallBounceDemo = React.lazy(() => import("./pages/BallBounceDemo.mdx"));
const InertiaBallDemo = React.lazy(() => import("./pages/InertiaBallDemo.mdx"));

const routes = [
  {
    path: "/home",
    name: "首页",
    key: "/home",
    children: [
      {
        path: "/home/welcome",
        name: "Welcome",
        element: <Welcome />,
      },
    ],
  },
  {
    path: "/components",
    name: "组件",
    key: "components",
    children: [
      {
        path: "/components/carousel",
        name: "Carousel 轮播图",
        element: <CarouselDemo />,
      },
      {
        path: "/components/waterfall",
        name: "Waterfall 瀑布流",
        element: <WaterfallDemo />,
      },
      {
        path: "/components/tree",
        name: "Tree 树形控件",
        element: <TreeDemo />,
      },
      {
        path: "/components/Steps",
        name: "Steps 步骤条",
        element: <StepsDemo />,
      },
      {
        path: "/components/Message",
        name: "Message 未读信息",
        element: <MessageDemo />,
      },
      {
        path: "/components/ImagePreview",
        name: "ImagePreview 图片预览",
        element: <ImagePreviewDemo />,
      },
    ],
  },
  {
    path: "/effects",
    name: "特效",
    key: "effects",
    children: [
      {
        path: "/effects/shake",
        name: "抖动",
        element: <ShakeDemo />,
      },
      {
        path: "/effects/push",
        name: "推开",
        element: <PushDemo />,
      },
      {
        path: "/effects/pacman",
        name: "吃豆人",
        element: <PacmanDemo />,
      },
      {
        path: "/effects/ripple",
        name: "水波纹",
        element: <RippleDemo />,
      },
      {
        path: "/effects/ball",
        name: "自由落体",
        element: <BallFreeDownDemo />,
      },
      {
        path: "/effects/ballbounce",
        name: "小球左右弹跳",
        element: <BallBounceDemo />,
      },
      {
        path: "/effects/inertiaball",
        name: "惯性拖动",
        element: <InertiaBallDemo />,
      },
    ],
  },
];

export default routes;
