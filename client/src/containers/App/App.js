import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import Header from 'components/Header';
import './style.scss';

const App = () => (
  <div className="app-container">
    <Helmet
      titleTemplate="%s React Boilerplate"
      defaultTitle="React Boilerplate"
    >
      <meta name="description" content="A React.js Boilerplate application" />
    </Helmet>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage}/>
    </Switch>
  </div>
);

export default App;
