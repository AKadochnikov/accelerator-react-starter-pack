import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {AppRoute} from '../../const';
import App from './app';
import {createMemoryHistory} from 'history';
import {store} from '../../mock-store';
import {Provider} from 'react-redux';
import * as redux from 'react-redux';
import {makeFakeAddedGuitars} from '../../mock-guitars';

const history = createMemoryHistory();


const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  beforeEach(() => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue({ addedGuitars: makeFakeAddedGuitars() });
    history.push(AppRoute.Main);
  });

  it('should render "Main" when user navigate to "/"',  () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });

  it('should render "Main" when user navigate to "/page_:id"',  () => {
    history.push(AppRoute.Catalog);
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(history.location.pathname).toBe(`${AppRoute.Catalog}`);
  });
});

