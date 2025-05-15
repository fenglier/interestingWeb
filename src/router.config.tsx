/*
 * @Author: fengli
 * @Description: 配置式路由。结合App.tsx和Layout.tsx使用实现的。
 * Layout.tsx先遍历路由配置，获取到一级路由和二级路由，分别在顶部导航和侧边导航，通过监听浏览器的路由判断当前激活的是哪一个一级路由，从而渲染二级路由，然后在Layout.tsx中渲染。
 * @Date: 2025-05-07 12:41:45
 * @lastEditors: fengli
 * @lastEditTime:
 */
import Welcome from "./pages/Welcome";

import CarouselDemo from "./pages/CarouselDemo.mdx";
import WaterfallDemo from "./pages/WaterfallDemo.mdx";
import TreeDemo from "./pages/TreeDemo.mdx";
import StepsDemo from "./pages/StepsDemo.mdx";
import MessageDemo from "./pages/MessageDemo.mdx";
import ImagePreviewDemo from "./pages/ImagePreviewDemo.mdx";
import ShakeDemo from "./pages/ShakeDemo.mdx";
import PushDemo from "./pages/PushDemo.mdx";
import PacmanDemo from "./pages/PacmanDemo.mdx";
import RippleDemo from "./pages/RippleDemo.mdx";
import BallFreeDownDemo from "./pages/BallFreeDownDemo.mdx";

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
    ],
  },
];

export default routes;
