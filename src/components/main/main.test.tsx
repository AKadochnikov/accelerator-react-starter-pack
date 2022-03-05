import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import Main from './main';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {NameSpace} from '../../const';

const history = createMemoryHistory();
const mockStore = configureMockStore();
export const store = mockStore({
  [NameSpace.Data]: {
    addedGuitars: [],
    discount: 0,
  },
  [NameSpace.CouponApi]: {},
  [NameSpace.GuitarsApi]: {},
});

describe('Component: Main', () => {
  it('should render Main component', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Main/>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });
} );
