import { connect, ReactReduxContext } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
	makeSelectUsername,
	makeSelectPassword,
	makeSelectError,
	makeSelectLoading,
} from './selectors';
import {
	changeUsername,
	changePassword,
	login,
	changeRusername,
	changeRpassword,
	changeConfirm,
	changeFirst,
	changeLast,
} from './actions';
import loginReducer from './reducer';
import saga from './saga';
import LoginPage from './LoginPage';

const mapDispatchToProps = (dispatch) => ({
	onChange: ({name, value}) => {
		switch(name) {
			case 'username':
				dispatch(changeUsername(value));
				return;

			case 'password':
				dispatch(changePassword(value));
				return;

			case 'rusername':
				dispatch(changeRusername(value));
				return;

			case 'rpassword':
				dispatch(changeRpassword(value));
				return;

			case 'confirm':
				dispatch(changeConfirm(value));
				return;

			case 'first':
				dispatch(changeFirst(value));
				return;

			case 'last':
				dispatch(changeLast(value));
				return;

			default:
				return;
		}
	},
	onSubmitLoginForm: (evt) => {
		if (evt !== undefined && evt.preventDefault) evt.preventDefault();
		dispatch(login());
	}
});

const mapStateToProps = createStructuredSelector({
	username: makeSelectUsername(),
	password: makeSelectPassword(),
	loading: makeSelectLoading(),
	error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'login', reducer: loginReducer });
const withSaga = injectSaga({ key: 'login', saga: saga });

export default compose(withReducer, withSaga, withConnect)(LoginPage);
export { mapDispatchToProps };