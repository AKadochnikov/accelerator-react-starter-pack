import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../main/main';
import NotFound from '../404-not-found/404';
import {AppRoute} from '../../const';
import Product from '../product';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main/>
        </Route>
        <Route exact path={AppRoute.Catalog}>
          <Main/>
        </Route>
        <Route exact path={AppRoute.Guitar}>
          <Product/>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
