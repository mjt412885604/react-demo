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
	SwipeAction,
	List,
	Radio,
	Flex,
	WhiteSpace,
	NavBar,
	Button,
	Modal,
	WingBlank,
	TabBar,
	Icon,
	Toast
} from 'antd-mobile';

const RadioItem = Radio.RadioItem;
const alert = Modal.alert;

const showAlert = () => {
	const alertInstance = alert('删除', '确定删除么???', [{
		text: 'Cancel',
		onPress: () => console.log('cancel'),
		style: 'default'
	}, {
		text: 'OK',
		onPress: () => console.log('ok'),
		style: {
			fontWeight: 'bold'
		}
	}, ]);
};

class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'redTab',
			hidden: false
		};
	}

	componentDidMount() {

	}

	showComponent() {
		this.setState({
			hidden: true
		})

		setTimeout(() => {
			this.setState({
				hidden: false
			})
		}, 2000)
	}

	render() {
		const {
			userInfo,
			dispatch
		} = this.props;
		if (this.state.hidden) {
			return (
				<div>
					<Loading />
				</div>
			)
		}
		return (
			<div>
				<NavBar leftContent="返回" mode="light" onLeftClick={() => hashHistory.push('index')}
			      >About</NavBar>
			      <WingBlank size="lg">
			      	<WhiteSpace size="lg" />
						{
							userInfo.isLogin ? (
								<div>
									<div>您已经登陆了</div>
									<WhiteSpace size="lg" />
									<Button type="warning" onClick={()=>dispatch({type: 'SET_LOGINOUT'})}>退出登录</Button>
								</div>
								) : (
									<div>
										<div>您未登录，请登陆</div>
										<WhiteSpace size="lg" />
										<Button onClick={()=>hashHistory.push('login')}>登录</Button>
									</div>
								)
						}
						<WhiteSpace size="lg" />
						<Button onClick={()=>Toast.info('这是一个自定义toast插件')}> 自定义按钮 </Button>
						<WhiteSpace size="lg" />
						<Button onClick={() => showAlert()}
					    >弹出多个按钮 </Button>
					    <WhiteSpace size="lg" />
					    <Button onClick={this.showComponent.bind(this)}> showComponent </Button>
					    <WhiteSpace size="lg" />
					    <Button onClick={() => isLogin()}> 登录弹窗 </Button>
			      </WingBlank>
			</div>
		)
	}
}

export default connect((state) => ({
	userInfo: state.user
}))(About);