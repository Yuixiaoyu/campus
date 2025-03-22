// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/**
 * getActivityList POST /api/activity/activityList/page
 */
export async function getActivityListUsingPost(
  body,
  options = {}
) {
  return request({
    url: "/activity/activityList/page",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...options
  });
}

/**
 * publishActivity POST /api/activity/publish
 */
export async function publishActivityUsingPost(
  body,
  options = {}
) {
  return request({
    url: "/activity/publish",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...options
  });
}

/**
 * registrationActivity POST /api/activity/registration
 */
export async function registrationActivityUsingPost(
  body,
  options = {}
) {
  return request({
    url: "/activity/registration",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...options
  });
}

/**
 * removeActivity POST /api/activity/remove/${param0}
 */
export async function removeActivityUsingPost(
  params,
  options = {}
) {
  const { id: param0, ...queryParams } = params;
  return request({
    url: `/activity/remove/${param0}`,
    method: "POST",
    params: { ...queryParams },
    ...options
  });
}

/**
 * updateActivity POST /api/activity/update
 */
export async function updateActivityUsingPost(
  body,
  options = {}
) {
  return request({
    url: "/activity/update",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...options
  });
}