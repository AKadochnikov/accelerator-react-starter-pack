import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import NotFound from './404';
import {Router} from 'react-router-dom';

const history = createMemoryHistory();

describe('Component: Not-Found', () => {
  it('should Render Not-Found component when user navigate to unknown URL', () => {
    render(<Router history={history}><NotFound/></Router>);

    expect(screen.getByText(/Page not found/)).toBeInTheDocument();
  });
});
