// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** addFeedBack POST /api/feedback/add */
export async function addFeedBackUsingPost(
  body: API.FeedbackAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/feedback/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
