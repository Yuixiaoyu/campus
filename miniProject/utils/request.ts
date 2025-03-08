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
const base_url = 'http://localhost:8090';
const timeout = 5000;

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
                uni.navigateTo({
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
            timeout: timeout,
            withCredentials: true,
            success(response) {
                const res: ResponseData = response;
                if (res.statusCode === 200) {
                    resolve(res.data);
                } else {
                    switch (res.statusCode) {
                        case 40100:
                            handleLogin();
                            break;
                        case 40400:
                            uni.showToast({
                                title: '请求地址不存在...',
                                duration: 2000,
                            });
                            break;
                        default:
                            uni.showToast({
                                title: '请重试...',
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
                        duration: 2000,
                    });
                }
                reject(err);
            },
            complete() {
                uni.hideLoading();
                uni.hideToast();
            },
        });
    });
};