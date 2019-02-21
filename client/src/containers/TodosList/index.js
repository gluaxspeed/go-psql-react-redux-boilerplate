import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
	makeSelectTodo,
	makeSelectError,
	makeSelectLoading,
} from './selectors';
import { deleteTodo, setTodo, updateTodo } from './actions';
import TodosList from './TodosList';
import todosListReducer from './reducer';
import saga from './saga';

const mapDispatchToProps = (dispatch) => ({
	onClickCross: async (todo) => {
		await dispatch(setTodo(todo));
		await dispatch(deleteTodo());
	},
	onClickCheck: async (todo) => {
		await dispatch(setTodo(todo));
		await dispatch(updateTodo());
	}
});

const mapStateToProps = createStructuredSelector({
	todo: makeSelectTodo(),
	loading: makeSelectLoading(),
	error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'todoListItem', reducer: todosListReducer });
const withSaga = injectSaga({ key: 'todoListItem', saga: saga });

export default compose(withReducer, withSaga, withConnect)(TodosList);