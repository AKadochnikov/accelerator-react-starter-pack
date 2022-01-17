import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {history, store} from '../mockStore';
import {Provider} from 'react-redux';
import Pagination from './pagination';

describe('Component: Pagination', () => {
  it('should render Pagination component', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination/>
        </Router>
      </Provider>);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
} );
