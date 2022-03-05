import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import Header from './header';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {store} from '../../mock-store';

const history = createMemoryHistory();
const isCatalog = true;

describe('Component: Header', () => {
  it('should render Header component', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header isCatalog={isCatalog}/>
        </Router>
      </Provider>);

    expect(screen.getByText(/Начать поиск/)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('search'), 'Bass');

    expect(screen.getByDisplayValue(/Bass/i)).toBeInTheDocument();
  });
});
