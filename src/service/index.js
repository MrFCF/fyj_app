import axios from 'axios'
axios.defaults.baseURL = '/api/'
axios.defaults.timeout = 5000
axios.defaults.headers.post['content-Type'] = 'application/json;charset=UTF-8'


/**
 * post方法,对应post请求
 * @desc 登录页
 * @param {string} url [请求的url地址]
 * @param {Object} data [请求的携带的参数]
 * 
 * */


//  登录完成后的所有请求必须添加用户token 
export function loginPost(data){
    return axios({
		url:`/login`,
		method:'get',
		params:data
	})
}
// 获取销售额度和店面数据
export function getUserProgress(data){
    return axios({
		url:`/api/getUserProgress`,
		method:'post',
		params:data
	})
}
// 退出登录
export function logout(data){
	// 当我退出登录时删除拦截器;
	axios.interceptors.request.eject(axiosIns);
}

// 请求拦截器
let axiosIns = axios.interceptors.request.use(
	config => {
		let LoginToken = sessionStorage.getItem("LoginToken");
		if(LoginToken){
			config.headers.Authorization = `Bearer ${LoginToken}`;
		}
	  	return config;
	},
	err => {
	  return Promise.reject(err);
	}	
  )