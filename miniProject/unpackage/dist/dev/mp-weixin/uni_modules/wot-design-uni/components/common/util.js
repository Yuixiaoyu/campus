"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_AbortablePromise = require("./AbortablePromise.js");
function uuid() {
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}
function s4() {
  return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
}
function addUnit(num) {
  return Number.isNaN(Number(num)) ? `${num}` : `${num}px`;
}
function isObj(value) {
  return Object.prototype.toString.call(value) === "[object Object]" || typeof value === "object";
}
function getType(target) {
  const typeStr = Object.prototype.toString.call(target);
  const match = typeStr.match(/\[object (\w+)\]/);
  const type = match && match.length ? match[1].toLowerCase() : "";
  return type;
}
const isDef = (value) => value !== void 0 && value !== null;
const checkNumRange = (num, label = "value") => {
  if (num < 0) {
    throw new Error(`${label} shouldn't be less than zero`);
  }
};
function rgbToHex(r, g, b) {
  const hex = (r << 16 | g << 8 | b).toString(16);
  const paddedHex = "#" + "0".repeat(Math.max(0, 6 - hex.length)) + hex;
  return paddedHex;
}
function hexToRgb(hex) {
  const rgb = [];
  for (let i = 1; i < 7; i += 2) {
    rgb.push(parseInt("0x" + hex.slice(i, i + 2), 16));
  }
  return rgb;
}
const gradient = (startColor, endColor, step = 2) => {
  const sColor = hexToRgb(startColor);
  const eColor = hexToRgb(endColor);
  const rStep = (eColor[0] - sColor[0]) / step;
  const gStep = (eColor[1] - sColor[1]) / step;
  const bStep = (eColor[2] - sColor[2]) / step;
  const gradientColorArr = [];
  for (let i = 0; i < step; i++) {
    gradientColorArr.push(
      rgbToHex(parseInt(String(rStep * i + sColor[0])), parseInt(String(gStep * i + sColor[1])), parseInt(String(bStep * i + sColor[2])))
    );
  }
  return gradientColorArr;
};
const range = (num, min, max) => {
  return Math.min(Math.max(num, min), max);
};
const isEqual = (value1, value2) => {
  if (value1 === value2) {
    return true;
  }
  if (!Array.isArray(value1) || !Array.isArray(value2)) {
    return false;
  }
  if (value1.length !== value2.length) {
    return false;
  }
  for (let i = 0; i < value1.length; ++i) {
    if (value1[i] !== value2[i]) {
      return false;
    }
  }
  return true;
};
const padZero = (number, length = 2) => {
  let numStr = number.toString();
  while (numStr.length < length) {
    numStr = "0" + numStr;
  }
  return numStr;
};
const context = {
  id: 1e3
};
function getRect(selector, all, scope, useFields) {
  return new Promise((resolve, reject) => {
    let query = null;
    if (scope) {
      query = common_vendor.index.createSelectorQuery().in(scope);
    } else {
      query = common_vendor.index.createSelectorQuery();
    }
    const method = all ? "selectAll" : "select";
    const callback = (rect) => {
      if (all && isArray(rect) && rect.length > 0) {
        resolve(rect);
      } else if (!all && rect) {
        resolve(rect);
      } else {
        reject(new Error("No nodes found"));
      }
    };
    if (useFields) {
      query[method](selector).fields({ size: true, node: true }, callback).exec();
    } else {
      query[method](selector).boundingClientRect(callback).exec();
    }
  });
}
function kebabCase(word) {
  const newWord = word.replace(/[A-Z]/g, function(match) {
    return "-" + match;
  }).toLowerCase();
  return newWord;
}
function camelCase(word) {
  return word.replace(/-(\w)/g, (_, c) => c.toUpperCase());
}
function isArray(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === "[object Array]";
}
function isFunction(value) {
  return getType(value) === "function" || getType(value) === "asyncfunction";
}
function isString(value) {
  return getType(value) === "string";
}
function isNumber(value) {
  return getType(value) === "number";
}
function isPromise(value) {
  if (isObj(value) && isDef(value)) {
    return isFunction(value.then) && isFunction(value.catch);
  }
  return false;
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function objToStyle(styles) {
  if (isArray(styles)) {
    return styles.filter(function(item) {
      return item != null && item !== "";
    }).map(function(item) {
      return objToStyle(item);
    }).join(";");
  }
  if (isString(styles)) {
    return styles;
  }
  if (isObj(styles)) {
    return Object.keys(styles).filter(function(key) {
      return styles[key] != null && styles[key] !== "";
    }).map(function(key) {
      return [kebabCase(key), styles[key]].join(":");
    }).join(";");
  }
  return "";
}
const pause = (ms = 1e3 / 30) => {
  return new uni_modules_wotDesignUni_components_common_AbortablePromise.AbortablePromise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve(true);
    }, ms);
  });
};
function deepClone(obj, cache = /* @__PURE__ */ new Map()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (isDate(obj)) {
    return new Date(obj.getTime());
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }
  if (obj instanceof Error) {
    const errorCopy = new Error(obj.message);
    errorCopy.stack = obj.stack;
    return errorCopy;
  }
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  const copy = Array.isArray(obj) ? [] : {};
  cache.set(obj, copy);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepClone(obj[key], cache);
    }
  }
  return copy;
}
function deepMerge(target, source) {
  target = deepClone(target);
  if (typeof target !== "object" || typeof source !== "object") {
    throw new Error("Both target and source must be objects.");
  }
  for (const prop in source) {
    if (!source.hasOwnProperty(prop))
      continue;
    target[prop] = source[prop];
  }
  return target;
}
function deepAssign(target, source) {
  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const newObjValue = source[key];
    if (isObj(targetValue) && isObj(newObjValue)) {
      deepAssign(targetValue, newObjValue);
    } else {
      target[key] = newObjValue;
    }
  });
  return target;
}
function debounce(func, wait, options = {}) {
  let timeoutId = null;
  let lastArgs;
  let lastThis;
  let result;
  const leading = isDef(options.leading) ? options.leading : false;
  const trailing = isDef(options.trailing) ? options.trailing : true;
  function invokeFunc() {
    if (lastArgs !== void 0) {
      result = func.apply(lastThis, lastArgs);
      lastArgs = void 0;
    }
  }
  function startTimer() {
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (trailing) {
        invokeFunc();
      }
    }, wait);
  }
  function cancelTimer() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }
  function debounced(...args) {
    lastArgs = args;
    lastThis = this;
    if (timeoutId === null) {
      if (leading) {
        invokeFunc();
      }
      startTimer();
    } else if (trailing) {
      cancelTimer();
      startTimer();
    }
    return result;
  }
  return debounced;
}
const getPropByPath = (obj, path) => {
  const keys = path.split(".");
  try {
    return keys.reduce((acc, key) => acc !== void 0 && acc !== null ? acc[key] : void 0, obj);
  } catch (error) {
    return void 0;
  }
};
const isDate = (val) => Object.prototype.toString.call(val) === "[object Date]" && !Number.isNaN(val.getTime());
function isVideoUrl(url) {
  const videoRegex = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|video)/i;
  return videoRegex.test(url);
}
function isImageUrl(url) {
  const imageRegex = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|image)/i;
  return imageRegex.test(url);
}
const isH5 = /* @__PURE__ */ (() => {
  let isH52 = false;
  return isH52;
})();
function omitBy(obj, predicate) {
  const newObj = deepClone(obj);
  Object.keys(newObj).forEach((key) => predicate(newObj[key], key) && delete newObj[key]);
  return newObj;
}
exports.addUnit = addUnit;
exports.camelCase = camelCase;
exports.checkNumRange = checkNumRange;
exports.context = context;
exports.debounce = debounce;
exports.deepAssign = deepAssign;
exports.deepClone = deepClone;
exports.deepMerge = deepMerge;
exports.getPropByPath = getPropByPath;
exports.getRect = getRect;
exports.getType = getType;
exports.gradient = gradient;
exports.isArray = isArray;
exports.isDate = isDate;
exports.isDef = isDef;
exports.isEqual = isEqual;
exports.isFunction = isFunction;
exports.isH5 = isH5;
exports.isImageUrl = isImageUrl;
exports.isNumber = isNumber;
exports.isObj = isObj;
exports.isPromise = isPromise;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.isVideoUrl = isVideoUrl;
exports.objToStyle = objToStyle;
exports.omitBy = omitBy;
exports.padZero = padZero;
exports.pause = pause;
exports.range = range;
exports.uuid = uuid;
