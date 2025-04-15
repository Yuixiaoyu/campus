// types.ts
export interface RequestParams {
    url: string;
    method: string;
    data?: any;
    header?: any;
}
export interface ResponseData {
    statusCode: number;
    data: any;
}

// request.ts
const base_url = 'https://campus.fybreeze.cn';
//  const base_url = 'http://localhost:8090';

// 请求头配置
const defaultHeader = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
};

// 登录处理函数
const handleLogin = () => {
    uni.clearStorageSync();
    uni.showModal({
        title: "提示",
        content: "请登录",
        showCancel: false,
        success() {
            setTimeout(() => {
                uni.reLaunch({
                    url: "/pages/login/login",
                });
            }, 1000);
        },
    });
};

// 全局请求封装
export default (params: RequestParams) => {
    let url = params.url;
    let method = params.method || "GET";
    let data = params.data || {};
    let enableChunked = params.enableChunked || false;
    let header = {
        'sa-Token': uni.getStorageSync('token') || '',
        ...defaultHeader,
        ...params.header,
    };

    return new Promise((resolve, reject) => {
        uni.request({
            url: base_url + url,
            method: method,
            header: header,
            data: data,
            enableChunked: enableChunked,
            withCredentials: true,
            success(response) {
                const res: ResponseData = response;
                if (res.data.code === 200) {
                    resolve(res.data);
                } else {
                    switch (res.data.code) {
                        case 40100:
                            handleLogin();
                            break;
                        case 40400:
                            uni.showToast({
                                title: '请求地址不存在...',
                                icon: "error",
                                duration: 2000,
                            });
                            break;
                        case 40000:
                            uni.showToast({
                                title: res.data.message,
                                icon: "error",
                                duration: 2000,
                            })
                            break;
                        default:
                            uni.showToast({
                                title: res.data.message,
                                icon: "error",
                                duration: 2000,
                            });
                            break;
                    }
                }
            },
            fail(err) {
                console.log(err);
                if (err.errMsg.includes('request:fail')) {
                    uni.showToast({
                        title: '网络异常',
                        icon: "error",
                        duration: 2000,
                    });
                } else {
                    uni.showToast({
                        title: '未知异常',
                        icon: "error",
                        duration: 2000,
                    });
                }
                reject(err);
            },
            complete() {
                // console.log("隐藏")
            },
        });
    });
};
// 声明环境变量类型
declare global {
  interface ImportMeta {
    env: {
      VITE_API_BASE_URL: string
    }
  }
}

// 请求配置类型
export interface RequestOptions {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: Record<string, string>
}

// 请求响应类型
export interface RequestResponse<T = any> {
  data: T
  statusCode: number
  header: Record<string, string>
  cookies: string[]
}

// 基础URL
// const baseUrl = 'http://localhost:8090' // 或者使用环境变量: import.meta.env.VITE_API_BASE_URL

/**
 * 处理登录
 */
function handleAuthError() {
  uni.clearStorageSync()
  uni.showModal({
    title: '提示',
    content: '请登录',
    showCancel: false,
    success() {
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/login/login'
        })
      }, 1000)
    }
  })
}

/**
 * 处理错误响应
 * @param response 响应数据
 */
function handleErrorResponse(response: { code: number; message: string }) {
  switch (response.code) {
    case 40100:
      handleAuthError()
      break
    case 40400:
      uni.showToast({
        title: '请求地址不存在',
        icon: 'error',
        duration: 2000
      })
      break
    default:
      uni.showToast({
        title: response.message || '请求失败',
        icon: 'error',
        duration: 2000
      })
  }
}

/**
 * 封装uni.request请求
 * @param options 请求配置
 */
export function request<T>(options: RequestOptions): Promise<T> {
  return new Promise((resolve, reject) => {
    uni.request({
      url: options.url.startsWith('http') ? options.url : baseUrl + options.url,
      method: options.method.toUpperCase() as 'GET' | 'POST' | 'PUT' | 'DELETE',
      data: options.data,
      header: {
        ...defaultHeader,
        'sa-Token': uni.getStorageSync('token') || '',
        ...options.header
      },
      success: (res: RequestResponse) => {
        if (res.statusCode === 200) {
          const responseData = res.data as T
          if (responseData && (responseData as any).code === 200) {
            resolve(responseData)
          } else {
            handleErrorResponse(responseData as any)
            reject(new Error((responseData as any).message || '请求失败'))
          }
        } else {
          reject(new Error(`HTTP错误: ${res.statusCode}`))
        }
      },
      fail: (err: any) => {
        console.error('请求失败:', err)
        uni.showToast({
          title: err.errMsg?.includes('request:fail') ? '网络异常' : '未知异常',
          icon: 'error',
          duration: 2000
        })
        reject(new Error(err.errMsg || '网络错误'))
      }
    })
  })
}
