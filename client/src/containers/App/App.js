import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Header from 'components/Header';
import Footer from 'components/Footer';

import './style.scss';

const App = () => (
  <div className='app-container'>
    <Helmet
      titleTemplate='%s React Boilerplate'
      defaultTitle='React Boilerplate'
    >
      <meta name='description' content='A React.js Boilerplate application' />
    </Helmet>

    <Header />

    <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route exact path='/login' component={LoginPage} />
      <Route path='' component={NotFoundPage} />
    </Switch>

    <Footer/>
  </div>
);

export default App;
