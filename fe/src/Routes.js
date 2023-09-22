import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Categories from './pages/Categories';
import NewCategory from './pages/NewCategory';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';
import NotFound from './pages/NotFound';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/new" component={NewContact} />
      <Route path="/edit/:id" component={EditContact} />
      <Route path="/categories" exact component={Categories} />
      <Route path="/categories/new" exact component={NewCategory} />
      <Route path="/*" component={NotFound} />
    </Switch>
  );
}
