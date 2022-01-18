import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import Footer from './footer';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render Footer component', () => {
    render(<Router history={history}><Footer/></Router>);

    expect(screen.getByText(/Режим работы/)).toBeInTheDocument();
    expect(screen.getByText(/без выходных/)).toBeInTheDocument();
    expect(screen.getByText(/Сервис-центры/)).toBeInTheDocument();
  });
});
