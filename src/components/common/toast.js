import React, {
	Component
} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {
	Transition
} from '../../libs'

class SetToast extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		}
	}

	componentDidMount() {
		this.setState({
			visible: true
		})

		this.startTimer();
	}

	componentWillUnmount() {
		this.stopTimer();
	}

	onClose() {
		this.stopTimer();

		this.setState({
			visible: false
		}, () => {
			this.props.willUnmount();
		});
	}

	startTimer() {
		this.timeout = setTimeout(() => {
			this.onClose();
		}, 3000)
	}

	stopTimer() {
		clearTimeout(this.timeout)
	}

	render() {
		return (
			<Transition name={this.props.name} duration={this.props.duration} component="div">
				<div className="native-toast" key={this.state.visible}>
					<div className="native-toast-msg" style={{display: this.state.visible ? 'block' : 'none'}}>{this.props.message}</div>
				</div>
			</Transition>
		)
	}
}

SetToast.propTypes = {
	message: PropTypes.any.isRequired,
	name: PropTypes.string,
	duration: PropTypes.number
}

SetToast.defaultProps = {
	message: '我是一个默认数据',
	name: 'example',
	duration: 300
}

var setMsg = (props = {}, type) => {
	const div = document.createElement('div');
	document.body.appendChild(div);

	if (typeof props != 'object') {
		props = {
			message: props
		}
	}

	if (type) {
		props.type = type
	}

	const components = React.createElement(SetToast, Object.assign(props, {
		willUnmount: () => {
			ReactDOM.unmountComponentAtNode(div);
			document.body.removeChild(div);

			if (props.onClose instanceof Function) {
				props.onClose();
			}
		}
	}));

	ReactDOM.render(components, div)
}

export default setMsg;