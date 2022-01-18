import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import FilterStringsCount from './filter-strings-count';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();

describe('Component: FilterStringsCount', () => {
  const fakeOnChange = jest.fn();
  const fakeGuitarTypes = [''];
  const fakeGuitarCounts = [3];

  it('should render FilterStringsCount component', () => {
    render(
      <Router history={history}>
        <FilterStringsCount onChange={fakeOnChange} newGuitarTypes={fakeGuitarTypes} newGuitarCounts={fakeGuitarCounts}/>
      </Router>,
    );

    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
  });
} );
