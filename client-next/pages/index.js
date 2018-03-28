import Head from 'next/head';
import React from 'react';

import { Link, withRedux } from '../utils';
import { store } from '../store';

class Index extends React.Component {

  render() {
    return (
      <div>
        <p>Hello World!</p>
        <Link href="/test">
          <a>test {typeof withRedux}</a>
        </Link>
      </div>
    );
  }
}

export default withRedux(store, null, null)(Index);
