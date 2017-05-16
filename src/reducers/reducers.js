import {
    combineReducers
} from 'redux';
import {
    local,
    localRemove
} from '../utils/myUtils'

function addList(state = {
    count: 0
}, action) {
    const count = state.count
    switch (action.type) {
        case 'ADD':
            return {
                count: count + 1
            };
        case 'SUB':
            return {
                count: count - 1
            };
        default:
            return state
    }
}

function setPhoto(state = {
    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494579355002&di=aed915bdc258ca4997645ab09da0451a&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F00%2F03%2F458PICs58PICXFu.jpg'
}, action) {
    switch (action.type) {
        case 'SET_PHOTO':
            return {
                url: action.url
            }
        default:
            return state;
    }
}

/**
 * [user 记录用户信息]
 * @param  {[userInfo]} options.userInfo [用户唯一标识]
 * @param  {[type]} options.isLogin  [是否登录]
 * @param  {[type]} options.phone    [用户名]
 * @param  {[type]} action           [dipatch]
 * @return {[type]}                  [返回用户信息]
 */
function user({
    userInfo = local('userInfo') || '',
    isLogin = local('isLogin') || false,
    phone = local('userPhone') || ''
} = {}, action) {
    switch (action.type) {
        case 'SET_LOGIN':
            const users = action.payload;
            local('userInfo', users.userInfo)
            local('isLogin', users.isLogin)
            local('userPhone', users.phone)
            return {
                userInfo: users.userInfo,
                isLogin: users.isLogin,
                phone: users.phone
            };
        case 'SET_LOGINOUT':
            localRemove('userInfo');
            localRemove('isLogin');
            localRemove('userPhone');
            return {
                userInfo: '',
                isLogin: false,
                phone: ''
            };
        default:
            return {
                userInfo,
                isLogin,
                phone
            }
    }
}

function loginReducer({
    isLogin,
    isLogining,
    userInfo
} = {
    isLogin: false,
    isLogining: false,
    userInfo: local('userInfo') || ''
}, action) {
    switch (action.type) {
        case 'FETCH_REQUEST_LOGIN':
            return {
                isLogin: false,
                isLogining: true,
                userInfo: action.userInfo
            };
        case 'FETCH_SUCCESS_LOGIN':
            console.log('进入登录状态');
            local('userInfo', action.userInfo);
            return {
                isLogin: true,
                isLogining: false,
                userInfo: action.userInfo
            };
        case 'FETCH_FAILED_LOGIN':
            console.log('进入无登录状态')
            localRemove('userInfo');
            return {
                isLogin: false,
                isLogining: false,
                userInfo: ''
            };
        case 'FETCH_REQUEST_LOGOUT':
            console.log('退出登录状态')
            localRemove('userInfo');
            return {
                isLogin: false,
                isLogining: false,
                userInfo: ''
            };

        default:
            return {
                isLogin,
                isLogining,
                userInfo
            };
    }
}

var reducers = combineReducers({
    addList: addList,
    loginObj: loginReducer, //登录验证
    user: user,
    setPhoto: setPhoto
})

export default reducers