import es6Promise from 'es6-promise';
es6Promise.polyfill();
import axios from 'axios'
import qs from 'qs'

// http request 拦截器
axios.interceptors.request.use(
	config => {
		if (local('userInfo')) {
			config.headers.accessToken = local('userInfo').accessToken;
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	});

// http response 拦截器
axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		if (error.response) {
			switch (error.response.status) {
				case 401:
					window.location.href = '#/login'
					break;
			}
		}
		return Promise.reject(error.response.data) // 返回接口返回的错误信息
	});


var fetch = ({
	url = '',
	method = 'get',
	responseType = 'json',
	data = data,
	headers = {},
	complete = null,
	setData = false
} = {}) => {
	let _headers = {};

	/* 全局封装数据请求方式
	 * post请求参数放入qs.stringify(data)
	 * get请求参数放入params中
	 */
	return new Promise((resolve, reject) => {
		axios({
			url: url,
			data: method == 'post' ? (setData ? data : qs.stringify(data)) : {},
			method: method,
			headers: Object.assign(_headers, headers),
			params: method == 'get' ? data : {},
			responseType: responseType
		}).then((res) => {
			typeof complete == 'function' && complete(res);
			resolve(res.data);
		}).catch((error) => {
			typeof complete == 'function' && complete(error);
			reject(error)
		})
	})
}

var query = (name, str) => {
	var reg = new RegExp("(^|&)" + name + "=([^&|^#]*)(&|#|$)");
	var str = str ? str : window.location.href;
	var r = str.substr(str.indexOf("?") + 1).match(reg);
	return (r != null) ? unescape(r[2]) : null;
}

var session = (aKey, aVal) => {
	if (typeof aVal == "undefined") {
		return JSON.parse(sessionStorage.getItem(aKey));
	} else {
		sessionStorage.setItem(aKey, JSON.stringify(aVal));
	}
}

var local = (aKey, aVal) => {
	if (typeof aVal == "undefined") {
		return JSON.parse(localStorage.getItem(aKey));
	} else {
		localStorage.setItem(aKey, JSON.stringify(aVal));
	}
}

var sessionRemove = (aKey) => {
	sessionStorage.removeItem(aKey);
}

var localRemove = (aKey) => {
	localStorage.removeItem(aKey);
}

var platform = () => {
	var u = navigator.userAgent,
		app = navigator.appVersion;
	return { //移动终端浏览器版本信息
		trident: u.indexOf('Trident') > -1, //IE内核
		presto: u.indexOf('Presto') > -1, //opera内核
		webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
		gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
		mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
		ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
		iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
		iPad: u.indexOf('iPad') > -1, //是否iPad
		webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
	};
}

var GoLogin = (Modal) => {
	Modal.alert('您的账号未登录', '登陆后您的数据将永久保存到云端', [{
		text: '取消',
		onPress: () => console.log('cancel')
	}, {
		text: '登录',
		onPress: () => window.location.href = '#/login',
		style: {
			color: '#E95941'
		}
	}])
}

var toastBox,
	toastTimer;
var toast = (message, time = 3000, callback) => {
	// 如果存在toast消息框就销毁
	// 全局只保证出现一个toast
	if (toastBox) {
		document.body.removeChild(toastBox);
		clearTimeout(toastTimer);
	}

	// 创建消息框体
	toastBox = document.createElement('div');
	var msg = document.createElement('div');
	toastBox.className = 'native-toast';
	msg.className = 'native-toast-msg';
	msg.innerHTML = message;
	toastBox.appendChild(msg)
	document.body.append(toastBox)
	setTimeout(() => {
		msg.classList.add('active')
	}, 0)

	// 销毁消息框体
	toastTimer = setTimeout(() => {
		document.body.removeChild(toastBox);
		clearTimeout(toastTimer);
		typeof callback == 'function' && callback();
		toastBox = null;
	}, time)
}

export {
	fetch,
	query,
	session,
	local,
	sessionRemove,
	localRemove,
	platform,
	GoLogin,
	toast
};