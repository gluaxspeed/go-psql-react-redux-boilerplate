import Head from 'next/head';
import React from 'react';

import { Link } from '../utils';
class Index extends React.Component {

  render() {
    return (
      <div>
        <p>Hello World!</p>
        <Link href="/test">
          <a>test</a>
        </Link>
      </div>
    );
  }
}

export default Index;
