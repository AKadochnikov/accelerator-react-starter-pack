import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import Main from './main';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();

describe('Component: Main', () => {
  it('should render Main component', () => {
    render(
      <Router history={history}>
        <Main/>
      </Router>,
    );

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });
} );
