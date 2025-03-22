// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** uploadFiles POST /api/upload */
export async function uploadFilesUsingPost(
  body: {
    /** files */
    files: any[];
  },
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListString_>("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: body,
    ...(options || {}),
  });
}
