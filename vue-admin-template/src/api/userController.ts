// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** addUser POST /api/user/add */
export async function addUserUsingPost(
  body: API.UserAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/user/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUser POST /api/user/delete */
export async function deleteUserUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/user/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserById GET /api/user/get */
export async function getUserByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUser_>("/api/user/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getLoginUser GET /api/user/get/login */
export async function getLoginUserUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVo_>("/api/user/get/login", {
    method: "GET",
    ...(options || {}),
  });
}

/** getUserVOById GET /api/user/get/vo */
export async function getUserVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserVO_>("/api/user/get/vo", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserVOByPage POST /api/user/list/page/vo */
export async function listUserVoByPageUsingPost(
  body: API.UserQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageUserVO_>("/api/user/list/page/vo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogin POST /api/user/login */
export async function userLoginUsingPost(
  body: API.UserLoginRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLoginUserVo_>("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogout GET /api/user/logout */
export async function userLogoutUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>("/api/user/logout", {
    method: "GET",
    ...(options || {}),
  });
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPost(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUser POST /api/user/update */
export async function updateUserUsingPost(
  body: API.UserUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUserWX POST /api/user/update/wx */
export async function updateUserWxUsingPost(
  body: API.UserWxUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseWxUserVO_>("/api/user/update/wx", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** wxLogin POST /api/user/wx/login */
export async function wxLoginUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.wxLoginUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLoginUserVo_>("/api/user/wx/login", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
