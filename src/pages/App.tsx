import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IState } from '../redux/models';
import { adminRoutes, routes } from '../constants/routes';

import './App.scss';
import Main from './Main/Main';

const App = (): ReactElement => {
  const isAuth = useSelector((state: IState) => !!state.currentUser.id);
  const isAdmin = useSelector((state: IState) => state.currentUser.role === 'admin');

  return (
    <div className='App'>
      <Switch>
        {routes.map(route => (
          <Route component={route.component} key={route.path} path={route.path} exact>
            {!isAuth ? <Redirect to='/' /> : null}
          </Route>
        ))}
        {adminRoutes.map(route => (
          <Route component={route.component} key={route.path} path={route.path} exact>
            {!isAdmin || !isAuth ? <Redirect to='/' /> : null}
          </Route>
        ))}
        <Route path='/'>
          <Main />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
