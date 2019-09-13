import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import './style.css';

export default class Loading extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: props.loading
		};
	}

	render() {
		if (!this.props.loading) {
			return '';
		}

		return (
			<div className='loading-container'>
				<ScaleLoader
					sizeUnit={'px'}
					size={this.props.size || 300}
					color={this.props.color || '#df4723'}
					loading={true}
				/>
			</div>
		);
	}
}
