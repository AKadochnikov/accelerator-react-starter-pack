import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import Card from './card';
import {makeFakeGuitars} from '../../mock-guitars';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {store} from '../../mock-store';

const history = createMemoryHistory();
const fakeGuitars = makeFakeGuitars();

describe('Component: Card', () => {
  it('should render Card component', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Card guitar={fakeGuitars[0]}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Купить/)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/)).toBeInTheDocument();
    expect(screen.getByText(/Рейтинг/)).toBeInTheDocument();
  });
} );
