import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {AppRoute} from '../../const';
import {store} from '../../mock-store';
import CartItem from '../cart-item/cart-item';
import {fakeGuitar} from '../../mock-guitars';
import userEvent from '@testing-library/user-event';

describe('Component: DeleteCartModal', () => {
  it('should render DeleteCartModal component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Cart]}>
          <CartItem guitar={fakeGuitar}/>
        </MemoryRouter>
      </Provider>,
    );
    userEvent.click(screen.getByTestId('decrement-button'));
    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
  });
});
