/*
 * @Author: fengli
 * @Description: 配置式路由
 * @Date: 2025-05-07 12:41:45
 * @lastEditors: fengli
 * @lastEditTime: 
 */
import Welcome from './pages/Welcome';
/* import Users from './pages/About';
import Settings from './pages/Settings'; */
import About from './pages/About';

 const routes = [
    {
        path: '/interestingWeb',
        name: 'InterestingWeb',
        key: 'interestingWeb',
        children: [
            {
                path: '/interestingWeb/welcome',
                name: 'Welcome',
                element: <Welcome />,
            },
        ],
    },
    {
        path: '/users',
        name: 'Users',
        key: 'users',
        children: [
            {
                path: '/users/list',
                name: 'User List',
                element: <About />,
            },
        ],
    }
];

export default routes;
