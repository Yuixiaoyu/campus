// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** getActivityList POST /api/activity/activityList/page */
export async function getActivityListUsingPost(
  body: API.ActivityQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageActivityVO_>(
    "/api/activity/activityList/page",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** publishActivity POST /api/activity/publish */
export async function publishActivityUsingPost(
  body: API.ActivityAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/activity/publish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** registrationActivity POST /api/activity/registration */
export async function registrationActivityUsingPost(
  body: API.ActivityRegisterRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/activity/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** removeActivity POST /api/activity/remove/${param0} */
export async function removeActivityUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeActivityUsingPOSTParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/api/activity/remove/${param0}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** updateActivity POST /api/activity/update */
export async function updateActivityUsingPost(
  body: API.ActivityEditRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/activity/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
