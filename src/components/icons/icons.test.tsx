import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import Icons from './icons';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();

describe('Component: Icons', () => {
  it('should render Icons component', () => {
    render(<Router history={history}><Icons/></Router>);

    expect(screen.getByTestId('icons')).toBeInTheDocument();
  });
});
