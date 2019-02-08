import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import './style.scss';

export default class LoginPage extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			rusername: '',
			rpassword: '',
			confirm: '',
			first: '',
			last: '',
			redirect: false,
		};

		this.onChange = this.onChange.bind(this);
		this.onLogin = this.onLogin.bind(this);
	}

	onLogin(e) {
		this.props.onSubmitLoginForm(e);
		this.setState({ redirect: true });
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
		this.props.onChange({ name: e.target.name, value: e.target.value });
	}

	render() {
		const {
			username,
			password,
			rusername,
			rpassword,
			confirm,
			first,
			last,
			redirect,
		} = this.state;

		if (redirect) {
			return <Redirect to='/' />
		}

		return (
			<div className='forms-container'>

				<div className='form-wrapper'>
					<h2>Login</h2>
					<form onSubmit={this.onLogin}>

						<div className='element'>
							<label htmlFor="username">
	              Email
	            </label>
							<input
								type='text'
								name='username'
								value={username}
								onChange={this.onChange}
							/>
						</div>

						<div className='element'>
							<label htmlFor="password">
	              Password
	            </label>
							<input
								type='password'
								name='password'
								value={password}
								onChange={this.onChange}
							/>
						</div>
						
						<button>Login</button>
					</form>
				</div>

				<div className='form-wrapper'>
					<h2>Register</h2>
					<form className='register-form' onSubmit={this.props.onSubmitRegisterForm}>

						<div className='element'>
							<label htmlFor="rusername">
	              Email
	            </label>
							<input
								type='text'
								name='rusername'
								value={rusername}
								onChange={this.onChange}
							/>
						</div>

						<div className='element'>
							<label htmlFor="rpassword">
	              Password
	            </label>
							<input
								type='password'
								name='rpassword'
								value={rpassword}
								onChange={this.onChange}
							/>
						</div>

						<div className='element'>
							<label htmlFor="confirm">
	              Password Confirm
	            </label>
							<input
								type='password'
								name='confirm'
								value={confirm}
								onChange={this.onChange}
							/>
						</div>

						<div className='element'>
							<label htmlFor="first">
	              First Name
	            </label>
							<input
								type='text'
								name='first'
								value={first}
								onChange={this.onChange}
							/>
						</div>

						<div className='element'>
							<label htmlFor="last">
	              Last Name
	            </label>
							<input
								type='text'
								name='last'
								value={last}
								onChange={this.onChange}
							/>
						</div>
						<button>Register</button>
					</form>
				</div>

			</div>
		);
	}
}

LoginPage.propTypes = {
	loading: PropTypes.bool,
  error: PropTypes.oneOfType([
  	PropTypes.bool,
  	PropTypes.string
  ]),
  onChange: PropTypes.func,
	onSubmitLoginForm: PropTypes.func,
	onSubmitRegisterForm: PropTypes.func,
	username: PropTypes.string,
	password: PropTypes.string,
};