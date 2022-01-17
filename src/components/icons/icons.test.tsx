import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {history} from '../mockStore';
import Icons from './icons';

describe('Component: Icons', () => {
  it('should render Icons component', () => {
    render(<Router history={history}><Icons/></Router>);

    expect(screen.getByTestId('icons')).toBeInTheDocument();
  });
});
