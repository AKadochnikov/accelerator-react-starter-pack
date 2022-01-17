import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store, history} from '../../mockStore';
import FilterStringsCount from './filter-strings-count';

describe('Component: FilterStringsCount', () => {
  const fakeOnChange = jest.fn();
  const fakeGuitarTypes = [''];
  const fakeGuitarCounts = [3];

  it('should render FilterStringsCount component', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FilterStringsCount onChange={fakeOnChange} newGuitarTypes={fakeGuitarTypes} newGuitarCounts={fakeGuitarCounts}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
  });
} );
