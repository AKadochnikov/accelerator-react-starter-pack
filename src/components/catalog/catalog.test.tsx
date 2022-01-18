import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {history} from '../../mockStore';
import Catalog from './catalog';

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
