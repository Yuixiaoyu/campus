"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const uploadProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 上传的文件列表,例如:[{name:'food.jpg',url:'https://xxx.cdn.com/xxx.jpg'}]
   * 类型：array
   * 默认值：[]
   */
  fileList: uni_modules_wotDesignUni_components_common_props.makeArrayProp(),
  /**
   * 必选参数，上传的地址
   * 类型：string
   * 默认值：''
   */
  action: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 设置上传的请求头部
   * 类型：object
   * 默认值：{}
   */
  header: { type: Object, default: () => ({}) },
  /**
   * 是否支持多选文件
   * 类型：boolean
   * 默认值：false
   */
  multiple: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否禁用
   * 类型：boolean
   * 默认值：false
   */
  disabled: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 最大允许上传个数
   * 类型：number
   * 默认值：无
   */
  limit: Number,
  /**
   * 限制上传个数的情况下，是否展示当前上传的个数
   * 类型：boolean
   * 默认值：true
   */
  showLimitNum: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 文件大小限制，单位为byte
   * 类型：number
   * 默认值：Number.MAX_VALUE
   */
  maxSize: uni_modules_wotDesignUni_components_common_props.makeNumberProp(Number.MAX_VALUE),
  /**
   * 选择图片的来源，chooseImage接口详细参数，查看官方手册
   * 类型：array
   * 默认值：['album','camera']
   */
  sourceType: {
    type: Array,
    default: () => ["album", "camera"]
  },
  /**
   * 所选的图片的尺寸，chooseImage接口详细参数，查看官方手册
   * 类型：array
   * 默认值：['original','compressed']
   */
  sizeType: {
    type: Array,
    default: () => ["original", "compressed"]
  },
  /**
   * 文件对应的key，开发者在服务端可以通过这个key获取文件的二进制内容，uploadFile接口详细参数，查看官方手册
   * 类型：string
   * 默认值：'file'
   */
  name: uni_modules_wotDesignUni_components_common_props.makeStringProp("file"),
  /**
   * HTTP请求中其他额外的formdata，uploadFile接口详细参数，查看官方手册
   * 类型：object
   * 默认值：{}
   */
  formData: { type: Object, default: () => {
  } },
  /**
   * 预览失败执行操作
   * 类型：function({index,imgList})
   * 默认值：-
   */
  onPreviewFail: Function,
  /**
   * 上传文件之前的钩子，参数为上传的文件和文件列表，若返回false或者返回Promise且被reject，则停止上传。
   * 类型：function({files,fileList,resolve})
   * 默认值：-
   */
  beforeUpload: Function,
  /**
   * 选择图片之前的钩子，参数为文件列表，若返回false或者返回Promise且被reject，则停止上传。
   * 类型：function({fileList,resolve})
   * 默认值：-
   */
  beforeChoose: Function,
  /**
   * 删除文件之前的钩子，参数为要删除的文件和文件列表，若返回false或者返回Promise且被reject，则停止上传。
   * 类型：function({file,fileList,resolve})
   * 默认值：-
   */
  beforeRemove: Function,
  /**
   * 图片预览前的钩子，参数为预览的图片下标和图片列表，若返回false或者返回Promise且被reject，则停止上传。
   * 类型：function({index,imgList,resolve})
   * 默认值：-
   */
  beforePreview: Function,
  /**
   * 构建上传formData的钩子，参数为上传的文件、待处理的formData，返回值为处理后的formData，若返回false或者返回Promise且被reject，则停止上传。
   * 类型：function({file,formData,resolve})
   * 默认值：-
   * 最低版本：0.1.61
   */
  buildFormData: Function,
  /**
   * 加载中图标类型
   * 类型：string
   * 默认值：'ring'
   */
  loadingType: uni_modules_wotDesignUni_components_common_props.makeStringProp("ring"),
  /**
   * 加载中图标颜色
   * 类型：string
   * 默认值：'#ffffff'
   */
  loadingColor: uni_modules_wotDesignUni_components_common_props.makeStringProp("#ffffff"),
  /**
   * 文件类型，可选值：'image' | 'video' | 'media' | 'all' | 'file'
   * 默认值：image
   * 描述：'media'表示同时支持'image'和'video'，'file'表示支持除'image'和'video'外的所有文件类型，'all'标识支持全部类型文件
   * 'media'和'file'仅微信支持，'all'仅微信和H5支持
   */
  accept: uni_modules_wotDesignUni_components_common_props.makeStringProp("image"),
  /**
   * file 数据结构中，status 对应的 key
   * 类型：string
   * 默认值：'status'
   */
  statusKey: uni_modules_wotDesignUni_components_common_props.makeStringProp("status"),
  /**
   * 加载中图标尺寸
   * 类型：string
   * 默认值：'24px'
   */
  loadingSize: uni_modules_wotDesignUni_components_common_props.makeStringProp("24px"),
  /**
   * 是否压缩视频，当 accept 为 video 时生效。
   * 类型：boolean
   * 默认值：true
   */
  compressed: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 拍摄视频最长拍摄时间，当 accept 为 video | media 时生效，单位秒。
   * 类型：number
   * 默认值：60
   */
  maxDuration: uni_modules_wotDesignUni_components_common_props.makeNumberProp(60),
  /**
   * 使用前置或者后置相机，当 accept 为 video | media 时生效，可选值为：back｜front。
   * 类型：UploadCameraType
   * 默认值：'back'
   */
  camera: uni_modules_wotDesignUni_components_common_props.makeStringProp("back"),
  /**
   * 预览图片的mode属性
   */
  imageMode: uni_modules_wotDesignUni_components_common_props.makeStringProp("aspectFit"),
  /**
   * 接口响应的成功状态（statusCode）值
   */
  successStatus: uni_modules_wotDesignUni_components_common_props.makeNumberProp(200),
  /**
   * 自定义上传按钮样式
   * 类型：string
   */
  customEvokeClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 自定义预览图片列表样式
   * 类型：string
   */
  customPreviewClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 是否选择文件后自动上传
   * 类型：boolean
   */
  autoUpload: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 点击已上传时是否可以重新上传
   * 类型：boolean
   * 默认值：false
   */
  reupload: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 自定义上传文件的请求方法
   * 类型：UploadMethod
   * 默认值：-
   */
  uploadMethod: Function
};
exports.uploadProps = uploadProps;
