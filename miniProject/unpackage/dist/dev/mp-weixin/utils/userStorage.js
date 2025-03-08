"use strict";
const common_vendor = require("../common/vendor.js");
const SECRET_KEY = "campus";
const USER_INFO_KEY = "userInfo";
function getRandomWord() {
  const randomWords = [
    "apple",
    "banana",
    "cherry",
    "date",
    "elderberry",
    "fig",
    "grape",
    "honeydew",
    "kiwi",
    "lemon",
    "mango",
    "nectarine",
    "orange",
    "papaya",
    "quince",
    "raspberry",
    "strawberry",
    "tangerine",
    "ugli",
    "vanilla"
  ];
  const randomIndex = Math.floor(Math.random() * randomWords.length);
  return randomWords[randomIndex];
}
function generateSalt() {
  const saltLength = 16;
  let salt = "";
  for (let i = 0; i < saltLength; i++) {
    salt += getRandomWord();
  }
  return salt;
}
function encryptData(data) {
  const salt = generateSalt();
  const iv = common_vendor.CryptoJS.lib.WordArray.random(16);
  const encrypted = common_vendor.CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY + salt, {
    iv,
    padding: common_vendor.CryptoJS.pad.Pkcs7,
    mode: common_vendor.CryptoJS.mode.CBC
  });
  return salt + ":" + iv.toString(common_vendor.CryptoJS.enc.Base64) + ":" + encrypted.toString();
}
function decryptData(encryptedData) {
  const parts = encryptedData.split(":");
  const salt = parts[0];
  const iv = common_vendor.CryptoJS.enc.Base64.parse(parts[1]);
  const encrypted = parts[2];
  const decrypted = common_vendor.CryptoJS.AES.decrypt(encrypted, SECRET_KEY + salt, {
    iv,
    padding: common_vendor.CryptoJS.pad.Pkcs7,
    mode: common_vendor.CryptoJS.mode.CBC
  });
  const originalText = decrypted.toString(common_vendor.CryptoJS.enc.Utf8);
  return JSON.parse(originalText);
}
function setUserInfo(userInfo) {
  const encryptedData = encryptData(userInfo);
  common_vendor.index.setStorageSync(USER_INFO_KEY, encryptedData);
}
function getUserInfo() {
  const encryptedData = common_vendor.index.getStorageSync(USER_INFO_KEY);
  if (encryptedData) {
    return decryptData(encryptedData);
  }
  return null;
}
exports.getUserInfo = getUserInfo;
exports.setUserInfo = setUserInfo;
