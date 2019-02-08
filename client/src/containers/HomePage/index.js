import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectUserTodos } from 'containers/App/selectors';
import {
	makeSelectTodo,
	makeSelectError,
	makeSelectLoading,
} from './selectors';
import { loadTodos, changeTodo, newTodo } from './actions';
import homeReducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
	onChangeTodo: (todo) => dispatch(changeTodo(todo)),
	updateTodos: (evt) => {
		if (evt !== undefined && evt.preventDefault) evt.preventDefault();
		dispatch(loadTodos());
	},
	onSubmitForm: async (evt) => {
		if (evt !== undefined && evt.preventDefault) evt.preventDefault();
		await dispatch(newTodo());
		await dispatch(loadTodos());
	},
	onClickCheck: async (evt) => {
		if (evt !== undefined && evt.preventDefault) evt.preventDefault();
		console.log('check')
	},
  onClickDelete: async (evt) => {
  	if (evt !== undefined && evt.preventDefault) evt.preventDefault();
  	console.log('cross')
  },
});

const mapStateToProps = createStructuredSelector({
	todos: makeSelectUserTodos(),
	todo: makeSelectTodo(),
	loading: makeSelectLoading(),
	error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer: homeReducer });
const withSaga = injectSaga({ key: 'home', saga: saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };