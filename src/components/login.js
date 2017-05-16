import React, {
	Component
} from 'react'
import {
	Link,
	hashHistory
} from 'react-router'
import {
	connect
} from 'react-redux'
import {
	fetch,
	local
} from '../utils/myUtils'
import urlHost from '../config/config'
import {
	Button,
	Icon,
	Toast,
	NavBar,
	List,
	InputItem,
	WhiteSpace
} from 'antd-mobile';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			phone: '',
			password: '',
			phoneError: false,
			pswError: false,
			loading: false
		};
	}

	componentDidMount() {
		const {
			userInfo
		} = this.props;
		if (userInfo.phone) {
			this.setState({
				phone: userInfo.phone
			})
		}
	}

	// 退出登录
	loginOut() {
		const {
			dispatch
		} = this.props;
		dispatch({
			type: 'SET_LOGINOUT'
		})
	}

	// 用户提交登录
	submit() {
		var that = this;
		const {
			dispatch
		} = this.props;
		const {
			phone,
			password
		} = this.state;
		if (!(/^1[\d]{10}$/g).test(phone)) {
			Toast.info('手机号码格式有误')
			return;
		} else if (!password) {
			Toast.info('请输入密码')
			return;
		}

		// 用户进行登录操作
		this.setState({
			loading: true
		})
		fetch({
			url: urlHost.login,
			method: 'post',
			data: {
				account: phone,
				pwd: password
			},
			complete() {
				that.setState({
					loading: false
				})
			}
		}).then((data) => {
			dispatch({
				type: 'SET_LOGIN',
				payload: {
					userInfo: data,
					isLogin: true,
					phone: phone
				}
			})
			Toast.success('登录成功', 2, () => {
				hashHistory.push('/index')
			})
		}, (error) => {
			Toast.fail(error.message)
		})
	}

	render() {

		return (
			<div className="page-login">
				<div className="logo"><Link className="back" to="/index"><Icon type="left" color="#999" size="lg"></Icon></Link><img src={require('../images/logo.png')} /></div>
				<List>
		          <InputItem
		            value={this.state.phone}
		            clear={true}
		            type="number"
		            maxLength="11"
					error={this.state.phoneError}
					editable={true}
		            placeholder="请输入用户名"
		            onChange={(e)=>this.setState({phone: e})}
		          >手机号</InputItem>
		          <InputItem
		            type="password"
		            maxLength="20"
		            value={this.state.password}
		            error={this.state.pswError}
		            onChange={(e)=>this.setState({password: e})}
		            placeholder="请输入密码"
		          >密码</InputItem>
		        </List>
		        <div className="submit">
		        	<Button onClick={this.submit.bind(this)} type="primary" loading={this.state.loading} disabled={this.state.loading}>登录</Button>
					<WhiteSpace size="sm" />
		        	<Button onClick={this.loginOut.bind(this)} type="warning">退出登录</Button>
		        </div>
			</div>
		)
	}
}

var Logins = connect((state) => ({
	userInfo: state.user
}))(Login)

export default Logins;