import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import Pagination from './pagination';
import {createMemoryHistory} from 'history';

const fakeTotal = 10;
const history = createMemoryHistory();

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
