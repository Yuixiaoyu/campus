// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** addComment POST /api/comment/add */
export async function addCommentUsingPost(
  body: API.CommentAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/comment/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** getCommentListByArticleId GET /api/comment/list */
export async function getCommentListByArticleIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCommentListByArticleIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListCommentVO_>("/api/comment/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
