import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import FilterType from './filter-type';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();

describe('Component: FilterType', () => {
  const fakeOnChange = jest.fn();
  const fakeGuitarTypes = [''];
  const fakeGuitarCounts = [3];

  it('should render FilterType component', () => {
    render(
      <Router history={history}>
        <FilterType onChange={fakeOnChange} newGuitarCounts={fakeGuitarCounts} newGuitarTypes={fakeGuitarTypes}/>
      </Router>,
    );

    expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
  });
} );
