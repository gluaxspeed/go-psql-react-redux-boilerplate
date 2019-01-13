import { connect, ReactReduxContext } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
	makeSelectTodo,
	makeSelectError,
	makeSelectLoading,
	makeSelectTodos
} from './selectors';
import { loadTodos, changeTodo } from './actions';
import homeReducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
	onChangeTodo: (todo) => dispatch(changeTodo(todo)),
	onSubmitForm: (evt) => {
		if (evt !== undefined && evt.preventDefault) evt.preventDefault();
		dispatch(loadTodos());
	}
});

const mapStateToProps = createStructuredSelector({
	todos: makeSelectTodos(),
	todo: makeSelectTodo(),
	loading: makeSelectLoading(),
	error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer: homeReducer });
const withSaga = injectSaga({ key: 'home', saga: saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };