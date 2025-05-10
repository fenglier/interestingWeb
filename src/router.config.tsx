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
import WaterfallDemo from "./pages/WaterfallDemo";
import TreeDemo from "./pages/TreeDemo.mdx";

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
        name: "轮播图",
        element: <CarouselDemo />,
      },
      {
        path: "/components/waterfall",
        name: "瀑布流",
        element: <WaterfallDemo />,
      },
      {
        path: "/components/tree",
        name: "树形控件",
        element: <TreeDemo />,
      },
    ],
  },
];

export default routes;
