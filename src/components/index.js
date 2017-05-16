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
import urlHost from '../config/config'
import {
	Flex,
	Button,
	Icon,
	Toast,
	NavBar,
	Grid,
	Modal
} from 'antd-mobile';

const data = [{
	icon: require('../images/index-icon1.svg'),
	text: '每日血糖记录',
	link: '/list'
}, {
	icon: require('../images/index-icon2.svg'),
	text: '低GI食谱推荐',
	link: '/about'
}, {
	icon: require('../images/index-icon3.svg'),
	text: '运动记录',
	link: '/sport'
}, {
	icon: require('../images/index-icon4.svg'),
	text: '身高记录',
	link: '/transtion'
}, {
	icon: require('../images/index-icon5.svg'),
	text: '胰岛素治疗',
	link: '/about'
}, {
	icon: require('../images/index-icon6.svg'),
	text: '健康档案',
	link: '/about'
}, {
	icon: require('../images/index-icon7.svg'),
	text: '检测/复查提醒',
	link: '/about'
}]

var indexGrid = data.map((val, key) => (
	<Link to={val.link} key={key} className="index-grid-list">
		<Icon type={val.icon} />
		<div>{val.text}</div>
	</Link>
))

var DesktopData = props => {
	const {
		glu,
		calories
	} = props.data;
	return (
		<div className="glus-data">
			<div>
				<p>近期血糖</p>
				<p className="data">{glu || '--'}</p>
				<p>mmol/L</p>
			</div>
			<div>
				<p>当日摄入</p>
				<p className="data">{calories || '--'}</p>
				<p>kcal</p>
			</div>
		</div>)
}

class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userInfo: {}
		};
	}

	componentDidMount() {
		const {
			userInfo
		} = this.props;
		if (userInfo.isLogin) {
			fetch({
				url: urlHost.desktop,
				data: {
					userId: userInfo.userInfo.userId
				}
			}).then((data) => {
				console.log(data)
				this.setState({
					userInfo: data
				})
			})
		} else {
			isLogin()
		}
	}

	render() {
		const {
			userInfo,
			onAdd,
			onSub,
			value
		} = this.props;
		return (
			<div className="page-desktop">
			    <div className="header">
			    	<div className="header-name">	
			    		<div></div>
			    		<div className="name">{
			    			userInfo.isLogin ? (
			    				<Link className="witheColor" to="/mine">{this.state.userInfo.name}</Link>
			    				) : (
			    				<Link className="witheColor" to="/login">未登录</Link>
			    				)
			    		}</div>
			    		<div className="msg"><Icon onClick={()=>hashHistory.push('message')} key="0" type={require('../images/email.svg')} /></div>
			    	</div>
			    	<DesktopData data={this.state.userInfo} />
			    </div>
			    <div className="index-grid">{indexGrid}</div>
			</div>
		)
	}
}

export default connect((state) => ({
	userInfo: state.user
}))(Index)