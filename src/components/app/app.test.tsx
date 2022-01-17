import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute, PriceLoadStatus} from '../../const';
import App from './app';
import {Action} from '@reduxjs/toolkit';
import {api} from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state';
import {NameSpace} from '../../const';


const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

const store = mockStore({
  [NameSpace.user]: {
    params: '',
    isInit: false,
    minPrice: 0,
    maxPrice: 0,
    priceStatus: PriceLoadStatus.NotLoaded,
    guitarTypes: [],
    guitarCounts: [],
    totalGuitars: 0,
    page: 1,
    start: 0,
    end: 9,
  },
  [NameSpace.data]: {
    guitars: [],
    isDataLoaded: false,
  },
});

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
    mockAPI.reset();
    history.push(AppRoute.Main);
  });

  it('should render "Main" when user navigate to "/"',  () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });

  it('should render "Main" when user navigate to "/page_1"',  () => {
    history.push(AppRoute.Catalog);
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(history.location.pathname).toBe(`${AppRoute.Catalog}`);
  });
});

