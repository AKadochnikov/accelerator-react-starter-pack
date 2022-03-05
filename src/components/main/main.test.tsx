import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import Main from './main';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {store} from '../../mock-store';

const history = createMemoryHistory();

describe('Component: Main', () => {
  it('should render Main component', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Main/>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });
} );
