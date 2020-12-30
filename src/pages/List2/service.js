/*
 * @Author: your name
 * @Date: 2020-12-28 11:33:15
 * @LastEditTime: 2020-12-28 14:53:54
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ant-prov4-block\src\pages\List2\service.js
 */
import request from 'umi-request';

export async function queryRule(params) {
  return request('/api/rule2', {
    params,
  });
}
export async function removeRule(params) {
  return request('/api/rule2', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule2', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/rule2', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
