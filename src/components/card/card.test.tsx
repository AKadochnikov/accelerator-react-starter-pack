import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import Card from './card';
import {makeFakeGuitars} from '../../mockGuitars';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();
const fakeGuitars = makeFakeGuitars();

describe('Component: Card', () => {
  it('should render Card component', () => {
    render(<Router history={history}><Card guitar={fakeGuitars[0]}/></Router>);

    expect(screen.getByText(/Купить/)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/)).toBeInTheDocument();
    expect(screen.getByText(/Рейтинг/)).toBeInTheDocument();
  });
} );
