"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdUpload_utils = require("./utils.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../composables/useTranslate.js");
const uni_modules_wotDesignUni_components_wdUpload_types = require("./types.js");
if (!Math) {
  (wdIcon + wdLoading + wdVideoPreview)();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const wdVideoPreview = () => "../wd-video-preview/wd-video-preview.js";
const wdLoading = () => "../wd-loading/wd-loading.js";
const __default__ = {
  name: "wd-upload",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdUpload_types.uploadProps,
  emits: ["fail", "change", "success", "progress", "oversize", "chooseerror", "remove", "update:fileList"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    __expose({
      submit: () => startUploadFiles()
    });
    const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("upload");
    const uploadFiles = common_vendor.ref([]);
    const showUpload = common_vendor.computed(() => !props.limit || uploadFiles.value.length < props.limit);
    const videoPreview = common_vendor.ref();
    common_vendor.watch(
      () => props.fileList,
      (val) => {
        const { statusKey } = props;
        if (uni_modules_wotDesignUni_components_common_util.isEqual(val, uploadFiles.value))
          return;
        const uploadFileList = val.map((item) => {
          item[statusKey] = item[statusKey] || "success";
          item.response = item.response || "";
          return { ...item, uid: uni_modules_wotDesignUni_components_common_util.context.id++ };
        });
        uploadFiles.value = uploadFileList;
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.limit,
      (val) => {
        if (val && val < uploadFiles.value.length) {
          console.error("[wot-design]Error: props limit must less than fileList.length");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.beforePreview,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of beforePreview must be Function");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.onPreviewFail,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of onPreviewFail must be Function");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.beforeRemove,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of beforeRemove must be Function");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.beforeUpload,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of beforeUpload must be Function");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.beforeChoose,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of beforeChoose must be Function");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.buildFormData,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          console.error("The type of buildFormData must be Function");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    function emitFileList() {
      emit("update:fileList", uploadFiles.value);
    }
    const upload = (file, formData, options) => {
      const uploadTask = common_vendor.index.uploadFile({
        url: options.action,
        header: options.header,
        name: options.name,
        fileName: options.name,
        fileType: options.fileType,
        formData,
        filePath: file.url,
        success(res) {
          if (res.statusCode === options.statusCode) {
            options.onSuccess(res, file, formData);
          } else {
            options.onError({ ...res, errMsg: res.errMsg || "" }, file, formData);
          }
        },
        fail(err) {
          options.onError(err, file, formData);
        }
      });
      uploadTask.onProgressUpdate((res) => {
        options.onProgress(res, file);
      });
    };
    const startUpload = (file, formData, options) => {
      const { statusKey, uploadMethod } = props;
      file[statusKey] = "loading";
      if (uni_modules_wotDesignUni_components_common_util.isFunction(uploadMethod)) {
        uploadMethod(file, formData, options);
      } else {
        upload(file, formData, options);
      }
    };
    function getImageInfo(img) {
      return new Promise((resolve, reject) => {
        common_vendor.index.getImageInfo({
          src: img,
          success: (res) => {
            resolve(res);
          },
          fail: (error) => {
            reject(error);
          }
        });
      });
    }
    function initFile(file, currentIndex) {
      const { statusKey } = props;
      const initState = {
        uid: uni_modules_wotDesignUni_components_common_util.context.id++,
        // 仅h5支持 name
        name: file.name || "",
        thumb: file.thumb || "",
        [statusKey]: "pending",
        size: file.size || 0,
        url: file.path,
        percent: 0
      };
      if (typeof currentIndex === "number") {
        uploadFiles.value.splice(currentIndex, 1, initState);
      } else {
        uploadFiles.value.push(initState);
      }
      if (props.autoUpload) {
        startUploadFiles();
      }
    }
    function startUploadFiles() {
      const { buildFormData, formData = {}, statusKey } = props;
      const { action, name, header = {}, accept, successStatus } = props;
      const statusCode = uni_modules_wotDesignUni_components_common_util.isDef(successStatus) ? successStatus : 200;
      for (const uploadFile of uploadFiles.value) {
        if (uploadFile[statusKey] == "pending") {
          if (buildFormData) {
            buildFormData({
              file: uploadFile,
              formData,
              resolve: (formData2) => {
                formData2 && startUpload(uploadFile, formData2, {
                  onSuccess: handleSuccess,
                  onError: handleError,
                  onProgress: handleProgress,
                  action,
                  header,
                  name,
                  fileName: name,
                  fileType: accept,
                  statusCode
                });
              }
            });
          } else {
            startUpload(uploadFile, formData, {
              onSuccess: handleSuccess,
              onError: handleError,
              onProgress: handleProgress,
              action,
              header,
              name,
              fileName: name,
              fileType: accept,
              statusCode
            });
          }
        }
      }
    }
    function handleError(err, file, formData) {
      const { statusKey } = props;
      const index = uploadFiles.value.findIndex((item) => item.uid === file.uid);
      if (index > -1) {
        uploadFiles.value[index][statusKey] = "fail";
        uploadFiles.value[index].error = err.message;
        uploadFiles.value[index].response = err;
        emit("fail", { error: err, file, formData });
        emitFileList();
      }
    }
    function handleSuccess(res, file, formData) {
      const { statusKey } = props;
      const index = uploadFiles.value.findIndex((item) => item.uid === file.uid);
      if (index > -1) {
        uploadFiles.value[index][statusKey] = "success";
        uploadFiles.value[index].response = res.data;
        emit("change", { fileList: uploadFiles.value });
        emit("success", { file, fileList: uploadFiles.value, formData });
        emitFileList();
      }
    }
    function handleProgress(res, file) {
      const index = uploadFiles.value.findIndex((item) => item.uid === file.uid);
      if (index > -1) {
        uploadFiles.value[index].percent = res.progress;
        emit("progress", { response: res, file });
      }
    }
    function onChooseFile(currentIndex) {
      const { multiple, maxSize, accept, sizeType, limit, sourceType, compressed, maxDuration, camera, beforeUpload } = props;
      uni_modules_wotDesignUni_components_wdUpload_utils.chooseFile({
        multiple,
        sizeType,
        sourceType,
        maxCount: limit ? limit - uploadFiles.value.length : 9,
        accept,
        compressed,
        maxDuration,
        camera
      }).then((res) => {
        let files = res;
        if (!multiple) {
          files = files.slice(0, 1);
        }
        const mapFiles = async (files2) => {
          for (let index = 0; index < files2.length; index++) {
            const file = files2[index];
            if (file.type === "image" && !file.size) {
              const imageInfo = await getImageInfo(file.path);
              file.size = imageInfo.width * imageInfo.height;
            }
            Number(file.size) <= maxSize ? initFile(file, currentIndex) : emit("oversize", { file });
          }
        };
        if (beforeUpload) {
          beforeUpload({
            files,
            fileList: uploadFiles.value,
            resolve: (isPass) => {
              isPass && mapFiles(files);
            }
          });
        } else {
          mapFiles(files);
        }
      }).catch((error) => {
        emit("chooseerror", { error });
      });
    }
    function handleChoose(index) {
      if (props.disabled)
        return;
      const { beforeChoose } = props;
      if (beforeChoose) {
        beforeChoose({
          fileList: uploadFiles.value,
          resolve: (isPass) => {
            isPass && onChooseFile(index);
          }
        });
      } else {
        onChooseFile(index);
      }
    }
    function handleRemove(file) {
      uploadFiles.value.splice(
        uploadFiles.value.findIndex((item) => item.uid === file.uid),
        1
      );
      emit("change", {
        fileList: uploadFiles.value
      });
      emit("remove", { file });
      emitFileList();
    }
    function removeFile(index) {
      const { beforeRemove } = props;
      const intIndex = index;
      const file = uploadFiles.value[intIndex];
      if (beforeRemove) {
        beforeRemove({
          file,
          index: intIndex,
          fileList: uploadFiles.value,
          resolve: (isPass) => {
            isPass && handleRemove(file);
          }
        });
      } else {
        handleRemove(file);
      }
    }
    function handlePreviewFile(file) {
      common_vendor.index.openDocument({
        filePath: file.url,
        showMenu: true
      });
    }
    function handlePreviewImage(index, lists) {
      const { onPreviewFail } = props;
      common_vendor.index.previewImage({
        urls: lists,
        current: lists[index],
        fail() {
          if (onPreviewFail) {
            onPreviewFail({
              index,
              imgList: lists
            });
          } else {
            common_vendor.index.showToast({ title: "预览图片失败", icon: "none" });
          }
        }
      });
    }
    function handlePreviewVieo(index, lists) {
      const { onPreviewFail } = props;
      common_vendor.index.previewMedia({
        current: index,
        sources: lists.map((file) => {
          return {
            url: file.url,
            type: "video",
            poster: file.thumb
          };
        }),
        fail() {
          if (onPreviewFail) {
            onPreviewFail({
              index,
              imgList: []
            });
          } else {
            common_vendor.index.showToast({ title: "预览视频失败", icon: "none" });
          }
        }
      });
    }
    function onPreviewImage(file) {
      const { beforePreview, reupload } = props;
      const fileList = uni_modules_wotDesignUni_components_common_util.deepClone(uploadFiles.value);
      const index = fileList.findIndex((item) => item.url === file.url);
      const imgList = fileList.filter((file2) => isImage(file2)).map((file2) => file2.url);
      const imgIndex = imgList.findIndex((item) => item === file.url);
      if (reupload) {
        handleChoose(index);
      } else {
        if (beforePreview) {
          beforePreview({
            file,
            index,
            fileList,
            imgList,
            resolve: (isPass) => {
              isPass && handlePreviewImage(imgIndex, imgList);
            }
          });
        } else {
          handlePreviewImage(imgIndex, imgList);
        }
      }
    }
    function onPreviewVideo(file) {
      const { beforePreview, reupload } = props;
      const fileList = uni_modules_wotDesignUni_components_common_util.deepClone(uploadFiles.value);
      const index = fileList.findIndex((item) => item.url === file.url);
      const videoList = fileList.filter((file2) => isVideo(file2));
      const videoIndex = videoList.findIndex((item) => item.url === file.url);
      if (reupload) {
        handleChoose(index);
      } else {
        if (beforePreview) {
          beforePreview({
            file,
            index,
            imgList: [],
            fileList,
            resolve: (isPass) => {
              isPass && handlePreviewVieo(videoIndex, videoList);
            }
          });
        } else {
          handlePreviewVieo(videoIndex, videoList);
        }
      }
    }
    function onPreviewFile(file) {
      const { beforePreview, reupload } = props;
      const fileList = uni_modules_wotDesignUni_components_common_util.deepClone(uploadFiles.value);
      const index = fileList.findIndex((item) => item.url === file.url);
      if (reupload) {
        handleChoose(index);
      } else {
        if (beforePreview) {
          beforePreview({
            file,
            index,
            imgList: [],
            fileList,
            resolve: (isPass) => {
              isPass && handlePreviewFile(file);
            }
          });
        } else {
          handlePreviewFile(file);
        }
      }
    }
    function isVideo(file) {
      return file.name && uni_modules_wotDesignUni_components_common_util.isVideoUrl(file.name) || uni_modules_wotDesignUni_components_common_util.isVideoUrl(file.url);
    }
    function isImage(file) {
      return file.name && uni_modules_wotDesignUni_components_common_util.isImageUrl(file.name) || uni_modules_wotDesignUni_components_common_util.isImageUrl(file.url);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(uploadFiles.value, (file, index, i0) => {
          return common_vendor.e({
            a: isImage(file)
          }, isImage(file) ? {
            b: file.url,
            c: _ctx.imageMode,
            d: common_vendor.o(($event) => onPreviewImage(file), index)
          } : isVideo(file) ? common_vendor.e({
            f: file.thumb
          }, file.thumb ? {
            g: file.thumb,
            h: _ctx.imageMode,
            i: "d50d9cde-0-" + i0,
            j: common_vendor.p({
              name: "play-circle-filled",
              ["custom-class"]: "wd-upload__video-paly"
            }),
            k: common_vendor.o(($event) => onPreviewVideo(file), index)
          } : {
            l: file.url,
            m: file.name || "视频" + index,
            n: file.thumb,
            o: "d50d9cde-1-" + i0,
            p: common_vendor.p({
              name: "play-circle-filled",
              ["custom-class"]: "wd-upload__video-paly"
            }),
            q: common_vendor.o(($event) => onPreviewVideo(file), index)
          }) : {
            r: "d50d9cde-2-" + i0,
            s: common_vendor.p({
              name: "file",
              ["custom-class"]: "wd-upload__file-icon"
            }),
            t: common_vendor.t(file.name || file.url),
            v: common_vendor.o(($event) => onPreviewFile(file), index)
          }, {
            e: isVideo(file),
            w: file[props.statusKey] !== "success"
          }, file[props.statusKey] !== "success" ? common_vendor.e({
            x: file[props.statusKey] === "loading"
          }, file[props.statusKey] === "loading" ? {
            y: "d50d9cde-3-" + i0,
            z: common_vendor.p({
              type: _ctx.loadingType,
              size: _ctx.loadingSize,
              color: _ctx.loadingColor
            }),
            A: common_vendor.t(file.percent)
          } : {}, {
            B: file[props.statusKey] === "fail"
          }, file[props.statusKey] === "fail" ? {
            C: "d50d9cde-4-" + i0,
            D: common_vendor.p({
              name: "close-outline",
              ["custom-class"]: "wd-upload__icon"
            }),
            E: common_vendor.t(file.error || common_vendor.unref(translate)("error"))
          } : {}) : {}, {
            F: file[props.statusKey] !== "loading" && !_ctx.disabled
          }, file[props.statusKey] !== "loading" && !_ctx.disabled ? {
            G: common_vendor.o(($event) => removeFile(index), index),
            H: "d50d9cde-5-" + i0,
            I: common_vendor.p({
              name: "error-fill",
              ["custom-class"]: "wd-upload__close"
            })
          } : {}, _ctx.$slots["preview-cover"] ? {
            J: "preview-cover-" + i0,
            K: common_vendor.r("preview-cover", {
              file,
              index
            }, i0)
          } : {}, {
            L: index
          });
        }),
        b: _ctx.$slots["preview-cover"],
        c: common_vendor.n(_ctx.customPreviewClass),
        d: showUpload.value
      }, showUpload.value ? common_vendor.e({
        e: _ctx.$slots.default
      }, _ctx.$slots.default ? {
        f: common_vendor.n(_ctx.customEvokeClass),
        g: common_vendor.o(handleChoose)
      } : common_vendor.e({
        h: common_vendor.p({
          name: "fill-camera"
        }),
        i: _ctx.limit && _ctx.showLimitNum
      }, _ctx.limit && _ctx.showLimitNum ? {
        j: common_vendor.t(uploadFiles.value.length),
        k: common_vendor.t(_ctx.limit)
      } : {}, {
        l: common_vendor.o(handleChoose),
        m: common_vendor.n(_ctx.disabled ? "is-disabled" : ""),
        n: common_vendor.n(_ctx.customEvokeClass)
      })) : {}, {
        o: common_vendor.n(_ctx.customClass),
        p: common_vendor.s(_ctx.customStyle),
        q: common_vendor.sr(videoPreview, "d50d9cde-7", {
          "k": "videoPreview"
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d50d9cde"]]);
wx.createComponent(Component);
