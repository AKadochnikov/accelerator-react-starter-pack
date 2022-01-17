import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store, history} from '../mockStore';
import FilterPrice from './filter-price';
import userEvent from '@testing-library/user-event';

describe('Component: FilterPrice', () => {
  it('should render FilterPrice component', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FilterPrice/>
        </Router>
      </Provider>,
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
