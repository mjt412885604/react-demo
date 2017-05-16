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
	List,
	Modal,
	NavBar,
	InputItem
} from 'antd-mobile';
import urlHost from '../config/config'

class MineSet extends Component {
	constructor(props) {
		super(props)
		this.userInfo = this.props.userInfo;
		this.state = {
			photo: '',
			name: '',
			phone: ''
		}
	}

	componentDidMount() {
		if (this.userInfo.isLogin) {
			this.getMineData()
		} else {
			isLogin();
		}
	}

	getMineData() {
		fetch({
			url: urlHost.mine,
			data: {
				userId: this.userInfo.userInfo.userId
			}
		}).then(data => {
			this.setState({
				photo: data.photo,
				name: data.name,
				phone: data.phone
			})
		})
	}

	inputName(e) {
		this.setState({
			name: e.target.value
		})
	}

	inputPhone(e) {
		this.setState({
			phone: e.target.value
		})
	}

	saveMine() {
		if (this.userInfo.isLogin) {
			var info = {
				userId: this.userInfo.userInfo.userId,
				name: this.state.name,
				phone: this.state.phone,
				photo: this.state.photo
			}
			fetch({
				url: urlHost.changeUser + '?userId=' + this.userInfo.userInfo.userId,
				method: 'post',
				data: JSON.stringify(info),
				headers: {
					'Content-type': 'application/json;charset=UTF-8'
				},
				setData: true
			}).then(data => {
				if (data.code == 0) {
					Toast.success('修改成功', 2)
					this.getMineData()
				}
			})
		} else {
			GoLogin(Modal)
		}
	}

	render() {
		return (
			<div className="page-mineSet">
				<NavBar leftContent="返回" mode="light" onLeftClick={() => hashHistory.push('mine')}
			      rightContent={[
			        <a key="0" onClick={this.saveMine.bind(this)} className="blueColor" href="javascript:;">保存</a>
			      ]}
			    >个人信息设置</NavBar>
			    <List className="marginTop20px">
			       <List.Item extra={<img src={this.state.photo} style={{width:'30px',height: '30px',borderRadius:'50%'}}/>}>头像</List.Item>
					<List.Item extra={<input onChange={this.inputName.bind(this)} value={this.state.name} className="input-name" placeholder="请输入姓名" type="text" />}>姓名</List.Item>
			    </List>
			    <List className="marginTop20px">
					<List.Item extra={<input onChange={this.inputPhone.bind(this)} value={this.state.phone} className="input-name" placeholder="请输入手机号" type="tel" />}>修改绑定手机号</List.Item>
			    </List>
			</div>
		)
	}
}

export default connect(state => ({
	userInfo: state.user
}))(MineSet)