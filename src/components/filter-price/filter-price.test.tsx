import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import FilterPrice from './filter-price';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();

describe('Component: FilterPrice', () => {
  it('should render FilterPrice component', () => {
    render(
      <Router history={history}>
        <FilterPrice/>
      </Router>,
    );

    expect(screen.getByText(/Минимальная цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Максимальная цена/i)).toBeInTheDocument();

    const minPriceInput = screen.getByTestId('minPrice');
    const maxPriceInput = screen.getByTestId('maxPrice');

    userEvent.type(minPriceInput, '3000');
    userEvent.type(maxPriceInput, '20000');

    expect(screen.getByDisplayValue(/3000/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/20000/i)).toBeInTheDocument();
  });
} );
