// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** addArticle POST /api/article/add */
export async function addArticleUsingPost(
  body: API.ArticleAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/article/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** getArticleList POST /api/article/articleList/page */
export async function getArticleListUsingPost(
  body: API.ArticleQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageArticleVO_>(
    "/api/article/articleList/page",
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

/** getArticleByUserId GET /api/article/get */
export async function getArticleByUserIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getArticleByUserIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListArticleVO_>("/api/article/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getArticleByArticleId GET /api/article/get/detail */
export async function getArticleByArticleIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getArticleByArticleIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseArticleVO_>("/api/article/get/detail", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** likeComment GET /api/article/like/${param0} */
export async function likeCommentUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.likeCommentUsingGETParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/api/article/like/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** reportArticle POST /api/article/report */
export async function reportArticleUsingPost(
  body: API.ArticleReportRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/article/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** getArticleTags GET /api/article/tags */
export async function getArticleTagsUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListString_>("/api/article/tags", {
    method: "GET",
    ...(options || {}),
  });
}

/** uploadImages POST /api/article/uploadImages */
export async function uploadImagesUsingPost(
  body: {
    /** file */
    file: any[];
  },
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListString_>("/api/article/uploadImages", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: body,
    ...(options || {}),
  });
}
