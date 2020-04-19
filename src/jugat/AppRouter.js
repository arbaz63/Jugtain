import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import User from './User'
import Admin from './Admin'
import JugatApp from './JugatApp'
const AppRouter = () => (
  <BrowserRouter>
    <div>
      
      <Switch>
        <Route path="/" component={JugatApp} exact={true} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
