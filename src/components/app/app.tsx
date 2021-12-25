import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../main/main';
import {AppRoute} from '../../const';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
