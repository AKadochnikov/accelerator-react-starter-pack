import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store, history} from '../../mockStore';
import CatalogSort from './catalog-sort';

describe('Component: CatalogSort', () => {
  it('should render CatalogSort component', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogSort/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
  });
} );
