import React, {
	Component
} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {
	Link,
	hashHistory
} from 'react-router'
import {
	connect
} from 'react-redux'
import iScroll from 'iscroll/build/iscroll-probe'
import {
	WhiteSpace,
	NavBar,
	Button,
	Modal,
	WingBlank,
	Icon,
	Toast
} from 'antd-mobile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
	fetch
} from '../utils/myUtils'
import host from '../config/config'
import {
	setMsg
} from './common'

// iscroll插件click解决方案
var iScrollClick = () => {
	// workaround click bug iscroll #674
	if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
	if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
	if (/Silk/i.test(navigator.userAgent)) return false;
	if (/Android/i.test(navigator.userAgent)) {
		var s = navigator.userAgent.substr(navigator.userAgent.indexOf('Android') + 8, 3);
		return parseFloat(s[0] + s[3]) < 44 ? false : true
	}
}

var myScroll,
	isScroll = false,
	PAGE_NO,
	PAGE_SIZE = 30;

class Trans extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: ['hello', 'world', 'click', 'me'],
			show: false,
			recipesList: [],
			isScroll: false
		};
		PAGE_NO = 1;
		this.handleAdd = this.handleAdd.bind(this);
	}

	handleAdd() {
		// const newItems = this.state.items.concat([
		// 	prompt('Enter some text')
		// ]);
		// this.setState({
		// 	items: newItems
		// });
		this.setState((preState) => ({
			show: !preState.show
		}))

	}

	handleRemove(i) {
		let newItems = this.state.items.slice();
		newItems.splice(i, 1);
		this.setState({
			items: newItems
		});
	}

	getData({
		kind = 1,
		isMore = false
	} = {}) {
		const {
			user
		} = this.props;
		fetch({
			url: host.getMaterials,
			data: {
				userId: user.userInfo.userId,
				type: kind,
				pageNo: PAGE_NO,
				pageSize: PAGE_SIZE
			}
		}).then(data => {
			if (data.length > 0) {
				PAGE_NO++;
				if (!isMore) {
					this.setState({
						recipesList: data
					})
				} else {
					this.setState((prevState) => ({
						recipesList: prevState.recipesList.concat(data)
					}))
				}
				this.setState({
					isScroll: data.length < PAGE_SIZE ? true : false
				})
				isScroll = data.length < PAGE_SIZE ? true : false;
			} else {
				this.setState({
					isScroll: true
				})
				isScroll = true;
			}
		})
	}

	setScroll() {
		this.getData()
		myScroll = new iScroll('.iscroll-content', {
			probeType: 3,
			click: iScrollClick()
		})
		myScroll.on('scroll', (e) => {
			if (myScroll.y < (myScroll.maxScrollY + 60) && !isScroll) {
				console.log('加载中')
				isScroll = true;
				this.getData({
					isMore: true
				});
			}
		})
		myScroll.on('scrollEnd', () => {

		})
	}

	list(val) {
		setMsg(JSON.stringify(val))
	}

	componentDidMount() {
		this.setScroll();
	}

	componentDidUpdate() {
		myScroll && myScroll.refresh();
	}

	render() {
		const items = this.state.items.map((item, i) => (
			<div key={item} onClick={() => this.handleRemove(i)}>
	        {item}
	      </div>
		));

		const recipes = this.state.recipesList.map((val, k) => (
			<li key={k} className="recipes-list" onClick={this.list.bind(this, val)}>
				<div className="content">{val.name}</div>
				<div className="footer">{val.calories}kcal<Icon type="right" size="sm" color="#d9d9d9"/></div>
			</li>
		))

		return (
			<div>
				<NavBar leftContent="返回" mode="light" onLeftClick={() => hashHistory.push('index')}
			      >动画</NavBar>
			      <WingBlank size="lg">
			      	<WhiteSpace size="lg" />
			      	<Button onClick={this.handleAdd}>Add Item</Button>
			      	<WhiteSpace size="lg" />
				    <ReactCSSTransitionGroup
			          transitionName="example"
			          component="div"
			          transitionEnterTimeout={500}
			          transitionLeaveTimeout={300}>
			          {this.state.show ? (<div key="sdada">wewewe</div>) : <div key="ss">切换动画</div>}
			        </ReactCSSTransitionGroup>
			      </WingBlank>
			      <div className="iscroll-content" style={{top: '145px'}}>
			      	<div>
						<ul className="recipes-content">{recipes}</ul>
						<div className="load-more">
							{
								this.state.isScroll ? '已经全部加载完毕' : <div className="icon-box"><Icon type="loading" /></div>
			      			}
			      		</div>
			      	</div>
			      </div>
			</div>
		)
	}
}

export default connect(state => ({
	user: state.user
}))(Trans)