import React from 'react';
import { connect } from 'react-redux';
import AddTodo from './containers/addtodo.jsx';
import Footer from './components/footer.jsx';
import VisibileTodoList from './containers/visibiletodolist.jsx';
import { getTodos } from './actions/index.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

  componentDidMount() {
    this.props.dispatch(getTodos());
  }

  render() {
    return(
      <div>
        <AddTodo />
        <VisibileTodoList />
        <Footer />
      </div>
    );
  }
}

export default connect()(App);