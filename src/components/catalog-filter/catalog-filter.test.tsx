import CatalogFilter from './catalog-filter';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
const history = createMemoryHistory();

describe('Component: CatalogFilter', () => {
  it('should render CatalogFilter component', () => {
    render(
      <Router history={history}>
        <CatalogFilter/>
      </Router>,
    );

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
  });
} );
