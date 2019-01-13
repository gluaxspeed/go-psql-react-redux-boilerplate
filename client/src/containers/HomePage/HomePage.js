import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import TodosList from 'components/TodosList';
import './style.scss';

export default class HomePage extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			todo: ''
		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		const todo = e.target.value; 
		this.setState({ todo: todo });
		this.props.onChangeTodo(todo);
	}

	render() {
		const { loading, error, todos } = this.props;
    const todosListProps = {
      loading,
      error,
      todos,
		};

		return (
			<article>
				<Helmet>
					<title>Home Page</title>
					<meta name="description" content="React Boilerplate HomePage" />
				</Helmet>

				<div className="home-page">
					<section className="centered">
						<h2>Boilerplate Application</h2>
						<p>A boilerplate with a golang backend, postgresql and a react/redux front end</p>
					</section>

					<section>
						<h2>Add Todo</h2>
						<form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="todo">
              Create New Todo
                <span className="at-prefix">@</span>
                <input
                  id="todo"
                  type="text"
                  value={this.state.todo}
                  onChange={this.onChange}
								/>
								<button>Create</button>
							</label>
						</form>
					</section>

					<TodosList key={'todos-list'} {...todosListProps}/>
				</div>
			</article>
		);
	}
}

HomePage.propTypes = {
	loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
	]),
	onSubmitForm: PropTypes.func,
	todo: PropTypes.string,
	onChangeTodo: PropTypes.func,
};