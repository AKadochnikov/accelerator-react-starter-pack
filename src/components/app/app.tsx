import {Route, Switch} from 'react-router-dom';
import Main from '../main/main';
import NotFound from '../404-not-found/404';
import {AppRoute} from '../../const';
import Product from '../product/product';
import Cart from '../cart/cart';

function App(): JSX.Element {
  return (
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
      <Route exact path={AppRoute.Cart}>
        <Cart/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
