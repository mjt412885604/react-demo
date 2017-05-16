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
import host from '../config/config'
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
	Toast,
	ListView
} from 'antd-mobile';

var pageNo = 1,
	pageSize = 30,
	isScroll = true,
	isMore = false;

function MyBody(props) {
	return (
		<div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
	);
}

class Sport extends Component {
	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.state = {
			list: [],
			isLoading: false
		}
	}

	componentDidMount() {
		const {
			user
		} = this.props;
		if (user.isLogin) {
			this.setState({
				isLoading: true
			})
			fetch({
				url: host.exerciseList,
				data: {
					userId: user.userInfo.userId,
					pageNo: pageNo,
					pageSize: pageSize
				}
			}).then(data => {
				console.log(data)
				this.setState({
					list: data,
					isLoading: false
				})
			})
		} else {
			isLogin()
		}
	}

	render() {
		return (
			<div className="page-sport">
				<NavBar leftContent="返回" mode="light" onLeftClick={() => hashHistory.push('index')}
			      >运动</NavBar>
			    <div className="sport-content">
			    	{ this.state.isLoading ? <Loading /> : (
			    			this.state.list.map((val, key)=>(
				    			<div className="sport-list" key={key}>
				    				<div>
				    					<Icon type={require('../images/sport-icon1.svg')} />
				    					<div>{val.content}</div>
				    				</div>
				    				<div>
				    					<Icon type={require('../images/sport-icon2.svg')} />
				    					<div>{val.length}分钟</div>
				    				</div>
				    			</div>
				    		))
			    		)
			    	}
			    </div>
			</div>
		)
	}
}

export default connect((state) => ({
	user: state.user
}))(Sport)