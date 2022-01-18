import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import Catalog from './catalog';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();

describe('Component: Catalog', () => {
  it('should render Catalog component', () => {
    render(
      <Router history={history}>
        <Catalog/>
      </Router>,
    );

    expect(screen.getByTestId('catalog')).toBeInTheDocument();
  });
} );
