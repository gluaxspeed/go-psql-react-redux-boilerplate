import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

export default class LoginPage extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const {
			username,
			password
		} = this.state;

		return (
			<form className='login-form' onSubmit={this.props.onSubmitForm}>
				<input
					type='text'
					name='username'
					value={username}
					onChange={this.onChange}
				/>
				<input
					type='text'
					name='password'
					value={password}
					onChange={this.onChange}
				/>
			</form>
		);
	}
}

LoginPage.PropTypes = {
	loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
  	PropTypes.bool,
  	PropTypes.string
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
	onSubmitForm: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
};