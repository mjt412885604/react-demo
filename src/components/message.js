import React, {
	Component
} from 'react'
import PropTypes from 'prop-types'
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
	isLogin
} from './common'
import {
	WhiteSpace,
	NavBar,
	Button,
	WingBlank,
	Icon,
	Toast,
	Card,
	Tabs
} from 'antd-mobile';
import store from '../store'

function setPhoto() {
	document.querySelector('.photo').innerHTML = '我是新进来的'
	store.dispatch({
		type: 'ADD'
	})

	store.dispatch({
		type: 'SET_PHOTO',
		url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494579750958&di=3894a6a4a4205900d77b588076577ebd&imgtype=0&src=http%3A%2F%2Fpic61.nipic.com%2Ffile%2F20150310%2F5450641_155105194261_2.jpg'
	})
}

class Message extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabsIndex: 0
		}
	}

	popMessage() {
		setMsg({
			message: 'hello world',
			onClose() {
				console.log('关闭了')
			}
		})
	}

	addNumber = () => {
		setPhoto()
	}

	saveInfo = (e) => {
		const info = {
			photo: this.props.photo.url
		}
		Toast.info(JSON.stringify(info.photo))
	}

	componentDidMount() {

	}

	onChange = (e) => {
		this.setState({
			tabsIndex: e.nativeEvent.selectedSegmentIndex * 1
		})
	}

	render() {
		const {
			addList,
			photo
		} = this.props;
		return (
			<div>
				<NavBar 
					leftContent="返回"
				 	mode="light" 
				 	onLeftClick={() => hashHistory.push('index')}
				 	rightContent={[
				        <Button key="0" onClick={this.saveInfo} type="ghost" size="small" inline>保存</Button>
				      ]}
			      >消息</NavBar>
			      <WhiteSpace size="lg" />
			      	<Tabs 
			      		defaultActiveKey="2" 
			      		onChange={key => console.log(key)} 
			      		onTabClick={key => console.log(key)}
			      		animated={false}
			      		>
				      <Tabs.TabPane tab="选项卡一" key="1">
				        <div style={{ padding: '10px', minHeight: '5rem', backgroundColor: '#fff' }}>
				          选项卡一内容
				          <WhiteSpace size="lg" />
			      			<Button ref="setbutton" onClick={this.popMessage.bind(this)}>测试</Button>
				        </div>
				      </Tabs.TabPane>
				      <Tabs.TabPane tab="选项卡二" key="2">
				        <div style={{ minHeight: '5rem', backgroundColor: '#fff' }}>
				          选项卡二内容
				        </div>
				      </Tabs.TabPane>
				      <Tabs.TabPane tab="选项卡三" key="3">
				        <div style={{ padding: '10px', minHeight: '5rem', backgroundColor: '#fff' }}>
				          选项卡三内容
				          <WhiteSpace size="lg" />
					     	<Button onClick={this.addNumber} type="warning">累加: {addList.count}</Button>
					     	<WhiteSpace size="lg" />
					     	<div className="photo" ref="setphoto" data-id={addList.count}>我是默认值</div>
					     	<Card>
						      <Card.Header
						        title="This is title"
						        thumb={photo.url}
						        thumbStyle={{height: 45}}
						        extra={<span>this is extra</span>}
						      />
						      <Card.Body>
						        <div>This is content of `Card`</div>
						      </Card.Body>
						      <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
						    </Card>
				        </div>
				      </Tabs.TabPane>
				    </Tabs>
			</div>
		)
	}
}

export default connect(state => ({
	user: state.user,
	addList: state.addList,
	photo: state.setPhoto
}))(Message)