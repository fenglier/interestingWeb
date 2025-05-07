/*
 * @Author: fengli
 * @Description: 配置式路由
 * @Date: 2025-05-07 12:41:45
 * @lastEditors: fengli
 * @lastEditTime:
 */
import Welcome from "./pages/Welcome";
import CarouselDemo from "./pages/CarouselDemo";
import WaterfallDemo from "./pages/WaterfallDemo";


const routes = [
  {
    path: "/interestingWeb",
    name: "InterestingWeb",
    key: "interestingWeb",
    children: [
      {
        path: "/interestingWeb/welcome",
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
    ],
  },
];

export default routes;
