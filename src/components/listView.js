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
	ListView,
	NavBar,
	Icon
} from 'antd-mobile';


function MyBody(props) {
	return (
		<div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
	);
}

const data = [{
	img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
	title: 'Meet hotel',
	des: '不是所有的兼职汪都需要风吹日晒',
}, {
	img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
	title: '麦当劳邀您过周末',
	des: '不是所有的兼职汪都需要风吹日晒',
}, {
	img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
	title: '食惠周',
	des: '不是所有的兼职汪都需要风吹日晒',
}, ];
let index = data.length - 1;

const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

class ListViewDemo extends React.Component {
	constructor(props) {
		super(props);
		const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
		const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

		const dataSource = new ListView.DataSource({
			getRowData,
			getSectionHeaderData: getSectionData,
			rowHasChanged: (row1, row2) => row1 !== row2,
			sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
		});

		this.dataBlob = {};
		this.sectionIDs = [];
		this.rowIDs = [];
		this.genData = (pIndex = 0) => {
			console.log(pIndex)
			for (let i = 0; i < NUM_SECTIONS; i++) {
				const ii = (pIndex * NUM_SECTIONS) + i;
				const sectionName = `Section ${ii}`;
				this.sectionIDs.push(sectionName);
				this.dataBlob[sectionName] = sectionName;
				this.rowIDs[ii] = [];

				for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
					const rowName = `S${ii}, R${jj}`;
					this.rowIDs[ii].push(rowName);
					this.dataBlob[rowName] = rowName;
				}
			}
			// new object ref
			this.sectionIDs = [].concat(this.sectionIDs);
			this.rowIDs = [].concat(this.rowIDs);
		};

		this.state = {
			dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
			isLoading: true,
		};
	}

	componentDidMount() {
		// you can scroll to the specified position
		// this.refs.lv.refs.listview.scrollTo(0, 200);

		// simulate initial Ajax
		setTimeout(() => {
			this.genData();
			this.setState({
				dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
				isLoading: false,
			});
		}, 600);
	}

	// If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
	// componentWillReceiveProps(nextProps) {
	//   if (nextProps.dataSource !== this.props.dataSource) {
	//     this.setState({
	//       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
	//     });
	//   }
	// }

	onEndReached = (event) => {
		// load new data
		// hasMore: from backend data, indicates whether it is the last page, here is false
		if (this.state.isLoading && !this.state.hasMore) {
			return;
		}
		console.log('reach end', event);
		this.setState({
			isLoading: true
		});
		setTimeout(() => {
			this.genData(++pageIndex);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
				isLoading: false,
			});
		}, 100);
	}

	render() {
		const separator = (sectionID, rowID) => ( < div key = {
				`${sectionID}-${rowID}`
			}
			style = {
				{
					backgroundColor: '#F5F5F9',
					height: 8,
					borderTop: '1px solid #ECECED',
					borderBottom: '1px solid #ECECED',
				}
			}
			/>
		);
		const row = (rowData, sectionID, rowID) => {
			if (index < 0) {
				index = data.length - 1;
			}
			const obj = data[index--];
			return (
				<div key={rowID} className="row">
		          <div className="row-title">{obj.title}</div>
		          <div style={{ display: '-webkit-box', display: 'flex', padding: '0.3rem 0' }}>
		            <img style={{ height: '1.28rem', marginRight: '0.3rem' }} src={obj.img} />
		            <div className="row-text">
		              <div style={{ marginBottom: '0.16rem', fontWeight: 'bold' }}>{obj.des}</div>
		              <div><span style={{ fontSize: '0.6rem', color: '#FF6E27' }}>35</span>元/任务</div>
		            </div>
		          </div>
		        </div>
			);
		};

		return (
			<div className="page-list">
				<NavBar leftContent="返回" mode="light" onLeftClick={() => hashHistory.push('index')}
			      >运动</NavBar>
			    <div>
			      <ListView ref="lv"
			        dataSource={this.state.dataSource}
			        renderFooter={() => <div style={{ padding: 20, textAlign: 'center' }}>
				          {this.state.isLoading ? <Icon type="loading" size="lg" /> : '加载完毕,继续滑也许还有？'}
				        </div>
					}
					
					renderBodyComponent = {
						() => <MyBody />
					}
					renderRow = {
						row
					}
					renderSeparator = {
						separator
					}
					className = "fortest"
					style = {
						{
							height: document.documentElement.clientHeight - 45,
							overflow: 'auto',
						}
					}
					pageSize = {
						20
					}
					scrollRenderAheadDistance = {
						2000
					}
					scrollEventThrottle = {
						30
					}
					onScroll = {
						() => {
							console.log('scroll');
						}
					}
					onEndReached = {
						this.onEndReached
					}
					onEndReachedThreshold = {
						1000
					}
					/> 
				</div> < /div>
		);
	}
}

export default connect(state => ({
	user: state.user
}))(ListViewDemo)