"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
function formatImage(res) {
  if (uni_modules_wotDesignUni_components_common_util.isArray(res.tempFiles)) {
    const result = [];
    res.tempFiles.forEach(async (item) => {
      result.push({
        path: item.path || "",
        name: item.name || "",
        size: item.size,
        type: "image",
        thumb: item.path || ""
      });
    });
    return result;
  } else {
    return [
      {
        path: res.tempFiles.path || "",
        name: res.tempFiles.name || "",
        size: res.tempFiles.size,
        type: "image",
        thumb: res.tempFiles.path || ""
      }
    ];
  }
}
function formatVideo(res) {
  return [
    {
      path: res.tempFilePath || res.filePath || "",
      name: res.name || "",
      size: res.size,
      type: "video",
      thumb: res.thumbTempFilePath || "",
      duration: res.duration
    }
  ];
}
function formatMedia(res) {
  return res.tempFiles.map((item) => ({
    type: item.fileType,
    path: item.tempFilePath,
    thumb: item.fileType === "video" ? item.thumbTempFilePath : item.tempFilePath,
    size: item.size,
    duration: item.duration
  }));
}
function chooseFile({
  multiple,
  sizeType,
  sourceType,
  maxCount,
  accept,
  compressed,
  maxDuration,
  camera
}) {
  return new Promise((resolve, reject) => {
    switch (accept) {
      case "image":
        common_vendor.index.chooseImage({
          count: multiple ? Math.min(maxCount, 9) : 1,
          // 最多可以选择的数量，如果不支持多选则数量为1
          sizeType,
          sourceType,
          success: (res) => resolve(formatImage(res)),
          fail: (error) => {
            reject(error);
          }
        });
        break;
      case "video":
        common_vendor.index.chooseVideo({
          sourceType,
          compressed,
          maxDuration,
          camera,
          success: (res) => {
            resolve(formatVideo(res));
          },
          fail: reject
        });
        break;
      case "media":
        common_vendor.index.chooseMedia({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType,
          sizeType,
          camera,
          maxDuration,
          success: (res) => resolve(formatMedia(res)),
          fail: reject
        });
        break;
      case "file":
        common_vendor.index.chooseMessageFile({
          count: multiple ? Math.min(maxCount, 100) : 1,
          type: accept,
          success: (res) => resolve(res.tempFiles),
          fail: reject
        });
        break;
      case "all":
        common_vendor.index.chooseMessageFile({
          count: multiple ? Math.min(maxCount, 100) : 1,
          type: accept,
          success: (res) => resolve(res.tempFiles),
          fail: reject
        });
        break;
      default:
        common_vendor.index.chooseImage({
          count: multiple ? Math.min(maxCount, 9) : 1,
          // 最多可以选择的数量，如果不支持多选则数量为1
          sizeType,
          sourceType,
          success: (res) => resolve(formatImage(res)),
          fail: reject
        });
        break;
    }
  });
}
exports.chooseFile = chooseFile;
