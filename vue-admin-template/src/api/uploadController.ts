// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** uploadImages POST /api/upload/fileList */
export async function uploadImagesUsingPost1(
  body: {
    /** file */
    file: any[];
  },
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListString_>("/api/upload/fileList", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: body,
    ...(options || {}),
  });
}
