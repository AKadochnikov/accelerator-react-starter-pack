import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {AppRoute} from '../../const';
import {store} from '../../mock-store';
import CartItem from './cart-item';
import {fakeGuitar} from '../../mock-guitars';

describe('Component: Card', () => {
  it('should render Card component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Cart]}>
          <CartItem guitar={fakeGuitar}/>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
  });
});
