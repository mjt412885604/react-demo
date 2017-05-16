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
	fetch
} from '../utils/myUtils'
import {
	setMsg,
	isLogin,
	Loading
} from './common'
import {
	Button,
	Icon,
	Toast,
	List
} from 'antd-mobile';
import urlHost from '../config/config'

class Mine extends Component {
	constructor(props) {
		super(props)
		this.state = {
			mineInfo: ''
		}
	}

	componentDidMount() {
		const {
			userInfo
		} = this.props;
		if (userInfo.isLogin) {
			fetch({
				url: urlHost.mine,
				data: {
					userId: userInfo.userInfo.userId
				}
			}).then(data => {
				console.log(data)
				this.setState({
					mineInfo: {
						photo: data.photo,
						phone: data.phone.slice(0, 3) + '****' + data.phone.slice(-4)
					}
				})
			})
		} else {
			this.setState({
				mineInfo: {
					photo: '',
					phone: '未登录'
				}
			})
			isLogin();
		}
	}

	mineSet() {
		const {
			userInfo
		} = this.props;
		if (userInfo.isLogin) {
			hashHistory.push('mineSet')
		} else {
			hashHistory.push('login')
		}
	}

	render() {
		return (
			<div className="page-mine">
				<div className="header">
					<div className="photo"><img src={this.state.mineInfo.photo || ''} /></div>
					<div onClick={this.mineSet.bind(this)} className="phone">{this.state.mineInfo.phone}<Icon type="right" size="lg" color="#fff"></Icon></div>
				</div>
				<div className="list">
					<List>
				        <List.Item
				          thumb={require('../images/yinshijilu.png')}
				          arrow="horizontal"
				          onClick={() => {}}
				        >我的饮食记录</List.Item>
				        <List.Item 
				        thumb={require('../images/collect.png')} 
				        arrow="horizontal"
				        >我的数据日志</List.Item>
				        <List.Item 
				        thumb={require('../images/set.png')} 
				        arrow="horizontal"
				        >设置</List.Item>
				      </List>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	userInfo: state.user
}))(Mine)