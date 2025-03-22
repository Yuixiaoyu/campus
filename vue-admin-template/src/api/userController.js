import request from '@/utils/request'

/** 用户登录 POST /api/user/login */
export async function userLoginUsingPost(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

/** 获取当前登录用户 GET /api/user/get/login */
export async function getLoginUserUsingGet() {
  return request({
    url: '/user/get/login',
    method: 'get'
  })
}

/** 分页获取用户列表 POST /api/user/list/page */
export async function listUserVoByPageUsingPost(data) {
  return request({
    url: '/user/list/page/vo',
    method: 'post',
    data
  })
}

/** 删除用户 POST /api/user/delete */
export async function deleteUserUsingPost(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}

/** 更新用户 POST /api/user/update */
export async function updateUserUsingPost(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
} 