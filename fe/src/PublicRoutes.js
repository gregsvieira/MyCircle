// PublicRoutes.js

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

export default function PublicRoutes() {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
}
