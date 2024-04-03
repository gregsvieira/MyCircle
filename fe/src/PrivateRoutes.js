import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';
import Categories from './pages/Categories';
import NewCategory from './pages/NewCategory';
import EditCategory from './pages/EditCategory';
import UploadContacts from './pages/UploadContacts';
import Profile from './pages/Profile';
import Messages from './pages/Messages';

export default function PrivateRoutes() {
  return (
    <Switch>
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
      <Redirect to="/login" />
    </Switch>
  );
}
