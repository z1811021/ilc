/*
 * @Author: your name
 * @Date: 2020-12-22 20:18:17
 * @LastEditTime: 2020-12-30 15:38:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ant-prov4-block\config\routes.js
 */
export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: '需求管理',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
              },
              {
                name: '项目总表',
                path: '/list2',
                component: './List2',
              },
              {
                name: '项目管理',
                path: '/list3',
                component: './List3',
              },
              {
                name: '资源匹配',
                path: '/list4',
                component: './List4',
              },
              {
                name: '工时填报',
                path: '/list5',
                component: './List5',
              },
              {
                name: '人员职级与定价',
                path: '/list',
                component: './ListTableList',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
