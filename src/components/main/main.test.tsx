import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {history, store} from '../../mockStore';
import Main from './main';
import {Provider} from 'react-redux';

describe('Component: Main', () => {
  it('should render Main component', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Main/>
        </Router>
      </Provider>);

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });
} );
