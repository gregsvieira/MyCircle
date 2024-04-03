import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';
import Categories from './pages/Categories';
import NewCategory from './pages/NewCategory';
import EditCategory from './pages/EditCategory';
import UploadContacts from './pages/UploadContacts';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Messages from './pages/Messages';

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/register" exact component={Register} />
      <Route path="/" exact component={Home} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/messages" exact component={Messages} />
      <Route path="/contacts" exact component={Contacts} />
      <Route path="/contacts/new" component={NewContact} />
      <Route path="/contacts/edit/:id" component={EditContact} />
      <Route path="/categories" exact component={Categories} />
      <Route path="/categories/new" exact component={NewCategory} />
      <Route path="/categories/edit/:id" component={EditCategory} />
      <Route path="/upload" component={UploadContacts} />
      <Route path="/*" component={NotFound} />
    </Switch>
  );
}
