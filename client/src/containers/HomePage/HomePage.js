import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import TodosList from 'components/TodosList';
import withStore from 'utils/withStore';
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

		const {
			todo
		} = this.state;

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
                  value={todo}
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
	loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
  	PropTypes.bool,
  	PropTypes.string
  ]).isRequired,
	onSubmitForm: PropTypes.func.isRequired,
	todo: PropTypes.string.isRequired,
	onChangeTodo: PropTypes.func.isRequired,
};