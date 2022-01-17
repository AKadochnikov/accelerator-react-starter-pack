import CatalogFilter from './catalog-filter';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store, history} from '../../mockStore';

describe('Component: CatalogFilter', () => {
  it('should render CatalogFilter component', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilter/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
  });
} );
