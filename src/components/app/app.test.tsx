import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {AppRoute} from '../../const';
import App from './app';
import {store, history, mockAPI} from '../mockStore';

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  beforeEach(() => {
    mockAPI.reset();
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

