import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {history} from '../../mockStore';
import Pagination from './pagination';

const fakeTotal = 10;

describe('Component: Pagination', () => {
  it('should render Pagination component', () => {
    render(
      <Router history={history}>
        <Pagination total={fakeTotal}/>
      </Router>,
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
} );
