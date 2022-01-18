import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import CatalogSort from './catalog-sort';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();

describe('Component: CatalogSort', () => {
  it('should render CatalogSort component', () => {
    render(
      <Router history={history}>
        <CatalogSort/>
      </Router>,
    );

    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
  });
} );
