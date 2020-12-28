/*
 * @Author: your name
 * @Date: 2020-12-22 20:18:17
 * @LastEditTime: 2020-12-24 01:56:38
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
                name: '人员职级与定价',
                path: '/list',
                component: './ListTableList',
              },
              {
                name: '项目总表',
                // path: '/list',
                // component: './ListTableList1',
              },
              {
                name: '项目管理',
                // path: '/list1',
                // component: './ListTableList1',
              },
              {
                name: '资源匹配',
                // path: '/list4',
                // component: './ListTableList4',
              },
              {
                name: '工时填报',
                // path: '/list5',
                // component: './ListTableList5',
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
