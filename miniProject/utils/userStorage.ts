import CryptoJS from 'crypto-js';

// 加密密钥，实际项目中应妥善保管
const SECRET_KEY = 'campus';

// 存储用户信息的键名
const USER_INFO_KEY = 'userInfo';

/**
 * 生成随机数
 * @returns 随机数
 */
function getRandomWord() {
    const randomWords = [
        'apple', 'banana', 'cherry', 'date', 'elderberry',
        'fig', 'grape', 'honeydew', 'kiwi', 'lemon',
        'mango', 'nectarine', 'orange', 'papaya', 'quince',
        'raspberry', 'strawberry', 'tangerine', 'ugli', 'vanilla'
    ];
    const randomIndex = Math.floor(Math.random() * randomWords.length);
    return randomWords[randomIndex];
}

/**
 * 生成随机盐
 * @returns 随机盐
 */
function generateSalt() {
    const saltLength = 16;
    let salt = '';
    for (let i = 0; i < saltLength; i++) {
        salt += getRandomWord();
    }
    return salt;
}

/**
 * 加密数据
 * @param data 需要加密的数据
 * @returns 加密后的字符串
 */
function encryptData(data: any): string {
    const salt = generateSalt();
    const iv = CryptoJS.lib.WordArray.random(16); // 生成随机的初始化向量
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY + salt, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return salt + ':' + iv.toString(CryptoJS.enc.Base64) + ':' + encrypted.toString();
}

/**
 * 解密数据
 * @param encryptedData 加密后的字符串
 * @returns 解密后的数据
 */
function decryptData(encryptedData: string): any {
    const parts = encryptedData.split(':');
    const salt = parts[0];
    const iv = CryptoJS.enc.Base64.parse(parts[1]);
    const encrypted = parts[2];
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY + salt, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    const originalText = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(originalText);
}

/**
 * 存储用户信息
 * @param userInfo 用户信息对象
 */
export function setUserInfo(userInfo: any): void {
    const encryptedData = encryptData(userInfo);
    uni.setStorageSync(USER_INFO_KEY, encryptedData);
}

/**
 * 获取用户信息
 * @returns 用户信息对象
 */
export function getUserInfo(): any {
    const encryptedData = uni.getStorageSync(USER_INFO_KEY);
    if (encryptedData) {
        return decryptData(encryptedData);
    }
    return null;
}

/**
 * 清除用户信息
 */
export function clearUserInfo(): void {
    uni.removeStorageSync(USER_INFO_KEY);
}