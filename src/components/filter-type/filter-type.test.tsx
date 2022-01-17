import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store, history} from '../../mockStore';
import FilterType from './filter-type';

describe('Component: FilterType', () => {
  const fakeOnChange = jest.fn();
  const fakeGuitarTypes = [''];
  const fakeGuitarCounts = [3];

  it('should render FilterType component', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FilterType onChange={fakeOnChange} newGuitarCounts={fakeGuitarCounts} newGuitarTypes={fakeGuitarTypes}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
  });
} );
