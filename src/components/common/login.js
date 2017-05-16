import React, {
	Component
} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {
	Transition
} from '../../libs'


class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false
		};
	}

	componentDidMount() {
		this.setState({
			visible: true
		})
	}

	componentWillUnmount() {
		this.onClose();
	}

	closeModal(type) {
		if (type == 'sure') {
			if (this.props.sure instanceof Function) {
				this.props.sure()
			}
			window.location.href = '#/login'
		} else if (type == 'cancel') {
			if (this.props.cancel instanceof Function) {
				this.props.cancel()
			}
		}
		this.onClose();
	}

	onClose() {
		this.setState({
			visible: false
		}, () => {
			this.props.willUnmount();
		});
	}

	render() {
		return (
			<div className="common-login">
				<div className="mask">
					<Transition name={this.props.name} duration={this.props.duration} component="div">
						<div key={this.state.visible} style={{display: this.state.visible ? 'block' : 'none'}}>
							<div className="login-content" >
								<div className="header">您的账号未登录</div>
								<div className="content">登陆后您的数据将永久保存到云端</div>
								<div className="footer">
									<a onClick={this.closeModal.bind(this, 'cancel')} href="javascript:;">取消</a>
									<a onClick={this.closeModal.bind(this, 'sure')} href="javascript:;">立即登陆</a>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		)
	}
}

Login.propTypes = {
	name: PropTypes.string,
	duration: PropTypes.number
}

Login.defaultProps = {
	name: 'login-modal',
	duration: 300
}

var isLogin = (props = {}, type) => {
	const div = document.createElement('div');
	document.body.appendChild(div);

	const component = React.createElement(Login, Object.assign(props, {
		willUnmount: () => {
			ReactDOM.unmountComponentAtNode(div);
			document.body.removeChild(div);
		}
	}));

	ReactDOM.render(component, div)

}

export default isLogin;