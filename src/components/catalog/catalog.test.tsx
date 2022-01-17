import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {history, store} from '../../mockStore';
import Catalog from './catalog';
import {Provider} from 'react-redux';

describe('Component: Catalog', () => {
  it('should render Catalog component', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Catalog/>
        </Router>
      </Provider>);

    expect(screen.getByTestId('catalog')).toBeInTheDocument();
  });
} );
