var React = require('react');
var utils = require('./utils');
var Input = require('./Input.react.jsx');

class FetchForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contains: window.localStorage.contains || ''
		};
	}

	fetch(event) {
		event.preventDefault();
		utils.fetch(this.state.contains.split(' '));
	}

	setContains(event) {
		window.localStorage.contains = event.target.value;
		this.setState({
			contains: event.target.value
		});
	}

	componentDidMount() {
			$('.modal-trigger').leanModal();
	}

	render() {
			var height = '50px';
			var backgroundColor = 'white';
			var color = 'rgb(33,33,33)';

			var iconStyle = {
					backgroundColor: backgroundColor,
					height: height,
					lineHeight: height,
					color: color,
					marginLeft: '1rem'
			};

			var inputStyle = {
					backgroundColor: backgroundColor,
					height: height,
					lineHeight: height,
					color: color,
					marginLeft: '2rem',
					width: '100%'
			};
			
var formStyle = {
		backgroundColor: backgroundColor,
		height: height,
		lineHeight: height,
		borderRadius: '3px',
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
		width: '80%'
};

var containerStyle = {
		position: 'relative',
		height: '64px'
};

var buttonStyle = {
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
		right: '1rem'
};

var inputFieldStyle = {
		width: '80%'
};

			return (
					<div className='navbar-fixed'>
					  <nav className='teal darken-2'>
    <div className="nav-wrapper">
	<div className="container" style={containerStyle}>
	<form id="search-form" style={formStyle} className="z-depth-1 " onSubmit={this.fetch.bind(this)}>
		<div className="row">
			<div className="input-field col active" style={inputFieldStyle}>
			<i className="prefix mdi-action-search" style={iconStyle}></i>
				<input type='text' id='containsAllOf' className="active "
					value={this.state.contains}
					onChange={this.setContains.bind(this)}
					style={inputStyle}
					autofocus
					/>
				</div>
					<button className="btn waves-effect" type="submit" style={buttonStyle}>Fetch</button>
					</div>
				</form>
	    <ul id="nav-mobile" className="right">
        <li><a href="#login" className="modal-trigger"><i className="mdi-action-account-child"></i></a></li>
      </ul>
	  </div>
    </div>
  </nav>
  </div>
			);
	}
}

module.exports = FetchForm;