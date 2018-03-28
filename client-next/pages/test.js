import React, { Component, PropTypes } from 'react';

import { redirect } from '../utils';

class Test extends Component {

    constructor(props) {
        super(props);
    }

    onClick = () => {
      console.log('hey', typeof redirect);
      redirect('/');
    }

    render() {
        return (
            <div>
            <p>Tests are gay</p>
            <button onClick={this.onClick}> test </button> 
            </div>
        );
    }
}

export default Test;
